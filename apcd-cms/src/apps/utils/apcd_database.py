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
            host=APCD_DB["host"],
            dbname=APCD_DB["database"],
            user=APCD_DB["user"],
            password=APCD_DB["password"],
            port=APCD_DB["port"],
            sslmode="require",
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
            host=APCD_DB["host"],
            dbname=APCD_DB["database"],
            user=APCD_DB["user"],
            password=APCD_DB["password"],
            port=APCD_DB["port"],
            sslmode="require",
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
            host=APCD_DB["host"],
            dbname=APCD_DB["database"],
            user=APCD_DB["user"],
            password=APCD_DB["password"],
            port=APCD_DB["port"],
            sslmode="require",
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
            True if "types_of_files_eligibility_enrollment" in form else False,
            True if "types_of_files_provider" in form else False,
            True if "types_of_files_medical" in form else False,
            True if "types_of_files_pharmacy" in form else False,
            True if "types_of_files_dental" in form else False,
            True if form["on-behalf-of"] == "true" else False,
            _clean_value(form["submission_method"]),
            "Received",
            _clean_value(form["type"]),
            _clean_value(form["business-name"]),
            _clean_value(form["mailing-address"]),
            _clean_value(form["city"]),
            form["state"][:2],
            form["zip_code"],
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


def get_registration_entities():
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(
            host=APCD_DB["host"],
            dbname=APCD_DB["database"],
            user=APCD_DB["user"],
            password=APCD_DB["password"],
            port=APCD_DB["port"],
            sslmode="require",
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
    cur = None
    conn = None
    values = ()
    try:
        if iteration > 1:
            if not _acceptable_entity(form, iteration):
                return
            values = (
                reg_id,
                _set_int(form["total_claims_value_{}".format(iteration)]),
                _set_int(form["claims_encounters_volume_{}".format(iteration)]),
                _set_int(form["license_number_{}".format(iteration)]),
                _set_int(form["naic_company_code_{}".format(iteration)]),
                _set_int(form["total_covered_lives_{}".format(iteration)]),
                _clean_value(form["entity_name_{}".format(iteration)]),
                _clean_value(form["fein_{}".format(iteration)]),
            )
        else:
            values = (
                reg_id,
                _set_int(form["total_claims_value"]),
                _set_int(form["claims_encounters_volume"]),
                _set_int(form["license_number"]),
                _set_int(form["naic_company_code"]),
                _set_int(form["total_covered_lives"]),
                _clean_value(form["entity_name"]),
                _clean_value(form["fein"]),
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
            host=APCD_DB["host"],
            dbname=APCD_DB["database"],
            user=APCD_DB["user"],
            password=APCD_DB["password"],
            port=APCD_DB["port"],
            sslmode="require",
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


def get_registration_contacts():
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(
            host=APCD_DB["host"],
            dbname=APCD_DB["database"],
            user=APCD_DB["user"],
            password=APCD_DB["password"],
            port=APCD_DB["port"],
            sslmode="require",
        )
        query = """SELECT
                registration_contacts.registration_contact_id,
                registration_contacts.registration_id,
                registration_contacts.notify_flag,
                registration_contacts.contact_type,
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
    cur = None
    conn = None
    values = ()
    try:
        if iteration > 1:
            if not _acceptable_contact(form, iteration):
                return
            values = (
                reg_id,
                True if "contact_notifications_{}".format(iteration) in form else False,
                _clean_value(form["contact_type_{}".format(iteration)]),
                _clean_value(form["contact_name_{}".format(iteration)]),
                re.sub("[^0-9]", "", form["contact_phone_{}".format(iteration)]),
                _clean_email(form["contact_email_{}".format(iteration)]),
            )
        else:
            values = (
                reg_id,
                True if "contact_notifications" in form else False,
                _clean_value(form["contact_type"]),
                _clean_value(form["contact_name"]),
                re.sub("[^0-9]", "", form["contact_phone"]),
                _clean_email(form["contact_email"]),
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
            host=APCD_DB["host"],
            dbname=APCD_DB["database"],
            user=APCD_DB["user"],
            password=APCD_DB["password"],
            port=APCD_DB["port"],
            sslmode="require",
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


def create_submitter(form, reg_data):
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(
            host=APCD_DB["host"],
            dbname=APCD_DB["database"],
            user=APCD_DB["user"],
            password=APCD_DB["password"],
            port=APCD_DB["port"],
            sslmode="require",
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
            created_at
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
            reg_data[10],
            reg_data[9],
            form["submit_code"],
            _set_int(form["payor_code"]),
            form["encryption_key"],
            datetime.datetime.now(),
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


def get_submitter_for_exception(u):
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(
            host=APCD_DB["host"],
            dbname=APCD_DB["database"],
            user=APCD_DB["user"],
            password=APCD_DB["password"],
            port=APCD_DB["port"],
            sslmode="require",
        )
        cur = conn.cursor()
        query = """SELECT submitters.submitter_id, submitters.submitter_code, submitters.payor_code, submitter_users.username 
        FROM submitters 
        LEFT JOIN submitter_users 
        ON submitters.submitter_id = submitter_users.submitter_id 
        WHERE user_id = user AND submitter_id = submitter
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


def create_other_exception(form, sub_data):
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(
            host=APCD_DB["host"],
            dbname=APCD_DB["database"],
            user=APCD_DB["user"],
            password=APCD_DB["password"],
            port=APCD_DB["port"],
            sslmode="require",
        )
        cur = conn.cursor()
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
            outcome,
            created_at
        ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        RETURNING submitter_id"""
        values = (
            sub_data[0],
            sub_data[1],
            sub_data[2],
            sub_data[3],
            _clean_value(form["requestor-name"]),
            _clean_email(form["requestor-email"]),
            "Other",
            _clean_value(form["exception_end_date"]),
            _clean_value(form["justification"]),
            "Pending",
            datetime.datetime.now(),
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


def create_threshold_exception(form, sub_data):
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(
            host=APCD_DB["host"],
            dbname=APCD_DB["database"],
            user=APCD_DB["user"],
            password=APCD_DB["password"],
            port=APCD_DB["port"],
            sslmode="require",
        )
        cur = conn.cursor()
        operation = """INSERT INTO exceptions(
            submitter_id,
            submitter_code,
            payor_code,
            user_id,
            requestor_name,
            requestor_email,
            request_type,
            data_file,
            field_number,
            required_threshold,
            requested_threshold,
            requested_expiration_date,
            explanation_justification,
            outcome,
            created_at
        ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        RETURNING submitter_id"""
        values = (
            sub_data[0],
            sub_data[1],
            sub_data[2],
            sub_data[3],
            _clean_value(form["requestor-name"]),
            _clean_email(form["requestor-email"]),
            "Threshold",
            _clean_value(form["file_type"]),
            _clean_value(form["threshold-field"]),
            _clean_value(form["threshold-requested"]),
            _clean_value(form["expiration_date"]),
            _clean_value(form["justification"]),
            "Pending",
            datetime.datetime.now(),
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


def get_submissions(user):
    cur = None
    conn = None
    try:
        conn = psycopg2.connect(
            host=APCD_DB["host"],
            dbname=APCD_DB["database"],
            user=APCD_DB["user"],
            password=APCD_DB["password"],
            port=APCD_DB["port"],
            sslmode="require",
        )

        query = """SELECT
            *
            FROM submissions
            WHERE submitter_id 
            IN (SELECT submitter_users.submitter_id FROM submitter_users WHERE user_id = %s )
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
            host=APCD_DB["host"],
            dbname=APCD_DB["database"],
            user=APCD_DB["user"],
            password=APCD_DB["password"],
            port=APCD_DB["port"],
            sslmode="require",
        )

        query = """SELECT 
        submission_logs.log_id, 
        submission_logs.submission_id, 
        submission_logs.file_type, 
        submission_logs.validation_suite, 
        submission_logs.json_log, 
        submission_logs.outcome 
        FROM submission_logs 
        WHERE submission_id= %s
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


def _acceptable_entity(form, iteration):
    required_keys = [
        "total_claims_value_{}".format(iteration),
        "claims_encounters_volume_{}".format(iteration),
        "total_covered_lives_{}".format(iteration),
        "entity_name_{}".format(iteration),
    ]
    requires_one = [
        "naic_company_code_{}".format(iteration),
        "license_number_{}".format(iteration),
        "fein_{}".format(iteration),
    ]
    if all(key in form and form[key] for key in required_keys):
        return next((True for key in requires_one if key), False)
    return False


def _acceptable_contact(form, iteration):
    required_keys = [
        "contact_type_{}".format(iteration),
        "contact_name_{}".format(iteration),
        "contact_phone_{}".format(iteration),
        "contact_email_{}".format(iteration),
    ]
    return all(key in form and form[key] for key in required_keys)


def _clean_email(email):
    pattern = re.compile(
        r"""(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])"""
    )
    result = pattern.match(email)
    return result.string if result else None


def _clean_value(value):
    return re.sub("[^a-zA-Z0-9 \.\-\,]", "", value)


def _set_int(value):
    if len(value):
        return int(float(value))
