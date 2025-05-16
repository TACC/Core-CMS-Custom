from django.conf import settings
import psycopg
from datetime import datetime, date
import re
import logging

logger = logging.getLogger(__name__)

APCD_DB = settings.APCD_DATABASE


def db_connect():
    return psycopg.connect(
        host=APCD_DB['host'],
        dbname=APCD_DB['database'],
        user=APCD_DB['user'],
        password=APCD_DB['password'],
        port=APCD_DB['port'],
        sslmode='require'
    )


def get_users():
    cur = None
    conn = None
    try:
        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )
        query = """SELECT
        users.role_id,
        users.user_id,
        users.user_email,
        users.user_name,
        submitters.entity_name,
        users.created_at,
        users.updated_at,
        users.notes,
        users.active,
        users.user_number,
        roles.role_name
        FROM users
        LEFT JOIN roles on roles.role_id = users.role_id
        LEFT JOIN submitter_users ON users.user_id = submitter_users.user_id
        AND users.user_number = submitter_users.user_number
        LEFT JOIN submitters on submitter_users.submitter_id = submitters.submitter_id
        ORDER BY submitters.entity_name, users.user_id ASC;
        """
        cur = conn.cursor()
        cur.execute(query)
        return cur.fetchall()

    except Exception as error:
        logger.error(error)
    
    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()

def update_user(form):
    cur = None
    conn = None
    try:
        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )
        cur = conn.cursor()
        operation = """UPDATE users
            SET
            updated_at= %s,"""

        values = (
            datetime.now(),
        )

        columns = ['user_name','user_email','role_id']
        for column_name in columns:
            value = form.get(column_name)
            if value not in (None, ""):
                values += (value,)
                operation += f"{column_name} = %s,"

        # doing status separately because it doesn't match up to the db column, as well as notes because
        # it needs to be able to be blank
        status = form.get('status')
        notes = form.get('notes')

        if (status == "Active"):
            status = True
        else:
            status = False
        operation += "active = %s, notes = %s"
        values += (status, notes,)

        # removing the last comma before we put the WHERE clause
        operation += " WHERE user_id = %s"

        ## add last update to all extension updates
        values += (_clean_value(form['user_id']),)

        cur.execute(operation, values)
        conn.commit()
    except Exception as error:
        logger.error(error)
        return error
    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()          

def get_user_role(user):
    cur = None
    conn = None
    try:
        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )
        operation = """SELECT roles.role_name FROM roles 
                    WHERE role_id
                    IN (
                        SELECT users.role_id FROM users
                        WHERE user_id = %s)"""
        cur = conn.cursor()
        cur.execute(operation, (user,))
        row = cur.fetchone()
        return row[0] if row else None

    except Exception as error:
        logger.error(error)

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()

def get_submitter_users():
    cur = None
    conn = None
    try:
        conn = db_connect()
        query = """
        SELECT DISTINCT submitter_users.submitter_id,
        submitter_users.user_id,
        users.user_name,
        users.org_name,
        roles.role_name,
        users.active,
        users.user_number,
        submitters.payor_code,
        users.role_id,
        users.user_email,
        users.notes,
        submitters.org_name
        FROM submitter_users
        JOIN users
            ON submitter_users.user_id = users.user_id
            AND submitter_users.user_number = users.user_number
        JOIN roles 
            ON roles.role_id = users.role_id
        JOIN submitters
            ON submitter_users.submitter_id = submitters.submitter_id
        ORDER BY submitter_users.user_id;
        """
        cur = conn.cursor()
        cur.execute(query)
        return cur.fetchall()
    
    except Exception as error:
        logger.error(error)
    
    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()


def get_registrations(reg_id=None, submitter_codes=None):
    cur = None
    conn = None
    try:
        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )
        query = f"""SELECT DISTINCT
                registrations.registration_id,
                registrations.posted_date,
                registrations.submitting_for_self,
                registrations.registration_status,
                registrations.org_type,
                registrations.business_name,
                registrations.mail_address,
                registrations.city,
                registrations.state,
                registrations.zip,
                registrations.registration_year
            FROM registrations
            {f"LEFT JOIN registration_submitters ON registrations.registration_id = registration_submitters.registration_id LEFT JOIN submitters ON registration_submitters.submitter_id = submitters.submitter_id" if submitter_codes is not None else ''}
            WHERE 1=1
            {f" AND registrations.registration_id = {str(reg_id)}" if reg_id is not None else ''}
            {f" AND submitters.submitter_code = ANY(%s)" if submitter_codes is not None else ''}
            ORDER BY registrations.registration_id"""
        cur = conn.cursor()
        if submitter_codes:
            cur.execute(query, (submitter_codes,))
        else:
            cur.execute(query)
        return cur.fetchall()

    except Exception as error:
        logger.error(error)

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()


def create_registration(form, renewal=False):
    cur = None
    conn = None
    try:
        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )
        cur = conn.cursor()
        operation = """INSERT INTO registrations(
            posted_date,
            submitting_for_self,
            registration_status,
            org_type,
            business_name,
            mail_address,
            city,
            state,
            zip,
            registration_year
        ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        RETURNING registration_id"""
        values = (
            datetime.now(),
            True if form['on_behalf_of'] == 'true' else False,
            'Received',
            form['type'],
            _clean_value(form['business_name']),
            _clean_value(form['mailing_address']),
            _clean_value(form['city']),
            form['state'][:2],
            form['zip_code'],
            form['reg_year']
        )
        cur.execute(operation, values)
        conn.commit()
        return cur.fetchone()[0]

    except Exception as error:
        logger.error(error)
        return error

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()


def update_registration(form, reg_id):
    cur = None
    conn = None
    try:
        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )
        cur = conn.cursor()
        operation = """UPDATE registrations
            SET
            submitting_for_self = %s,
            registration_status = %s,
            org_type = %s,
            business_name = %s,
            mail_address = %s,
            city = %s,
            state = %s,
            zip = %s,
            updated_at= %s,
            registration_year = %s
        WHERE registration_id = %s
        RETURNING registration_id"""
        values = (
            True if form['on_behalf_of'] == 'true' else False,
            form['reg_status'],
            form['type'],
            _clean_value(form['business_name']),
            _clean_value(form['mailing_address']),
            _clean_value(form['city']),
            form['state'][:2],
            form['zip_code'],
            datetime.now(),
            form['reg_year'],
            reg_id
        )
        cur.execute(operation, values)
        conn.commit()
        return cur.fetchone()[0]

    except Exception as error:
        logger.error(error)
        return error

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()

def get_registration_entities(reg_id=None, submitter_code=None):
    cur = None
    conn = None
    try:
        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )
        query = f"""SELECT
                registration_entities.total_claims_value,
                registration_entities.registration_id,
                registration_entities.claims_and_encounters_volume,
                registration_entities.registration_entity_id,
                registration_entities.license_number,
                registration_entities.naic_company_code,
                registration_entities.total_covered_lives,
                registration_entities.entity_name,
                registration_entities.fein,
                registration_entities.plan_coml,
                registration_entities.plan_mdcr,
                registration_entities.plan_mdcd,
                registration_entities.file_me,
                registration_entities.file_pv,
                registration_entities.file_mc,
                registration_entities.file_pc,
                registration_entities.file_dc
                FROM registration_entities 
                {f"WHERE registration_id = {str(reg_id)}" if reg_id is not None else ''}"""
        cur = conn.cursor()
        cur.execute(query)
        return cur.fetchall()

    except Exception as error:
        logger.error(error)

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()


def create_registration_entity(entity, reg_id, from_update_reg=None):#, old_reg_id=None):
    cur = None
    conn = None
    values = ()
    try:
        #if not _acceptable_entity(form, iteration, reg_id if from_update_reg else (old_reg_id if old_reg_id else None)):
        #    return
        #str_end = f'{iteration}{ f"_{reg_id}" if from_update_reg else (f"_{old_reg_id}" if old_reg_id else "") }'
        values = (
            reg_id,
            float(entity['total_claims_value']),
            _set_int(entity['claims_encounters_volume']),
            _set_int(entity['license_number']),
            _set_int(entity['naic_company_code']),
            _set_int(entity['total_covered_lives']),
            _clean_value(entity['entity_name']),
            _clean_value(entity['fein']),
            entity['types_of_plans_commercial'],
            entity['types_of_plans_medicare'],
            entity['types_of_plans_medicaid'],
            True,
            entity['types_of_files_provider'],
            entity['types_of_files_medical'],
            entity['types_of_files_pharmacy'],
            entity['types_of_files_dental']
        )

        operation = """INSERT INTO registration_entities(
            registration_id,
            total_claims_value,
            claims_and_encounters_volume,
            license_number,
            naic_company_code,
            total_covered_lives,
            entity_name,
            fein,
            plan_coml,
            plan_mdcr,
            plan_mdcd,
            file_me,
            file_pv,
            file_mc,
            file_pc,
            file_dc
        ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""

        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )
        cur = conn.cursor()
        cur.execute(operation, values)
        conn.commit()

    except Exception as error:
        logger.error(error)
        return error

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()


def update_registration_entity(entity, reg_id):
    cur = None
    conn = None
    values = ()
    try:
        # if entity_id is not there or is less than 0, then 
        # it is a new entity.
        if 'entity_id' not in entity or entity['entity_id'] < 0:
            return create_registration_entity(entity, reg_id)
        values = (
            float(entity['total_claims_value']),
            _set_int(entity['claims_encounters_volume']),
            _set_int(entity['license_number']),
            _set_int(entity['naic_company_code']),
            _set_int(entity['total_covered_lives']),
            _clean_value(entity['entity_name']),
            _clean_value(entity['fein']),
            entity['types_of_plans_commercial'],
            entity['types_of_plans_medicare'],
            entity['types_of_plans_medicaid'],
            entity['types_of_files_provider'],
            entity['types_of_files_medical'],
            entity['types_of_files_pharmacy'],
            entity['types_of_files_dental'],
            reg_id,
            entity['entity_id']
        )
        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )
        operation = """UPDATE registration_entities
            SET
            total_claims_value = %s,
            claims_and_encounters_volume = %s,
            license_number = %s,
            naic_company_code = %s,
            total_covered_lives = %s,
            entity_name = %s,
            fein = %s,
            plan_coml = %s,
            plan_mdcr = %s,
            plan_mdcd = %s,
            file_pv = %s,
            file_mc = %s,
            file_pc = %s,
            file_dc = %s
            WHERE registration_id = %s AND registration_entity_id = %s
        """
        cur = conn.cursor()
        cur.execute(operation, values)
        conn.commit()

    except Exception as error:
        logger.error(error)
        return error

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()


def delete_registration_entity(reg_id, ent_id):
    cur = None
    conn = None
    values = ()
    try:
        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )
        values = (
            reg_id,
            ent_id
        )
        operation = """DELETE FROM registration_entities
            WHERE registration_id = %s AND registration_entity_id = %s
        """
        cur = conn.cursor()
        cur.execute(operation, values)
        conn.commit()

    except Exception as error:
        logger.error(error)
        return error

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()


def get_registration_contacts(reg_id=None, submitter_code=None):
    cur = None
    conn = None
    try:
        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )
        query = f"""SELECT
                registration_contacts.registration_contact_id,
                registration_contacts.registration_id,
                registration_contacts.notify_flag,
                registration_contacts.contact_type,
                registration_contacts.contact_name,
                registration_contacts.contact_phone,
                registration_contacts.contact_email
                FROM registration_contacts 
                {f"WHERE registration_id = {str(reg_id)}" if reg_id is not None else ''}"""
        cur = conn.cursor()
        cur.execute(query)
        return cur.fetchall()

    except Exception as error:
        logger.error(error)

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()


def create_registration_contact(contact, reg_id, from_update_reg=None):
    cur = None
    conn = None
    values = ()
    try:
        #if iteration > 1:
            #if not _acceptable_contact(form, iteration, reg_id if from_update_reg else (old_reg_id if old_reg_id else None)):
            #    return
            #str_end = f'{iteration}{ f"_{reg_id}" if from_update_reg else (f"_{old_reg_id}" if old_reg_id else "") }'
        values = (
            reg_id,
            contact['contact_notifications'],
            _clean_value(contact['contact_type']),
            _clean_value(contact['contact_name']),
            re.sub("[^0-9]", "", contact['contact_phone']),
            _clean_email(contact['contact_email'])
        )

        operation = """INSERT INTO registration_contacts(
            registration_id,
            notify_flag,
            contact_type,
            contact_name,
            contact_phone,
            contact_email
        ) VALUES (%s,%s,%s,%s,%s,%s)"""

        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )
        cur = conn.cursor()
        cur.execute(operation, values)
        conn.commit()

    except Exception as error:
        logger.error(error)
        return error

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()


def update_registration_contact(contact, reg_id):
    cur = None
    conn = None
    values = ()
    try:
        # if contact_id is not there or is less than 0, then 
        # it is a new contact.
        if 'contact_id' not in contact or contact['contact_id'] < 0:
            return create_registration_contact(contact, reg_id)

        values = (
            contact['contact_notifications'],
            _clean_value(contact['contact_type']),
            _clean_value(contact['contact_name']),
            re.sub("[^0-9]", "", contact['contact_phone']),
            _clean_email(contact['contact_email']),
            _set_int(reg_id),
            _set_int(contact['contact_id'])
        )
        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )
        operation = """UPDATE registration_contacts
            SET
            notify_flag = %s,
            contact_type = %s,
            contact_name = %s,
            contact_phone = %s,
            contact_email = %s
            WHERE registration_id = %s AND registration_contact_id = %s
        """
        cur = conn.cursor()
        cur.execute(operation, values)
        conn.commit()

    except Exception as error:
        logger.error(error)
        return error

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()


def delete_registration_contact(reg_id, cont_id):
    cur = None
    conn = None
    values = ()
    try:
        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )
        values = (
            reg_id,
            cont_id
        )
        operation = """DELETE FROM registration_contacts
            WHERE registration_id = %s AND registration_contact_id = %s
        """
        cur = conn.cursor()
        cur.execute(operation, values)
        conn.commit()

    except Exception as error:
        logger.error(error)
        return error

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()


def create_other_exception(form, sub_data):
    cur = None
    conn = None
    values = ()
    try:
        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )
        operation = """INSERT INTO exceptions(
            submitter_id,
            submitter_code,
            payor_code,
            user_id,
            requestor_name,
            requestor_email,
            request_type,
            requested_expiration_date,
            explanation_justification,
            status
        ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """
        values = (
            form["otherExceptionBusinessName"],
            sub_data[1],
            sub_data[2],
            sub_data[3],
            _clean_value(form['requestorName']),
            _clean_email(form['requestorEmail']),
            "Other",
            _clean_date(form['expirationDateOther']),
            _clean_value(form['justification']),
            "Pending"
        )
        cur = conn.cursor()
        cur.execute(operation, values)
        conn.commit()

    except Exception as error:
        logger.error(error)
        return error

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()


def create_threshold_exception(form, exception, sub_data):
    cur = None
    conn = None
    values = ()
    try:
        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )
        operation = """INSERT INTO exceptions(
            submitter_id,
            submitter_code,
            payor_code,
            user_id,
            requestor_name,
            requestor_email,
            request_type,
            requested_expiration_date,
            data_file,
            field_number,
            requested_threshold,
            explanation_justification,
            status,
            required_threshold
        ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """
        values = (
            _clean_value(int(exception['businessName'])),
            sub_data[1],
            sub_data[2],
            sub_data[3],
            _clean_value(form['requestorName']),
            _clean_email(form['requestorEmail']),
            _clean_value(form['exceptionType']),
            _clean_date(exception['expiration_date']),
            _clean_value(exception['fileType']),
            _clean_value(exception['fieldCode']),
            _clean_value(exception['requested_threshold']),
            _clean_value(form['justification']),
            "pending",
            _clean_value((exception['required_threshold']))
        )
        cur = conn.cursor()
        cur.execute(operation, values)
        conn.commit()

    except Exception as error:
        logger.error(error, exc_info=True)
        return error

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()


def get_cdl_exceptions(file_type):
    cur = None
    conn = None
    try:
        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )
        query = """ SELECT c1.item_code as field_list_code, 
        c1.item_value AS field_list_value, 
        c2.item_value AS threshold_value 
        FROM standard_codes c1 
        LEFT JOIN standard_codes c2 
            ON c2.item_code = c1.item_code 
        WHERE c1.list_name=%s AND c2.list_name=%s """

        cur = conn.cursor()
        file_type = _clean_value(file_type)
        field_list = 'field_list_' + file_type
        threshold_list = 'threshold_list_' + file_type
        cur.execute(query, (field_list, threshold_list))
        return cur.fetchall()

    except Exception as error:
        logger.error(error, exc_info=True)

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()


def get_user_submission_log(log_id, log_type, user=None):
    cur = None
    conn = None
    try:
        conn = db_connect()
        log_column_name = 'html_log' if log_type == 'html' else 'json_log'
        filename_column_name = 'html_path' if log_type == 'html' else 'json_path'

        query = f"""
            SELECT {log_column_name}, {filename_column_name}
            FROM submission_logs
            JOIN submissions ON submissions.submission_id = submission_logs.submission_id
            JOIN submitter_users ON submissions.submitter_id = submitter_users.submitter_id
            WHERE submission_logs.log_id = %s AND {log_column_name} IS NOT NULL
        """

        params = [log_id]
        # for submitter scenario
        if user is not None:
            query += " AND submitter_users.user_id = %s"
            params.append(user)

        query += " LIMIT 1"

        cur = conn.cursor()
        cur.execute(query, params)
        return cur.fetchall()
    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()


def get_user_submissions_and_logs(user):
    cur = None
    conn = None
    try:
        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )
        query = """
            SELECT json_build_object(
                'submission_id', submissions.submission_id,
                'submitter_id', submissions.submitter_id,
                'entity_name', submitters.entity_name,
                'file_name', submissions.zip_file_name,
                'status', submissions.status,
                'outcome', submissions.outcome,
                'received_timestamp', submissions.received_timestamp,
                'updated_at', submissions.updated_at,
                'org_name', submitters.org_name,
                'payor_code', submitters.payor_code,
                'view_modal_content', (
                    SELECT COALESCE(json_agg(json_build_object(
                        'log_id', submission_logs.log_id,
                        'submission_id', submission_logs.submission_id,
                        'entity_name', submitters.entity_name,
                        'file_type', submission_logs.file_type,
                        'validation_suite', submission_logs.validation_suite,
                        'outcome', submission_logs.outcome,
                        'has_json_log', CASE
                                        WHEN submission_logs.json_log IS NOT NULL THEN 1
                                        ELSE 0
                                    END,
                        'has_html_log', CASE
                                        WHEN submission_logs.html_log IS NOT NULL THEN 1
                                        ELSE 0
                                        END,
                        'file_type_name', (
                            SELECT standard_codes.item_value FROM standard_codes
                            WHERE UPPER(submission_logs.file_type) = UPPER(standard_codes.item_code) AND list_name='submission_file_type'
                            LIMIT 1
                        )
                    )), '[]'::json)
                )
            )
            FROM submissions
            LEFT JOIN submission_logs
                ON submissions.submission_id = submission_logs.submission_id
            LEFT JOIN submitters 
                ON submitters.submitter_id = submissions.submitter_id
            WHERE submissions.submitter_id
            IN (
                SELECT submitter_users.submitter_id FROM submitter_users 
                WHERE submitter_users.user_id = %s )
            GROUP BY (submissions.submission_id, submitters.entity_name, submitters.org_name, submitters.payor_code)
            ORDER BY submissions.received_timestamp DESC
        """
        cur = conn.cursor()
        cur.execute(query, (user,))
        results = [row[0] for row in cur.fetchall()]
        return results
    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()  

def get_all_submissions_and_logs():
    cur = None
    conn = None
    try:
        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )
        query = """
            SELECT json_build_object(
                'submission_id', submissions.submission_id,
                'entity_name', submitters.entity_name,
                'submitter_id', submissions.submitter_id,
                'file_name', submissions.zip_file_name,
                'status', submissions.status,
                'outcome', submissions.outcome,
                'received_timestamp', submissions.received_timestamp,
                'updated_at', submissions.updated_at,
                'payor_code', submitters.payor_code,
                'org_name', submitters.org_name,
                'view_modal_content', (
                    SELECT CASE
                            WHEN COUNT(submission_logs.log_id) = 0 THEN '[]'::json
                            ELSE json_agg(json_build_object(
                                'log_id', submission_logs.log_id,
                                'submission_id', submission_logs.submission_id,
                                'entity_name', submitters.entity_name,
                                'file_type', submission_logs.file_type,
                                'validation_suite', submission_logs.validation_suite,
                                'outcome', submission_logs.outcome,
                                'has_json_log', CASE
                                        WHEN submission_logs.json_log IS NOT NULL THEN 1
                                        ELSE 0
                                    END,
                                'has_html_log', CASE
                                        WHEN submission_logs.html_log IS NOT NULL THEN 1
                                        ELSE 0
                                        END,
                                'file_type_name', (
                                    SELECT standard_codes.item_value 
                                    FROM standard_codes
                                    WHERE UPPER(submission_logs.file_type) = UPPER(standard_codes.item_code) 
                                    AND list_name='submission_file_type'
                                    LIMIT 1
                                )
                            ))
                        END
                )
            )
            FROM submissions
            LEFT JOIN submitters 
                ON submitters.submitter_id = submissions.submitter_id
            LEFT JOIN submission_logs
                ON submissions.submission_id = submission_logs.submission_id
            GROUP BY (submissions.submission_id, submitters.submitter_id)
            ORDER BY submissions.received_timestamp DESC
        """
        cur = conn.cursor()
        cur.execute(query)
        results = [row[0] for row in cur.fetchall()]
        return results
    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()


def create_extension(form, extension, sub_data):
    cur = None
    conn = None
    values = ()
    try:
        values = (
            _clean_value(extension['businessName']),
            _clean_value(extension['requestedTargetDate']),
            _clean_value(extension['extensionType']),
            _clean_value(extension['applicableDataPeriod'].replace("-", "")),
            _clean_value(extension['currentExpectedDate']),
            "pending",
            _clean_value(sub_data[1]),
            _clean_value(sub_data[2]),
            _clean_value(sub_data[3]),
            _clean_value(form["requestorName"]),
            _clean_email(form["requestorEmail"]),
            _clean_value(form["justification"])
        )

        operation = """INSERT INTO extensions(
            submitter_id,
            requested_target_date,
            extension_type,
            applicable_data_period,
            current_expected_date,
            status,
            submitter_code,
            payor_code,
            user_id,
            requestor_name,
            requestor_email,
            explanation_justification
        ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """
        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )
        cur = conn.cursor()
        cur.execute(operation, values)
        conn.commit()
                
    except Exception as error:
        logger.error('DB error related to extension request creation: %s', error)
        return error

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()


def update_extension(form):
    cur = None
    conn = None
    try:
        with db_connect() as conn:
            cur = conn.cursor()
            query = "UPDATE extensions SET updated_at = %s"
            values = [datetime.now()]  # Timestamp for updated_at

            # Map form fields to DB columns
            columns = {
                'applicable_data_period': 'applicable_data_period',
                'status': 'status',
                'outcome': 'outcome',
                'approved_expiration_date': 'approved_expiration_date'
            }

            # Build the SET clause dynamically
            set_clauses = []
            for field, column_name in columns.items():
                value = form.get(field)
                if value not in (None, "", "None"):
                    set_clauses.append(f"{column_name} = %s")
                    if column_name == 'applicable_data_period':
                        values.append(int(value.replace('-', '')))
                    elif column_name == 'approved_expiration_date':
                        # Convert to None if the value is 'None' (string)
                        values.append(None if value == 'None' else _clean_value(value))
                    else:
                        values.append(_clean_value(value))

            # Include 'notes' field, allowing it to be cleared
            set_clauses.append("notes = %s")
            values.append(_clean_value(form.get('notes', "")))

            query += ", " + ", ".join(set_clauses) + " WHERE extension_id = %s"
            values.append(_clean_value(form['extension_id']))

            cur.execute(query, values)
            conn.commit()
    except Exception as error:
        logger.error(error)
        return error
    finally:
        if cur is not None:
            cur.close()


def get_submitter_info(user):
    cur = None
    conn = None
    values = (user,) if user is not None else None
    try:
        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require',
        )
        cur = conn.cursor()
        query = f"""
                SELECT 
                    submitter_users.submitter_id, 
                    submitters.submitter_code, 
                    submitters.payor_code, 
                    submitter_users.user_id, 
                    submitters.entity_name,
                    submitters.org_name
                FROM submitter_users
                JOIN submitters
                    ON submitter_users.submitter_id = submitters.submitter_id {f"and submitter_users.user_id = (%s)" if user is not None else ''}
                ORDER BY submitters.entity_name, submitter_users.submitter_id
            """
        cur = conn.cursor()
        cur.execute(query, values)
        return cur.fetchall()

    except Exception as error:
        logger.error(error)

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()

def _get_extension_where_clause():
    # see wiki: https://tacc-main.atlassian.net/wiki/x/A4D4Aw?atlOrigin=eyJpIjoiNTNmNTgyZmUzMjk0NGUzZDllODVhOGQ4ZmQ3MzJmNGUiLCJwIjoiYyJ9
    return "cancelled = 'FALSE' AND granted_reprieve='FALSE' AND submission_id is Null"

def get_applicable_data_periods(submitter_id):
    cur = None
    conn = None
    try:
        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require',
        )
        where_clause = _get_extension_where_clause()
        cur = conn.cursor()
        query = f""" SELECT distinct data_period_start FROM submitter_calendar WHERE submitter_id = (%s) AND {where_clause} """
        cur.execute(query, (submitter_id,))
        return cur.fetchall()

    except Exception as error:
        logger.error(error)

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()

def get_current_exp_date(submitter_id, applicable_data_period):
    cur = None
    conn = None
    try:
        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require',
        )
        where_clause = _get_extension_where_clause()
        cur = conn.cursor()
        query = f""" SELECT expected_submission_date FROM submitter_calendar WHERE submitter_id = (%s) AND data_period_start = (%s) AND {where_clause}"""
        cur.execute(query, (submitter_id, applicable_data_period,))
        return cur.fetchall()

    except Exception as error:
        logger.error(error)

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()

def get_all_extensions():
    cur = None
    conn = None
    try:
        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )
        query = """
            SELECT 
                extensions.extension_id, 
                extensions.submitter_id,
                extensions.current_expected_date,
                extensions.requested_target_date,
                extensions.approved_expiration_date,
                extensions.extension_type,
                extensions.applicable_data_period,
                extensions.status,
                extensions.outcome,
                extensions.created_at,
                extensions.updated_at,
                extensions.submitter_code,
                extensions.payor_code,
                extensions.user_id,
                extensions.requestor_name,
                extensions.requestor_email,
                extensions.explanation_justification,
                extensions.notes,
                COALESCE(NULLIF(submitters.entity_name, ''), '') as entity_name
            FROM extensions
            JOIN submitters
                ON extensions.submitter_id = submitters.submitter_id
            ORDER BY extensions.created_at DESC
        """ 
        cur = conn.cursor()
        cur.execute(query)
        return cur.fetchall()

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()

def get_all_exceptions():
    cur = None
    conn = None
    try:
        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )
        query = """
            SELECT 
                exceptions.exception_id, 
                exceptions.submitter_id,
                exceptions.requestor_name,
                exceptions.request_type,
                exceptions.explanation_justification,
                exceptions.outcome,
                exceptions.created_at,
                exceptions.updated_at,
                exceptions.submitter_code,
                exceptions.payor_code,
                exceptions.user_id,
                exceptions.requestor_email,
                exceptions.data_file,
                exceptions.field_number,
                exceptions.required_threshold,
                exceptions.requested_threshold,
                exceptions.requested_expiration_date,
                exceptions.approved_threshold,
                exceptions.approved_expiration_date,
                exceptions.status,
                exceptions.notes,
                COALESCE(NULLIF(submitters.entity_name, ''), '') as entity_name,
                standard_codes.item_value
            FROM exceptions
            JOIN submitters
                ON exceptions.submitter_id = submitters.submitter_id
            LEFT JOIN standard_codes 
                ON UPPER(exceptions.data_file) = UPPER(standard_codes.item_code) AND list_name='submission_file_type'
            ORDER BY exceptions.created_at DESC
        """ 
        cur = conn.cursor()
        cur.execute(query)
        return cur.fetchall()

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()

def update_exception(form):
    cur = None
    conn = None
    try:
        conn = psycopg.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )
        cur = conn.cursor()
        operation = """UPDATE exceptions
            SET
            updated_at= %s,"""
        set_values = []
        # to set column names for query to the correct DB name
        columns = {
            'approved_threshold': 'approved_threshold',
            'approved_expiration_date': 'approved_expiration_date',
            'status': 'status',
            'outcome': 'outcome',
        }
        # To make sure fields are not blank. 
        # If they aren't, add column to update operation
        for field, column_name in columns.items():
            value = form.get(field)
            if value not in (None, ""):
                set_values.append(f"{column_name} = %s")
# to allow notes to be cleared, need to move notes out of the loop that ignores none
        operation += ", ".join(set_values) + ", notes = %s WHERE exception_id = %s"
        ## add last update time to all exceptions updates
        values = [
            datetime.now(),
        ]

        for field, column_name in columns.items():
            value = form.get(field)
            if value not in (None, ""):
                # to make sure applicable data period field is the right type for insert to DB
                if column_name == 'applicable_data_period':
                    values.append(int(value.replace('-', '')))
                # server side clean values
                else:
                    values.append(_clean_value(value))

        # to allow notes to be cleared, need to move notes out of the loop that ignores none
        values.append(_clean_value(form['notes']))
        ## to make sure extension id is last in query to match with WHERE statement
        values.append(_clean_value(form['exception_id']))

        cur.execute(operation, values)
        conn.commit()
    except Exception as error:
        logger.error(error)
        return error
    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()

def _acceptable_entity(form, iteration, reg_id=None):
    str_end = f'{iteration}{ f"_{reg_id}" if reg_id else "" }'
    required_keys = [
        'total_claims_value_{}'.format(str_end),
        'claims_encounters_volume_{}'.format(str_end),
        'total_covered_lives_{}'.format(str_end),
        'entity_name_{}'.format(str_end)
    ]
    requires_one = [
        'naic_company_code_{}'.format(str_end),
        'license_number_{}'.format(str_end),
        'fein_{}'.format(str_end)
    ]
    if all(key in form and form[key] for key in required_keys):
        return next(
            (True for key in requires_one if key),
            False
        )
    return False


def _acceptable_contact(form, iteration, reg_id=None):
    str_end = f'{iteration}{ f"_{reg_id}" if reg_id else "" }'
    required_keys = [
        'contact_type_{}'.format(str_end),
        'contact_name_{}'.format(str_end),
        'contact_phone_{}'.format(str_end),
        'contact_email_{}'.format(str_end)
    ]
    return all(key in form and form[key] for key in required_keys)


def _clean_email(email):
    email = email.lower()
    pattern = re.compile(r"""(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])""")
    result = pattern.match(email)
    return result.string if result else None

def _clean_value(value):
    return re.sub('[^a-zA-Z0-9 \.\-\,\_]', '', str(value))

def _clean_date(date_string):
    date_pattern = re.compile(r'^\d{4}-\d{2}-\d{2}$')

    if re.match(date_pattern, date_string):
        return date_string
    else:
        return None

def _set_int(value):
    if value is None or value == '':
        return None
    try:
        return int(float(value))
    except (ValueError, TypeError):
        raise ValueError(f"Invalid input for _set_int: expected a numeric value or empty string. Value: {value}")
