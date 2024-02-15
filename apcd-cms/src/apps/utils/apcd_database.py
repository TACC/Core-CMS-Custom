from django.conf import settings
import psycopg2
from datetime import datetime, date
import re
import logging

logger = logging.getLogger(__name__)

APCD_DB = settings.APCD_DATABASE


def get_users():
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(
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
        NATURAL JOIN roles 
        LEFT JOIN submitter_users ON users.user_id = submitter_users.user_id 
        AND users.user_number = submitter_users.user_number 
        LEFT JOIN submitters on submitter_users.submitter_id = submitters.submitter_id 
        ORDER BY submitters.entity_name ASC;
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
        conn = psycopg2.connect(
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
        conn = psycopg2.connect(
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


def get_registrations(reg_id=None, submitter_code=None):
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(
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
                registrations.applicable_period_start,
                registrations.applicable_period_end,
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
                {f"WHERE registration_id = {str(reg_id)}" if reg_id is not None else ''}
                {f"LEFT JOIN registration_submitters on registrations.registration_id = registration_submitters.registration_id LEFT JOIN submitters ON registration_submitters.submitter_id = submitters.submitter_id WHERE submitter_code = ANY(%s) ORDER BY registrations.registration_id" if submitter_code is not None else ''}"""
        cur = conn.cursor()
        cur.execute(query, (submitter_code,))
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
        conn = psycopg2.connect(
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
            applicable_period_start,
            applicable_period_end,
            submitting_for_self,
            registration_status,
            org_type,
            business_name,
            mail_address,
            city,
            state,
            zip,
            registration_year
        ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        RETURNING registration_id"""
        values = (
            datetime.now(),
            None,
            None,
            True if form['on-behalf-of'] == 'true' else False,
            'Received',
            form['type'],
            _clean_value(form['business-name']),
            _clean_value(form['mailing-address']),
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
        conn = psycopg2.connect(
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
            True if form['on-behalf-of'] == 'true' else False,
            form['type'],
            _clean_value(form['business-name']),
            _clean_value(form['mailing-address']),
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
        conn = psycopg2.connect(
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


def create_registration_entity(form, reg_id, iteration, from_update_reg=None, old_reg_id=None):
    cur = None
    conn = None
    values = ()
    try:
        if not _acceptable_entity(form, iteration, reg_id if from_update_reg else (old_reg_id if old_reg_id else None)):
            return
        str_end = f'{iteration}{ f"_{reg_id}" if from_update_reg else (f"_{old_reg_id}" if old_reg_id else "") }'
        values = (
            reg_id,
            float(form['total_claims_value_{}'.format(str_end)]),
            _set_int(form['claims_encounters_volume_{}'.format(str_end)]),
            form['license_number_{}'.format(str_end)] if len(form['license_number_{}'.format(str_end)]) else None,
            form['naic_company_code_{}'.format(str_end)] if len(form['naic_company_code_{}'.format(str_end)]) else None,
            _set_int(form['total_covered_lives_{}'.format(str_end)]),
            _clean_value(form['entity_name_{}'.format(str_end)]),
            _clean_value(form['fein_{}'.format(str_end)]),
            True if 'types_of_plans_commercial_{}'.format(str_end) in form else False,
            True if 'types_of_plans_medicare_{}'.format(str_end) in form else False,
            True if 'types_of_plans_medicaid_{}'.format(str_end) in form else False,
            True,
            True if 'types_of_files_provider_{}'.format(str_end) in form else False,
            True if 'types_of_files_medical_{}'.format(str_end) in form else False,
            True if 'types_of_files_pharmacy_{}'.format(str_end) in form else False,
            True if 'types_of_files_dental_{}'.format(str_end) in form else False
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

        conn = psycopg2.connect(
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


def update_registration_entity(form, reg_id, iteration, no_entities):
    cur = None
    conn = None
    values = ()
    try:
        str_end = f'{iteration}_{reg_id}'
        if not _acceptable_entity(form, iteration, reg_id):
            if iteration <= no_entities: # entity is not in form but was in original entity list -> need to delete
                return delete_registration_entity(reg_id, form['ent_id_{}'.format(str_end)])
            return
        if iteration > no_entities: # entity is in form but not in original list -> need to create
            return create_registration_entity(form, reg_id, iteration, from_update_reg=True)
        values = (
            float(form['total_claims_value_{}'.format(str_end)]),
            _set_int(form['claims_encounters_volume_{}'.format(str_end)]),
            form['license_number_{}'.format(str_end)] if len(form['license_number_{}'.format(str_end)]) else None,
            form['naic_company_code_{}'.format(str_end)] if len(form['naic_company_code_{}'.format(str_end)]) else None,
            _set_int(form['total_covered_lives_{}'.format(str_end)]),
            _clean_value(form['entity_name_{}'.format(str_end)]),
            _clean_value(form['fein_{}'.format(str_end)]),
            True if 'types_of_plans_commercial_{}'.format(str_end) in form else False,
            True if 'types_of_plans_medicare_{}'.format(str_end) in form else False,
            True if 'types_of_plans_medicaid_{}'.format(str_end) in form else False,
            True if 'types_of_files_provider_{}'.format(str_end) in form else False,
            True if 'types_of_files_medical_{}'.format(str_end) in form else False,
            True if 'types_of_files_pharmacy_{}'.format(str_end) in form else False,
            True if 'types_of_files_dental_{}'.format(str_end) in form else False,
            reg_id,
            form['ent_id_{}'.format(str_end)]
        )
        conn = psycopg2.connect(
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
        conn = psycopg2.connect(
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
        conn = psycopg2.connect(
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


def create_registration_contact(form, reg_id, iteration, from_update_reg=None, old_reg_id=None):
    cur = None
    conn = None
    values = ()
    try:
        if iteration > 1:
            if not _acceptable_contact(form, iteration, reg_id if from_update_reg else (old_reg_id if old_reg_id else None)):
                return
            str_end = f'{iteration}{ f"_{reg_id}" if from_update_reg else (f"_{old_reg_id}" if old_reg_id else "") }'
            values = (
                reg_id,
                True if 'contact_notifications_{}'.format(str_end) in form else False,
                _clean_value(form['contact_type_{}'.format(str_end)]),
                _clean_value(form['contact_name_{}'.format(str_end)]),
                re.sub("[^0-9]", "", form['contact_phone_{}'.format(str_end)]),
                _clean_email(form['contact_email_{}'.format(str_end)])
            )
        else:
            str_end = f'_{iteration}_{reg_id}' if from_update_reg else (f"_{iteration}_{old_reg_id}" if old_reg_id else "")
            values = (
                reg_id,
                True if f'contact_notifications{str_end}' in form else False,
                _clean_value(form[f'contact_type{str_end}']),
                _clean_value(form[f'contact_name{str_end}']),
                re.sub("[^0-9]", "", form[f'contact_phone{str_end}']),
                _clean_email(form[f'contact_email{str_end}'])
            )

        operation = """INSERT INTO registration_contacts(
            registration_id,
            notify_flag,
            contact_type,
            contact_name,
            contact_phone,
            contact_email
        ) VALUES (%s,%s,%s,%s,%s,%s)"""

        conn = psycopg2.connect(
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


def update_registration_contact(form, reg_id, iteration, no_contacts):
    cur = None
    conn = None
    values = ()
    try:
        if not _acceptable_contact(form, iteration, reg_id):
            if iteration <= no_contacts: # contact is not in form but was in original contact list -> need to delete
                return delete_registration_contact(reg_id, form[f'cont_id_{iteration}'])
            return
        if iteration > no_contacts: # contact is in form but not in original list -> need to create
            return create_registration_contact(form, reg_id, iteration, from_update_reg=True)
        str_end = f'{iteration}_{reg_id}'
        values = (
            True if 'contact_notifications_{}'.format(str_end) in form else False,
            _clean_value(form['contact_type_{}'.format(str_end)]),
            _clean_value(form['contact_name_{}'.format(str_end)]),
            re.sub("[^0-9]", "", form['contact_phone_{}'.format(str_end)]),
            _clean_email(form['contact_email_{}'.format(str_end)]),
            reg_id,
            form[f'cont_id_{iteration}']
        )
        conn = psycopg2.connect(
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
        conn = psycopg2.connect(
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


def create_submitter(form, reg_data):
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )
        cur = conn.cursor()
        operation = """INSERT INTO submitters(
            registration_id,
            org_name,
            file_me,
            file_pv,
            file_mc,
            file_pc,
            file_dc,
            submitting_for_self,
            submitter_code,
            payor_code,
            encryption_key,
            created_at,
            status
        ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        RETURNING submitter_id"""
        values = (
            reg_data[0],
            reg_data[13],
            reg_data[6],
            reg_data[5],
            reg_data[4],
            reg_data[7],
            reg_data[8],
            reg_data[9],
            form['submit_code'],
            _set_int(form['payor_code']),
            form['encryption_key'],
            datetime.now(),
            'new'
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


def create_other_exception(form, sub_data):
    cur = None
    conn = None
    values = ()
    try:
        conn = psycopg2.connect(
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
            form["business-name"],
            sub_data[1],
            sub_data[2],
            sub_data[3],
            _clean_value(form['requestor-name']),
            _clean_email(form['requestor-email']),
            "Other",
            _clean_date(form['expiration-date']),
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


def create_threshold_exception(form, iteration, sub_data):
    cur = None
    conn = None
    values = ()
    try:
        conn = psycopg2.connect(
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
            status
        ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """
        values = (
            _clean_value(form['business-name_{}'.format(iteration)]),
            sub_data[1],
            sub_data[2],
            sub_data[3],
            _clean_value(form['requestor-name']),
            _clean_email(form['requestor-email']),
            "threshold",
            _clean_date(form['expiration-date_{}'.format(iteration)]),
            _clean_value(form['file_type_{}'.format(iteration)]),
            _clean_value(form['field-threshold-exception_{}'.format(iteration)]),
            _clean_value(form['threshold-requested_{}'.format(iteration)]),
            _clean_value(form['justification']),
            "pending"
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

def get_cdl_exceptions(file_type):
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(
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
        logger.error(error)

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()

def get_submissions(user):
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )

        query = """SELECT * FROM submissions
            WHERE submitter_id
            IN (
                SELECT submitter_users.submitter_id FROM submitter_users 
                WHERE user_id = %s )
        """

        cur = conn.cursor()
        cur.execute(query, (user,))
        return cur.fetchall()

    except Exception as error:
        logger.error(error)

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()

def get_submission_logs(submission_id):

    cur = None
    conn = None
    try:
        conn = psycopg2.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )

   
        query = """SELECT
            submission_logs.log_id,
            submission_logs.submission_id,
            submission_logs.file_type,
            submission_logs.validation_suite,
            submission_logs.json_log,
            submission_logs.outcome,
            standard_codes.item_value
        FROM submission_logs
        LEFT JOIN standard_codes 
                ON UPPER(submission_logs.file_type) = UPPER(standard_codes.item_code) AND list_name='submission_file_type'
        WHERE submission_id= (%s)
        """ 

        cur = conn.cursor()
        cur.execute(query, (submission_id,))
        return cur.fetchall()

    except Exception as error:
        logger.error(error)

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()

def get_user_submissions_and_logs(user):
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(
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
                'file_name', submissions.zip_file_name,
                'status', submissions.status,
                'outcome', submissions.outcome,
                'received_timestamp', submissions.received_timestamp,
                'updated_at', submissions.updated_at,
                'view_modal_content', (
                    SELECT COALESCE(json_agg(json_build_object(
                        'log_id', submission_logs.log_id,
                        'submission_id', submission_logs.submission_id,
                        'file_type', submission_logs.file_type,
                        'validation_suite', submission_logs.validation_suite,
                        'outcome', submission_logs.outcome,
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
            WHERE submissions.submitter_id
            IN (
                SELECT submitter_users.submitter_id FROM submitter_users 
                WHERE submitter_users.user_id = %s )
            GROUP BY (submissions.submission_id)
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
        conn = psycopg2.connect(
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
                'view_modal_content', (
                    SELECT COALESCE(json_agg(json_build_object(
                        'log_id', submission_logs.log_id,
                        'submission_id', submission_logs.submission_id,
                        'file_type', submission_logs.file_type,
                        'validation_suite', submission_logs.validation_suite,
                        'outcome', submission_logs.outcome,
                        'file_type_name', (
                            SELECT standard_codes.item_value FROM standard_codes
                            WHERE UPPER(submission_logs.file_type) = UPPER(standard_codes.item_code) AND list_name='submission_file_type'
                            LIMIT 1
                        )
                    )), '[]'::json)
                )
            )
            FROM submissions
            LEFT JOIN submitters 
                ON submitters.submitter_id = submissions.submitter_id
            LEFT JOIN submission_logs
                ON submissions.submission_id = submission_logs.submission_id
            GROUP BY (submissions.submission_id, submitters.entity_name)
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

def create_extension(form, iteration, sub_data):
    cur = None
    conn = None
    values = ()
    try:
        if iteration > 1:
            values = (
                _clean_value(form['business-name_{}'.format(iteration)]),
                _clean_date(form['requested-target-date_{}'.format(iteration)]),
                _clean_value(form['extension-type_{}'.format(iteration)]),
                int((form['applicable-data-period_{}'.format(iteration)].replace("-", ""))),
                _clean_date(form['hidden-current-expected-date_{}'.format(iteration)]),
                "pending",
                _clean_value(sub_data[1]),
                _clean_value(sub_data[2]),
                _clean_value(sub_data[3]),
                _clean_value(form["requestor-name"]),
                _clean_email(form["requestor-email"]),
                _clean_value(form["justification"])
                )
        else:
            values = (
            _clean_value(form['business-name_{}'.format(iteration)]),
            _clean_date(form['requested-target-date_{}'.format(iteration)]),
            _clean_value(form['extension-type_{}'.format(iteration)]),
            int((form['applicable-data-period_{}'.format(iteration)].replace("-", ""))),
            _clean_date(form['hidden-current-expected-date_{}'.format(iteration)]),
            "pending",
            _clean_value(sub_data[1]),
            _clean_value(sub_data[2]),
            _clean_value(sub_data[3]),
            _clean_value(form["requestor-name"]),
            _clean_email(form["requestor-email"]),
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
        conn = psycopg2.connect(
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

def update_extension(form):
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require'
        )
        cur = conn.cursor()
        operation = """UPDATE extensions
            SET
            updated_at= %s,"""
        
        set_values = []
        # to set column names for query to the correct DB name
        columns = {
            'applicable-data-period': 'applicable_data_period',
            'status': 'status',
            'outcome': 'outcome',
            'approved-expiration-date': 'approved_expiration_date'
        }
        # To make sure fields are not blank. 
        # If they aren't, add column to update set operation
        for field, column_name in columns.items():
            value = form.get(field)
            if value not in (None, ""):
                set_values.append(f"{column_name} = %s")

        # to allow notes to be cleared, need to move notes out of the loop that ignores none
        operation += ", ".join(set_values) + ", notes = %s WHERE extension_id = %s"
        ## add last update time to all extension updates
        values = [
            datetime.now(),
        ]
        
        for field, column_name in columns.items():
            value = form.get(field)
            if value not in (None, ""):
                # to make sure applicable data period field is an int to insert to DB
                if column_name == 'applicable_data_period':
                    values.append(int(value.replace('-', '')))
                # else server side clean values
                else:
                    values.append(_clean_value(value))

        # to allow notes to be cleared, need to move notes out of the loop that ignores none
        values.append(_clean_value(form['notes']))
        ## to make sure extension id is last in query to match with WHERE statement
        values.append(_clean_value(form['extension_id']))

        cur.execute(operation, values)
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
    try:
        conn = psycopg2.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require',
        )
        cur = conn.cursor()
        query = """
                SELECT 
                    submitter_users.submitter_id, 
                    submitters.submitter_code, 
                    submitters.payor_code, 
                    submitter_users.user_id, 
                    submitters.entity_name
                FROM submitter_users
                JOIN submitters
                    ON submitter_users.submitter_id = submitters.submitter_id and submitter_users.user_id = (%s)
                ORDER BY submitters.entity_name, submitter_users.submitter_id
            """
        cur = conn.cursor()
        cur.execute(query, (user,))
        return cur.fetchall()

    except Exception as error:
        logger.error(error)

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()

def get_applicable_data_periods(submitter_id):
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require',
        )
        cur = conn.cursor()
        query = """ SELECT distinct data_period_start FROM submitter_calendar WHERE submitter_id = (%s) AND cancelled = 'FALSE' AND granted_reprieve='FALSE' AND submission_id is Null """
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
        conn = psycopg2.connect(
            host=APCD_DB['host'],
            dbname=APCD_DB['database'],
            user=APCD_DB['user'],
            password=APCD_DB['password'],
            port=APCD_DB['port'],
            sslmode='require',
        )
        cur = conn.cursor()
        query = """ SELECT expected_submission_date FROM submitter_calendar WHERE submitter_id = (%s) AND data_period_start = (%s) AND cancelled = 'FALSE' AND granted_reprieve='FALSE' AND submission_id is Null """
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
        conn = psycopg2.connect(
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
        conn = psycopg2.connect(
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
        conn = psycopg2.connect(
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
            'approved': 'approved_expiration_date',
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
    if len(value):
        return int(float(value))
