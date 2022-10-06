from django.conf import settings
import psycopg2
import logging
import datetime

logger = logging.getLogger(__name__)

APCD_DB = "settings.APCD_DATABASE"

"""
Testing...
Replace the following files...
src/taccsite_cms/custom_app_settings.py
src/taccsite_cms/urls_custom.py
src/apps/submission_form/

TABLES:
    registrations <-------------- SUBMISSION FORM (create first) "registration_id"
    registration_entities <------ SUBMISSION FORM (associate to registration)
    registration_contacts <------ SUBMISSION FORM (associate to registration)
    apcd_orgs
    submitters
    submitter_contacts
    submitter_calendar
    roles
    users
    submitter_users
    submissions
    submission_logs
    extensions
    exceptions
    notes
    standard_codes
    logs
"""
# query_intake_tables = "SELECT * FROM information_schema.tables WHERE table_schema = 'intake'"
# query_table_columns = """SELECT table_schema, table_name, column_name, data_type
#                  FROM information_schema.columns WHERE table_name = 'users'"""



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
        operation = """SELECT roles.role_name FROM roles WHERE role_id
                    IN (SELECT users.role_id FROM users
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


def get_registrations():
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
                FROM registrations"""
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
    #[ignore]                                 'registration_id' ===========> 'integer'                1,
    #[create this]                            'posted_date' ===============> 'date'                   datetime.date(2022, 8, 3),
    #[?]                                      'applicable_period_start' ===> 'integer'                12023,
    #[?]                                      'applicable_period_end' =====> 'integer'                122023,
    #[types_of_files_eligibility_enrollment]  'file_me' ===================> 'boolean'                True,
    #[types_of_files_provider]                'file_pv' ===================> 'boolean'                True,
    #[types_of_files_medical]                 'file_mc' ===================> 'boolean'                True,
    #[types_of_files_pharmacy]                'file_pc' ===================> 'boolean'                True,
    #[types_of_files_dental]                  'file_dc' ===================> 'boolean'                False,
    #[on-behalf-of]                           'submitting_for_self' =======> 'boolean'                True,
    #[submit_methods_sftp, submit_methods_https, submit_methods_usb]    'submission_method' =========> 'character varying'      'SFTP',
    #[?]                                      'registration_status' =======> 'character varying'      'active',
    #[type]                                   'org_type' ==================> 'character varying'      'insurance carrier',
    #[business-name]                          'business_name' =============> 'character varying'      'Golden Rule Insurance Company',
    #[mailing-address]                        'mail_address' ==============> 'character varying'      '7440 Woodland Drive',
    #[city]                                   'city' ======================> 'character varying'      'Indianpolis',
    #[state]                                  'state' =====================> 'character'              'IN',
    #[zip_code]                               'zip' =======================> 'character'              '46278'
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
        ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
        values = (
            datetime.datetime.now(),
            None,
            None,
            form['types_of_files_eligibility_enrollment'],
            form['types_of_files_provider'],
            form['types_of_files_medical'],
            form['types_of_files_pharmacy'],
            form['types_of_files_dental'],
            True if form['on-behalf-of'] == 'Self' else False,
            form['submit_methods_sftp'], # OR form['submit_methods_https'] OR form['submit_methods_usb']
            None,
            form['type'],
            form['business-name'],
            form['mailing-address'],
            form['city'],
            form['state'][:2],
            form['zip_code']
        )
        cur.execute(operation, values)
        conn.commit()

    except Exception as error:
        logger.error(error)

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()



def get_registrations():
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
                FROM registrations"""
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



def get_registration_entities():
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
                registration_entities.total_claims_value,
                registration_entities.registration_id,
                registration_entities.claims_and_encounters_volume,
                registration_entities.registration_entity_id,
                registration_entities.license_number,
                registration_entities.naic_company_code,
                registration_entities.total_covered_lives,
                registration_entities.entity_name,
                registration_entities.fein
                FROM registration_entities"""
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


def create_registration_entity(form):
    # GETFROM CREATION RESP           registration_id                 integer             1,
    # IGNORE                          registration_entity_id          integer             1,
    # ['total_claims_value']          total_claims_value              integer             103229029,
    # ['claims_encounters_volume']    claims_and_encounters_volume    integer             397725,
    # ['license_number']              license_number                  integer             376028756,
    # ['naic_company_code']           naic_company_code               integer             70762286,
    # ['total_covered_lives']         total_covered_lives             integer             98350,
    # [?]                             entity_name                     character varying   'Golden Rule Insurance Company',
    # ['fein']                        fein                            character varying   '376028756'

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
        values = (
            4, # "GETFROM CREATION RESP"
            form['total_claims_value'],
            form['claims_encounters_volume'],
            form['license_number'],
            form['naic_company_code'],
            form['total_covered_lives'],
            None,
            form['fein']
        )
        cur.execute(operation, values)
        conn.commit()

    except Exception as error:
        logger.error(error)

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()


def get_registration_contacts():
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
                registration_contacts.registration_contact_id,
                registration_contacts.registration_id,
                registration_contacts.notify_flag,
                registration_contacts.contact_role,
                registration_contacts.contact_name,
                registration_contacts.contact_phone,
                registration_contacts.contact_email
                FROM registration_contacts"""
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



def create_registration_contact(form):
    # IGNORE                 registration_contact_id    integer
    # RESPONSE               registration_id            integer
    # ['contact_notifications']  notify_flag                boolean
    # ['contact_type']           contact_role               character varying
    # ['name']                   contact_name               character varying
    # ['contact_phone']          contact_phone              character varying
    # ['contact_email']          contact_email              character varying
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
        operation = """INSERT INTO registration_contacts(
            registration_id,
            notify_flag,
            contact_role,
            contact_name,
            contact_phone,
            contact_email
        ) VALUES (%s,%s,%s,%s,%s,%s)"""
        values = (
            4, #comes from registration response...
            form['contact_notifications'],
            form['contact_type'],
            form['name'],
            form['contact_phone'],
            form['contact_email']
        )
        cur.execute(operation, values)
        conn.commit()

    except Exception as error:
        logger.error(error)

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()


def custom_query(query):
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
        cur.execute(query)
        return cur.fetchall()

    except Exception as error:
        logger.error(error)

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()










# def get_submissions():
#     cur = None
#     conn = None
#     try:
#         conn = psycopg2.connect(
#             host=APCD_DB['host'],
#             dbname=APCD_DB['database'],
#             user=APCD_DB['user'],
#             password=APCD_DB['password'],
#             port=APCD_DB['port'],
#             sslmode='require'
#         )
#         # query = """SELECT * FROM submissions"""
#         query = """SELECT
#         submissions.compressed_size,
#         submissions.apcd_id,
#         submissions.submitter_id,
#         submissions.received_timestamp,
#         submissions.data_period_start,
#         submissions.data_period_end,
#         submissions.submission_id,
#         submissions.test_submission_flag,
#         submissions.zip_file_name,
#         submissions.status,
#         submissions.outcome,
#         submissions.outcome_reason
#         FROM submissions"""
#         cur = conn.cursor()
#         cur.execute(query)
#         return cur.fetchall()

#     except Exception as error:
#         logger.error(error)

#     finally:
#         if cur is not None:
#             cur.close()
#         if conn is not None:
#             conn.close()

# def create_submission(form):
#     cur = None
#     conn = None
#     try:
#         conn = psycopg2.connect(
#             host=APCD_DB['host'],
#             dbname=APCD_DB['database'],
#             user=APCD_DB['user'],
#             password=APCD_DB['password'],
#             port=APCD_DB['port'],
#             sslmode='require'
#         )
#         cur = conn.cursor()
#         operation = """INSERT INTO submissions(
#             'compressed_size',
#             'apcd_id',
#             'submitter_id',
#             'received_timestamp',
#             'data_period_start',
#             'data_period_end',
#             'submission_id',
#             'test_submission_flag',
#             'zip_file_name',
#             'status',
#             'outcome',
#             'outcome_reason',
#         ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
#         values = ( #these need to be mapped correctly from the CMS form...
#             form['compressed_size'],
#             form['apcd_id'],
#             form['submitter_id'],
#             form['received_timestamp'],
#             form['data_period_start'],
#             form['data_period_end'],
#             form['submission_id'],
#             form['test_submission_flag'],
#             form['zip_file_name'],
#             form['status'],
#             form['outcome'],
#             form['outcome_reason'],
#         )
#         cur.execute(operation, values)
#         conn.commit()

#     except Exception as error:
#         logger.error(error)

#     finally:
#         if cur is not None:
#             cur.close()
#         if conn is not None:
#             conn.close()


# def apcd_db_delete_user(user):
#     cur = None
#     conn = None
#     try:
#         conn = psycopg2.connect(
#             host=APCD_DB['host'],
#             dbname=APCD_DB['database'],
#             user=APCD_DB['user'],
#             password=APCD_DB['password'],
#             port=APCD_DB['port'],
#             sslmode='require'
#         )
#         query = """DELETE FROM users
#                     WHERE user_id = %s"""
#         cur = conn.cursor()
#         cur.execute(query, (user,))
#         conn.commit()

#     except Exception as error:
#         logger.error(error)

#     finally:
#         if cur is not None:
#             cur.close()
#         if conn is not None:
#             conn.close()


# def apcd_db_get_users():
#     cur = None
#     conn = None
#     try:
#         conn = psycopg2.connect(
#             host=APCD_DB['host'],
#             dbname=APCD_DB['database'],
#             user=APCD_DB['user'],
#             password=APCD_DB['password'],
#             port=APCD_DB['port'],
#             sslmode='require'
#         )
#         query = """SELECT * FROM users"""
#         cur = conn.cursor()
#         cur.execute(query)
#         return cur.fetchall()

#     except Exception as error:
#         logger.error(error)

#     finally:
#         if cur is not None:
#             cur.close()
#         if conn is not None:
#             conn.close()


# def apcd_db_create_user(data):
#     """
#     Example:
#     data = (
#         1,
#         'keiths',
#         'kstrmiska@tacc.utexas.edu',
#         'Keith Strmiska',
#         'TACC'
#     )
#     """
#     cur = None
#     conn = None
#     try:
#         conn = psycopg2.connect(
#             host=APCD_DB['host'],
#             dbname=APCD_DB['database'],
#             user=APCD_DB['user'],
#             password=APCD_DB['password'],
#             port=APCD_DB['port'],
#             sslmode='require'
#         )
#         query = """INSERT INTO users(role_id, user_id, user_email, user_name, org_name)
#                    VALUES (%s,%s,%s,%s,%s)"""
#         cur = conn.cursor()
#         cur.execute(query, data)
#         conn.commit()

#     except Exception as error:
#         logger.error(error)

#     finally:
#         if cur is not None:
#             cur.close()
#         if conn is not None:
#             conn.close()
