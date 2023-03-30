from django.conf import settings
import psycopg2
from datetime import datetime
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
        query = """SELECT * FROM users 
                NATURAL JOIN roles 
                ORDER BY users.org_name ASC
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


def get_registrations(reg_id=None):
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
                registrations.registration_id,
                registrations.posted_date,
                registrations.applicable_period_start,
                registrations.applicable_period_end,
                registrations.file_me,
                registrations.file_pv,
                registrations.file_mc,
                registrations.file_pc,
                registrations.file_dc,
                registrations.submitting_for_self,
                registrations.submission_method,
                registrations.registration_status,
                registrations.org_type,
                registrations.business_name,
                registrations.mail_address,
                registrations.city,
                registrations.state,
                registrations.zip
                FROM registrations {f"WHERE registration_id = {str(reg_id)}" if reg_id is not None else ''}"""
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


def create_registration(form):
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
            file_me,
            file_pv,
            file_mc,
            file_pc,
            file_dc,
            submitting_for_self,
            submission_method,
            registration_status,
            org_type,
            business_name,
            mail_address,
            city,
            state,
            zip
        ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        RETURNING registration_id"""
        values = (
            datetime.now(),
            None,
            None,
            True,
            True if 'types_of_files_provider' in form else False,
            True if 'types_of_files_medical' in form else False,
            True if 'types_of_files_pharmacy' in form else False,
            True if 'types_of_files_dental' in form else False,
            True if form['on-behalf-of'] == 'true' else False,
            _clean_value(form['submission_method']),
            'Received',
            _clean_value(form['type']),
            _clean_value(form['business-name']),
            _clean_value(form['mailing-address']),
            _clean_value(form['city']),
            form['state'][:2],
            form['zip_code']
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
            file_pv = %s,
            file_mc = %s,
            file_pc = %s,
            file_dc = %s,
            submitting_for_self = %s,
            submission_method = %s,
            org_type = %s,
            business_name = %s,
            mail_address = %s,
            city = %s,
            state = %s,
            zip = %s,
            updated_at= %s
        WHERE registration_id = %s
        RETURNING registration_id"""
        values = (
            True if 'types_of_files_provider' in form else False,
            True if 'types_of_files_medical' in form else False,
            True if 'types_of_files_pharmacy' in form else False,
            True if 'types_of_files_dental' in form else False,
            True if form['on-behalf-of'] == 'true' else False,
            _clean_value(form['submission_method']),
            _clean_value(form['type']),
            _clean_value(form['business-name']),
            _clean_value(form['mailing-address']),
            _clean_value(form['city']),
            form['state'][:2],
            form['zip_code'],
            datetime.now(),
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


def get_registration_entities(reg_id=None):
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
                registration_entities.fein
                FROM registration_entities {f"WHERE registration_id =  {str(reg_id)}" if reg_id is not None else ''}"""
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


def create_registration_entity(form, reg_id, iteration, from_update_reg=None):
    cur = None
    conn = None
    values = ()
    try:
        if iteration > 1:
            if not _acceptable_entity(form, iteration, reg_id if from_update_reg else None):
                return
            str_end = f'{iteration}{ f"_{reg_id}" if from_update_reg else "" }'
            values = (
                reg_id,
                float(form['total_claims_value_{}'.format(str_end)]),
                _set_int(form['claims_encounters_volume_{}'.format(str_end)]),
                _set_int(form['license_number_{}'.format(str_end)]),
                _set_int(form['naic_company_code_{}'.format(str_end)]),
                _set_int(form['total_covered_lives_{}'.format(str_end)]),
                _clean_value(form['entity_name_{}'.format(str_end)]),
                _clean_value(form['fein_{}'.format(str_end)])
            )
        else:            
            str_end = f'_{iteration}_{reg_id}' if from_update_reg else ''
            values = (
                reg_id,
                float(form[f'total_claims_value{str_end}']),
                _set_int(form[f'claims_encounters_volume{str_end}']),
                _set_int(form[f'license_number{str_end}']),
                _set_int(form[f'naic_company_code{str_end}']),
                _set_int(form[f'total_covered_lives{str_end}']),
                _clean_value(form[f'entity_name{str_end}']),
                _clean_value(form[f'fein{str_end}'])
            )

        operation = """INSERT INTO registration_entities(
            registration_id,
            total_claims_value,
            claims_and_encounters_volume,
            license_number,
            naic_company_code,
            total_covered_lives,
            entity_name,
            fein
        ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)"""

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
        if not _acceptable_entity(form, iteration, reg_id):
            if iteration <= no_entities: # entity is not in form but was in original entity list -> need to delete
                return delete_registration_entity(reg_id, form[f'ent_id_{iteration}'])
            return
        if iteration > no_entities: # entity is in form but not in original list -> need to create
            return create_registration_entity(form, reg_id, iteration, True)
        str_end = f'{iteration}_{reg_id}'
        values = (
            float(form['total_claims_value_{}'.format(str_end)]),
            _set_int(form['claims_encounters_volume_{}'.format(str_end)]),
            _set_int(form['license_number_{}'.format(str_end)]),
            _set_int(form['naic_company_code_{}'.format(str_end)]),
            _set_int(form['total_covered_lives_{}'.format(str_end)]),
            _clean_value(form['entity_name_{}'.format(str_end)]),
            _clean_value(form['fein_{}'.format(str_end)]),
            reg_id,
            form[f'ent_id_{iteration}']
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
            fein = %s
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


def get_registration_contacts(reg_id=None):
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
                FROM registration_contacts {f"WHERE registration_id = {str(reg_id)}" if reg_id is not None else ''}"""
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


def create_registration_contact(form, reg_id, iteration, from_update_reg=None):
    cur = None
    conn = None
    values = ()
    try:
        if iteration > 1:
            if not _acceptable_contact(form, iteration, reg_id if from_update_reg else None):
                return
            str_end = f'{iteration}{ f"_{reg_id}" if from_update_reg else "" }'
            values = (
                reg_id,
                True if 'contact_notifications_{}'.format(str_end) in form else False,
                _clean_value(form['contact_type_{}'.format(str_end)]),
                _clean_value(form['contact_name_{}'.format(str_end)]),
                re.sub("[^0-9]", "", form['contact_phone_{}'.format(str_end)]),
                _clean_email(form['contact_email_{}'.format(str_end)])
            )
        else:
            str_end = f'_{iteration}_{reg_id}' if from_update_reg else ''
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
            return create_registration_contact(form, reg_id, iteration, True)
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
            submission_method,
            submitting_for_self,
            submitter_code,
            payor_code,
            encryption_key,
            created_at,
            status
        ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        RETURNING submitter_id"""
        values = (
            reg_data[0],
            reg_data[13],
            reg_data[6],
            reg_data[5],
            reg_data[4],
            reg_data[7],
            reg_data[8],
            reg_data[10],
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


def create_threshold_exception(form, sub_data):
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
            form["business-name"],
            sub_data[1],
            sub_data[2],
            sub_data[3],
            _clean_value(form['requestor-name']),
            _clean_email(form['requestor-email']),
            "Threshold",
            _clean_date(form['expiration-date']),
            _clean_value(form['file_type']),
            _clean_value(form['field-threshold-exception']),
            _clean_value(form['threshold-requested']),
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


def get_all_submissions():
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
                submissions.submission_id,
                submissions.apcd_id,
                submissions.submitter_id, 
                submissions.zip_file_name,
                submissions.status,
                submissions.outcome,
                submissions.received_timestamp,
                submissions.updated_at,
                apcd_orgs.official_name
            FROM submissions
            JOIN apcd_orgs
                ON submissions.apcd_id = apcd_orgs.apcd_id
            ORDER BY submissions.received_timestamp DESC
        """ 
        cur = conn.cursor()
        cur.execute(query)
        return cur.fetchall()
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
                'apcd_id', submissions.apcd_id,
                'submitter_id', submissions.submitter_id,
                'file_name', submissions.zip_file_name,
                'status', submissions.status,
                'outcome', submissions.outcome,
                'received_timestamp', submissions.received_timestamp,
                'updated_at', submissions.updated_at,
                'org_name', apcd_orgs.official_name,
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
            JOIN apcd_orgs
                ON submissions.apcd_id = apcd_orgs.apcd_id
            LEFT JOIN submission_logs
                ON submissions.submission_id = submission_logs.submission_id
            GROUP BY (submissions.submission_id, apcd_orgs.official_name)
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
                _clean_value(sub_data[0]),
                _clean_date(form['current-expected-date_{}'.format(iteration)]),
                _clean_date(form['requested-target-date_{}'.format(iteration)]),
                None,
                _clean_value(form['extension-type_{}'.format(iteration)]),
                int(form['applicable-data-period_{}'.format(iteration)].replace('-', '')),
                "Pending",
                _clean_value(sub_data[1]),
                _clean_value(sub_data[2]),
                _clean_value(sub_data[3]),
                _clean_value(form["requestor-name"]),
                _clean_email(form["requestor-email"]),
                _clean_value(form["justification"])
                )
        else:
            values = (
            _clean_value(sub_data[0]),
            _clean_date(form['current-expected-date']),
            _clean_date(form['requested-target-date']),
            None,
            _clean_value(form['extension-type']),
            int(form['applicable-data-period'].replace('-', '')),
            "Pending",

            _clean_value(sub_data[1]),
            _clean_value(sub_data[2]),
            _clean_value(sub_data[3]),
            _clean_value(form["requestor-name"]),
            _clean_email(form["requestor-email"]),
            _clean_value(form["justification"])
            )   

        operation = """INSERT INTO extensions(
            submitter_id,
            current_expected_date,
            requested_target_date,
            approved_expiration_date,
            extension_type,
            applicable_data_period,
            status,
            submitter_code,
            payor_code,
            user_id,
            requestor_name,
            requestor_email,
            explanation_justification
        ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
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

def get_submitter_for_extend_or_except(user):
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
                    apcd_orgs.official_name
                FROM submitter_users
                JOIN submitters
                    ON submitter_users.submitter_id = submitters.submitter_id and submitter_users.user_id = (%s)
                JOIN apcd_orgs
                    ON submitters.apcd_id = apcd_orgs.apcd_id
                ORDER BY submitters.apcd_id, submitter_users.submitter_id
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
                apcd_orgs.official_name
            FROM extensions
            JOIN submitters
                ON extensions.submitter_id = submitters.submitter_id
            JOIN apcd_orgs
                ON submitters.apcd_id = apcd_orgs.apcd_id
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
                apcd_orgs.official_name,
                standard_codes.item_value
            FROM exceptions
            JOIN submitters
                ON exceptions.submitter_id = submitters.submitter_id
            JOIN apcd_orgs
                ON submitters.apcd_id = apcd_orgs.apcd_id
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
    return re.sub('[^a-zA-Z0-9 \.\-\,]', '', str(value))

def _clean_date(date_string):
    date_pattern = re.compile(r'^\d{4}-\d{2}-\d{2}$')

    if re.match(date_pattern, date_string):
        return date_string
    else:
        return None

def _set_int(value):
    if len(value):
        return int(float(value))
