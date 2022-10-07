from django.conf import settings
import psycopg2
import datetime
import re
import logging

logger = logging.getLogger(__name__)

APCD_DB = settings.APCD_DATABASE


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
            datetime.datetime.now(),
            None,
            None,
            True if 'types_of_files_eligibility_enrollment' in form else False,
            True if 'types_of_files_provider' in form else False,
            True if 'types_of_files_medical' in form else False,
            True if 'types_of_files_pharmacy' in form else False,
            True if 'types_of_files_dental' in form else False,
            True if form['on-behalf-of'] == 'true' else False,
            form['submission_method'],
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
        return cur.fetchone()[0]

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


def create_registration_entity(form, reg_id, iteration):
    values = (
        reg_id,
        form['total_claims_value'],
        form['claims_encounters_volume'],
        form['license_number'],
        form['naic_company_code'],
        form['total_covered_lives'],
        form['entity_name'],
        form['fein']
    )
    if iteration > 1:
        if not acceptable_entity(form, iteration):
            return
        values = (
            reg_id,
            form['total_claims_value_{}'.format(iteration)],
            form['claims_encounters_volume_{}'.format(iteration)],
            form['license_number_{}'.format(iteration)],
            form['naic_company_code_{}'.format(iteration)],
            form['total_covered_lives_{}'.format(iteration)],
            form['entity_name_{}'.format(iteration)],
            form['fein_{}'.format(iteration)]
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


def create_registration_contact(form, reg_id, iteration):
    values = (
        reg_id,
        True if 'contact_notifications' in form else False,
        form['contact_type'],
        form['contact_name'],
        re.sub("[^0-9]", "", form['contact_phone']),
        form['contact_email']
    )
    if iteration > 1:
        if not acceptable_contact(form, iteration):
            return
        values = (
            reg_id,
            True if 'contact_notifications_{}'.format(iteration) in form else False,
            form['contact_type_{}'.format(iteration)],
            form['contact_name_{}'.format(iteration)],
            re.sub("[^0-9]", "", form['contact_phone_{}'.format(iteration)]),
            form['contact_email_{}'.format(iteration)]
        )

    operation = """INSERT INTO registration_contacts(
        registration_id,
        notify_flag,
        contact_role,
        contact_name,
        contact_phone,
        contact_email
    ) VALUES (%s,%s,%s,%s,%s,%s)"""

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
        cur.execute(operation, values)
        conn.commit()

    except Exception as error:
        logger.error(error)

    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()


def acceptable_entity(form, iteration):
    entity_keys = [
        'total_claims_value_{}'.format(iteration),
        'claims_encounters_volume_{}'.format(iteration),
        'license_number_{}'.format(iteration),
        'naic_company_code_{}'.format(iteration),
        'total_covered_lives_{}'.format(iteration),
        'entity_name_{}'.format(iteration),
        'fein_{}'.format(iteration)
    ]
    return all(key in form and form[key] for key in entity_keys)


def acceptable_contact(form, iteration):
    contact_keys = [
        'contact_type_{}'.format(iteration),
        'contact_name_{}'.format(iteration),
        'contact_phone_{}'.format(iteration),
        'contact_email_{}'.format(iteration)
    ]
    return all(key in form and form[key] for key in contact_keys)
