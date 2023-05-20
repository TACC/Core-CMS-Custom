from django.http import HttpResponse, HttpResponseRedirect
from django.views.generic.base import TemplateView
from django.template import loader
from apps.utils.apcd_database import get_registrations, get_registration_contacts, get_registration_entities, create_submitter, update_registration, update_registration_contact, update_registration_entity
from apps.utils.apcd_groups import is_apcd_admin
from apps.utils.utils import table_filter
from apps.components.paginator.paginator import paginator
import logging
from dateutil import parser

logger = logging.getLogger(__name__)


class RegistrationsTable(TemplateView):
    template_name = 'list_registrations.html'

    def post(self, request):

        form = request.POST.copy()
        reg_id = int(form['reg_id'])

        reg_data = get_registrations(reg_id)[0]
        reg_entities = get_registration_entities(reg_id)
        reg_contacts = get_registration_contacts(reg_id)
        
        def _err_msg(resp):
            if hasattr(resp, 'pgerror'):
                return resp.pgerror
            if isinstance(resp, Exception):
                return str(resp)
            return None
        
        def _new_submitter(form, reg_data=reg_data):
            errors = []
            
            sub_resp = create_submitter(form, reg_data)
            template = loader.get_template('create_submitter_success.html')
            if _err_msg(sub_resp) or type(sub_resp) != int:
                errors.append(_err_msg(sub_resp))
                template = loader.get_template('create_submitter_error.html')

            return template
        
        def _edit_registration(form, reg_entities=reg_entities, reg_contacts=reg_contacts):
            errors = []
            reg_resp = update_registration(form, reg_id)
            if not _err_msg(reg_resp) and type(reg_resp) == int:
                for iteration in range(1, 6):
                    contact_resp = update_registration_contact(form, reg_id, iteration, len(reg_contacts))
                    entity_resp = update_registration_entity(form, reg_id, iteration, len(reg_entities))
                    if _err_msg(contact_resp):
                        errors.append(_err_msg(contact_resp))
                    if _err_msg(entity_resp):
                        errors.append(_err_msg(entity_resp))
                if len(errors) != 0:
                    template = loader.get_template('edit_registration_error.html')
                template = loader.get_template('edit_registration_success.html')
            else:
                errors.append(_err_msg(reg_resp))
                template = loader.get_template('edit_registration_error.html')
            return template

        if 'create-submitter-form' in form:
            template = _new_submitter(form)
        elif 'edit-registration-form' in form:
            template = _edit_registration(form)
        return HttpResponse(template.render({}, request))

    def get(self, request, *args, **kwargs):
        import datetime
        registrations_content = [
            (76, datetime.date(2022, 10, 24), 202210, 202302, True, 'complete', 'carrier', 'GlobalHealth of Texas, Inc.', '210 Park Avenue, Suite 2800', 'Oklahoma City', 'OK', '73102     '),
            (77, datetime.date(2022, 10, 24), 202210, 202302, True, 'complete', 'carrier', 'Golden Rule Insurance Company', '7440 Woodland Drive', 'Indianapolis', 'IN', '46278     '),
            (78, datetime.date(2022, 10, 24), 202210, 202302, True, 'complete', 'carrier', 'Molina Healthcare of Texas', '1660 Westridge Circle North', 'Irving', 'TX', '75038     '),
            (86, datetime.date(2022, 11, 1), 202210, 202302, False, 'complete', 'pbm', 'CVS-PBM Part 1', '151 Farmington Avenue, RC61', 'Hartford', 'CT', '06156     '),
            (87, datetime.date(2022, 11, 1), 202210, 202302, False, 'complete', 'pbm', 'CVS-PBM Part 2', '151 Farmington Avenue, RC61', 'Hartford', 'CT', '06156     '),
            (88, datetime.date(2022, 11, 1), 202210, 202302, False, 'complete', 'pbm', 'CVS-PBM Part 3', '151 Farmington Avenue, RC61', 'Hartford', 'CT', '06156     '),
            (104, datetime.date(2022, 11, 10), 202210, 202302, True, 'complete', 'carrier', 'Cigna Health and Life Insurance Company', '900 Cottage Grove Road', 'Bloomfield', 'CT', '06002     '),
            (105, datetime.date(2022, 11, 10), 202210, 202302, False, 'processing', 'carrier', 'Baylor Scott and White Health Plan', '1206 West Campus Drive', 'Temple', 'TX', '76502     '),
            (106, datetime.date(2022, 11, 10), 202210, 202302, True, 'complete', 'carrier', 'Sendero Health Plans', '2028 E. Ben White Boulevard, Suite 400', 'Austin', 'TX', '78741     '),
            (107, datetime.date(2022, 11, 10), 202210, 202302, False, 'processing', 'carrier', 'Crum & Forster', '5 Christopher Way, 2nd Floor', 'Eatontown', 'NJ', '07724     '),
            (108, datetime.date(2022, 11, 10), 202210, 202302, True, 'complete', 'carrier', 'Integon National Insurance Company', '1515 North Rivercenter Drive, Suite 135', 'Milwaukee', 'WI', '53212     '),
            (110, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'tpa_aso', 'OptumHealth Care Solutions, Inc.', '11000 Optum Circle', 'Eden Prairie', 'MN', '55344     '),
            (112, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'National Health Insurance Company', '1515 North Rivercenter Drive, Suite 135', 'Milwaukee', 'WI', '53212     '),
            (114, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'Sun Life Assurance Company of Canada', '2323 Grand Boulevard', 'Kansas City', 'MO', '64108     '),
            (115, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'The Prudential Insurance Company of America', '751 Broad Street, 5th Floor', 'Newark', 'NJ', '07102     '),
            (116, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'UnitedHealthcare Medicare & Retirement', 'PO Box 9472', 'Minneapolis', 'MN', '55440     '),
            (117, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'MONY Life Insurance Company', '2801 Highway 280 South', 'Birmingham', 'AL', '35223     '),
            (118, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'Principal Life Insurance Company', '711 High Street', 'Des Moines', 'IA', '50392     '),
            (130, datetime.date(2022, 11, 17), 202210, 202302, False, 'complete', 'tpa_aso', 'TML MultiState Intergovernmental Employee Benefits Pool', '1821 Rutherford Lane, Suite 300', 'Austin', 'TX', '78754     '),
            (79, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'carrier', 'Wellfleet Insurance Company', '5814 Reed Road', 'Fort Wayne', 'IN', '46835     '),
            (80, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'carrier', 'Health Care Service Corporation', '300 East Randolph', 'Chicago', 'IL', '60601     '),
            (81, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'carrier', 'Humana', '500 West Main Street', 'Louisville', 'KY', '40202     '),
            (82, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'tpa_aso', 'Optum Behavioral Health Solutions', '6300 Olsen Memorial Highway', 'Minneapolis', 'MN', '55427     '),
            (124, datetime.date(2022, 11, 17), 202210, 202302, False, 'processing', 'tpa_aso', 'Devoted Health Services Inc.', '221 Crescent Street, Suite 202', 'Waltham', 'MA', '02435     '),
            (111, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'tpa_aso', 'EBIX Health Administration Exchange', '1 EBIX Way', 'Johns Creek', 'GA', '30097     '),
            (2, datetime.date(2022, 8, 3), 202210, 202302, True, 'complete', 'tpa_aso', 'TEST Meritan Health Inc', '300 Corporate Parkway', 'Amherst', 'NY', '14226     '),
            (3, datetime.date(2022, 8, 3), 202210, 202302, True, 'complete', 'carrier', 'TEST Friday Health Insurance Company, Inc', '700 Main Street', 'Alamosa', 'CO', '81101     '),
            (84, datetime.date(2022, 10, 29), 202210, 202302, True, 'processing', 'carrier', 'Reserve National Insurance Company', '601 E. Britton Road', 'Oklahoma City', 'OK', '73114     '),
            (191, datetime.date(2023, 2, 22), 202210, 202302, True, 'complete', 'carrier', 'UTHealth Houston-TEST', '7000 Fannin', 'Houston', 'TX', '77030     '),
            (203, datetime.date(2023, 3, 7), 202210, 202302, True, 'received', 'carrier', 'Garretts Test Business 3-7-23', 'test mailing address', 'Niagara Falls', 'MO', '50210     '),
            (173, datetime.date(2023, 2, 8), 202210, 202302, True, 'received', 'carrier', 'Garrett test business one million', 'Test ADDRESS Address that Tests Addresses ', 'Austin', 'AR', '50210     '),
            (76, datetime.date(2022, 10, 24), 202210, 202302, True, 'complete', 'carrier', 'GlobalHealth of Texas, Inc.', '210 Park Avenue, Suite 2800', 'Oklahoma City', 'OK', '73102     '),
            (77, datetime.date(2022, 10, 24), 202210, 202302, True, 'complete', 'carrier', 'Golden Rule Insurance Company', '7440 Woodland Drive', 'Indianapolis', 'IN', '46278     '),
            (78, datetime.date(2022, 10, 24), 202210, 202302, True, 'complete', 'carrier', 'Molina Healthcare of Texas', '1660 Westridge Circle North', 'Irving', 'TX', '75038     '),
            (86, datetime.date(2022, 11, 1), 202210, 202302, False, 'complete', 'pbm', 'CVS-PBM Part 1', '151 Farmington Avenue, RC61', 'Hartford', 'CT', '06156     '),
            (87, datetime.date(2022, 11, 1), 202210, 202302, False, 'complete', 'pbm', 'CVS-PBM Part 2', '151 Farmington Avenue, RC61', 'Hartford', 'CT', '06156     '),
            (88, datetime.date(2022, 11, 1), 202210, 202302, False, 'complete', 'pbm', 'CVS-PBM Part 3', '151 Farmington Avenue, RC61', 'Hartford', 'CT', '06156     '),
            (104, datetime.date(2022, 11, 10), 202210, 202302, True, 'complete', 'carrier', 'Cigna Health and Life Insurance Company', '900 Cottage Grove Road', 'Bloomfield', 'CT', '06002     '),
            (105, datetime.date(2022, 11, 10), 202210, 202302, False, 'processing', 'carrier', 'Baylor Scott and White Health Plan', '1206 West Campus Drive', 'Temple', 'TX', '76502     '),
            (106, datetime.date(2022, 11, 10), 202210, 202302, True, 'complete', 'carrier', 'Sendero Health Plans', '2028 E. Ben White Boulevard, Suite 400', 'Austin', 'TX', '78741     '),
            (107, datetime.date(2022, 11, 10), 202210, 202302, False, 'processing', 'carrier', 'Crum & Forster', '5 Christopher Way, 2nd Floor', 'Eatontown', 'NJ', '07724     '),
            (108, datetime.date(2022, 11, 10), 202210, 202302, True, 'complete', 'carrier', 'Integon National Insurance Company', '1515 North Rivercenter Drive, Suite 135', 'Milwaukee', 'WI', '53212     '),
            (110, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'tpa_aso', 'OptumHealth Care Solutions, Inc.', '11000 Optum Circle', 'Eden Prairie', 'MN', '55344     '),
            (112, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'National Health Insurance Company', '1515 North Rivercenter Drive, Suite 135', 'Milwaukee', 'WI', '53212     '),
            (114, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'Sun Life Assurance Company of Canada', '2323 Grand Boulevard', 'Kansas City', 'MO', '64108     '),
            (115, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'The Prudential Insurance Company of America', '751 Broad Street, 5th Floor', 'Newark', 'NJ', '07102     '),
            (116, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'UnitedHealthcare Medicare & Retirement', 'PO Box 9472', 'Minneapolis', 'MN', '55440     '),
            (117, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'MONY Life Insurance Company', '2801 Highway 280 South', 'Birmingham', 'AL', '35223     '),
            (118, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'Principal Life Insurance Company', '711 High Street', 'Des Moines', 'IA', '50392     '),
            (130, datetime.date(2022, 11, 17), 202210, 202302, False, 'complete', 'tpa_aso', 'TML MultiState Intergovernmental Employee Benefits Pool', '1821 Rutherford Lane, Suite 300', 'Austin', 'TX', '78754     '),
            (79, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'carrier', 'Wellfleet Insurance Company', '5814 Reed Road', 'Fort Wayne', 'IN', '46835     '),
            (80, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'carrier', 'Health Care Service Corporation', '300 East Randolph', 'Chicago', 'IL', '60601     '),
            (81, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'carrier', 'Humana', '500 West Main Street', 'Louisville', 'KY', '40202     '),
            (82, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'tpa_aso', 'Optum Behavioral Health Solutions', '6300 Olsen Memorial Highway', 'Minneapolis', 'MN', '55427     '),
            (124, datetime.date(2022, 11, 17), 202210, 202302, False, 'processing', 'tpa_aso', 'Devoted Health Services Inc.', '221 Crescent Street, Suite 202', 'Waltham', 'MA', '02435     '),
            (111, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'tpa_aso', 'EBIX Health Administration Exchange', '1 EBIX Way', 'Johns Creek', 'GA', '30097     '),
            (2, datetime.date(2022, 8, 3), 202210, 202302, True, 'complete', 'tpa_aso', 'TEST Meritan Health Inc', '300 Corporate Parkway', 'Amherst', 'NY', '14226     '),
            (3, datetime.date(2022, 8, 3), 202210, 202302, True, 'complete', 'carrier', 'TEST Friday Health Insurance Company, Inc', '700 Main Street', 'Alamosa', 'CO', '81101     '),
            (84, datetime.date(2022, 10, 29), 202210, 202302, True, 'processing', 'carrier', 'Reserve National Insurance Company', '601 E. Britton Road', 'Oklahoma City', 'OK', '73114     '),
            (191, datetime.date(2023, 2, 22), 202210, 202302, True, 'complete', 'carrier', 'UTHealth Houston-TEST', '7000 Fannin', 'Houston', 'TX', '77030     '),
            (203, datetime.date(2023, 3, 7), 202210, 202302, True, 'received', 'carrier', 'Garretts Test Business 3-7-23', 'test mailing address', 'Niagara Falls', 'MO', '50210     '),
            (173, datetime.date(2023, 2, 8), 202210, 202302, True, 'received', 'carrier', 'Garrett test business one million', 'Test ADDRESS Address that Tests Addresses ', 'Austin', 'AR', '50210     '),
            (76, datetime.date(2022, 10, 24), 202210, 202302, True, 'complete', 'carrier', 'GlobalHealth of Texas, Inc.', '210 Park Avenue, Suite 2800', 'Oklahoma City', 'OK', '73102     '),
            (77, datetime.date(2022, 10, 24), 202210, 202302, True, 'complete', 'carrier', 'Golden Rule Insurance Company', '7440 Woodland Drive', 'Indianapolis', 'IN', '46278     '),
            (78, datetime.date(2022, 10, 24), 202210, 202302, True, 'complete', 'carrier', 'Molina Healthcare of Texas', '1660 Westridge Circle North', 'Irving', 'TX', '75038     '),
            (86, datetime.date(2022, 11, 1), 202210, 202302, False, 'complete', 'pbm', 'CVS-PBM Part 1', '151 Farmington Avenue, RC61', 'Hartford', 'CT', '06156     '),
            (87, datetime.date(2022, 11, 1), 202210, 202302, False, 'complete', 'pbm', 'CVS-PBM Part 2', '151 Farmington Avenue, RC61', 'Hartford', 'CT', '06156     '),
            (88, datetime.date(2022, 11, 1), 202210, 202302, False, 'complete', 'pbm', 'CVS-PBM Part 3', '151 Farmington Avenue, RC61', 'Hartford', 'CT', '06156     '),
            (104, datetime.date(2022, 11, 10), 202210, 202302, True, 'complete', 'carrier', 'Cigna Health and Life Insurance Company', '900 Cottage Grove Road', 'Bloomfield', 'CT', '06002     '),
            (105, datetime.date(2022, 11, 10), 202210, 202302, False, 'processing', 'carrier', 'Baylor Scott and White Health Plan', '1206 West Campus Drive', 'Temple', 'TX', '76502     '),
            (106, datetime.date(2022, 11, 10), 202210, 202302, True, 'complete', 'carrier', 'Sendero Health Plans', '2028 E. Ben White Boulevard, Suite 400', 'Austin', 'TX', '78741     '),
            (107, datetime.date(2022, 11, 10), 202210, 202302, False, 'processing', 'carrier', 'Crum & Forster', '5 Christopher Way, 2nd Floor', 'Eatontown', 'NJ', '07724     '),
            (108, datetime.date(2022, 11, 10), 202210, 202302, True, 'complete', 'carrier', 'Integon National Insurance Company', '1515 North Rivercenter Drive, Suite 135', 'Milwaukee', 'WI', '53212     '),
            (110, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'tpa_aso', 'OptumHealth Care Solutions, Inc.', '11000 Optum Circle', 'Eden Prairie', 'MN', '55344     '),
            (112, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'National Health Insurance Company', '1515 North Rivercenter Drive, Suite 135', 'Milwaukee', 'WI', '53212     '),
            (114, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'Sun Life Assurance Company of Canada', '2323 Grand Boulevard', 'Kansas City', 'MO', '64108     '),
            (115, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'The Prudential Insurance Company of America', '751 Broad Street, 5th Floor', 'Newark', 'NJ', '07102     '),
            (116, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'UnitedHealthcare Medicare & Retirement', 'PO Box 9472', 'Minneapolis', 'MN', '55440     '),
            (117, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'MONY Life Insurance Company', '2801 Highway 280 South', 'Birmingham', 'AL', '35223     '),
            (118, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'Principal Life Insurance Company', '711 High Street', 'Des Moines', 'IA', '50392     '),
            (130, datetime.date(2022, 11, 17), 202210, 202302, False, 'complete', 'tpa_aso', 'TML MultiState Intergovernmental Employee Benefits Pool', '1821 Rutherford Lane, Suite 300', 'Austin', 'TX', '78754     '),
            (79, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'carrier', 'Wellfleet Insurance Company', '5814 Reed Road', 'Fort Wayne', 'IN', '46835     '),
            (80, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'carrier', 'Health Care Service Corporation', '300 East Randolph', 'Chicago', 'IL', '60601     '),
            (81, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'carrier', 'Humana', '500 West Main Street', 'Louisville', 'KY', '40202     '),
            (82, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'tpa_aso', 'Optum Behavioral Health Solutions', '6300 Olsen Memorial Highway', 'Minneapolis', 'MN', '55427     '),
            (124, datetime.date(2022, 11, 17), 202210, 202302, False, 'processing', 'tpa_aso', 'Devoted Health Services Inc.', '221 Crescent Street, Suite 202', 'Waltham', 'MA', '02435     '),
            (111, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'tpa_aso', 'EBIX Health Administration Exchange', '1 EBIX Way', 'Johns Creek', 'GA', '30097     '),
            (2, datetime.date(2022, 8, 3), 202210, 202302, True, 'complete', 'tpa_aso', 'TEST Meritan Health Inc', '300 Corporate Parkway', 'Amherst', 'NY', '14226     '),
            (3, datetime.date(2022, 8, 3), 202210, 202302, True, 'complete', 'carrier', 'TEST Friday Health Insurance Company, Inc', '700 Main Street', 'Alamosa', 'CO', '81101     '),
            (84, datetime.date(2022, 10, 29), 202210, 202302, True, 'processing', 'carrier', 'Reserve National Insurance Company', '601 E. Britton Road', 'Oklahoma City', 'OK', '73114     '),
            (191, datetime.date(2023, 2, 22), 202210, 202302, True, 'complete', 'carrier', 'UTHealth Houston-TEST', '7000 Fannin', 'Houston', 'TX', '77030     '),
            (203, datetime.date(2023, 3, 7), 202210, 202302, True, 'received', 'carrier', 'Garretts Test Business 3-7-23', 'test mailing address', 'Niagara Falls', 'MO', '50210     '),
            (173, datetime.date(2023, 2, 8), 202210, 202302, True, 'received', 'carrier', 'Garrett test business one million', 'Test ADDRESS Address that Tests Addresses ', 'Austin', 'AR', '50210     '),
            (76, datetime.date(2022, 10, 24), 202210, 202302, True, 'complete', 'carrier', 'GlobalHealth of Texas, Inc.', '210 Park Avenue, Suite 2800', 'Oklahoma City', 'OK', '73102     '),
            (77, datetime.date(2022, 10, 24), 202210, 202302, True, 'complete', 'carrier', 'Golden Rule Insurance Company', '7440 Woodland Drive', 'Indianapolis', 'IN', '46278     '),
            (78, datetime.date(2022, 10, 24), 202210, 202302, True, 'complete', 'carrier', 'Molina Healthcare of Texas', '1660 Westridge Circle North', 'Irving', 'TX', '75038     '),
            (86, datetime.date(2022, 11, 1), 202210, 202302, False, 'complete', 'pbm', 'CVS-PBM Part 1', '151 Farmington Avenue, RC61', 'Hartford', 'CT', '06156     '),
            (87, datetime.date(2022, 11, 1), 202210, 202302, False, 'complete', 'pbm', 'CVS-PBM Part 2', '151 Farmington Avenue, RC61', 'Hartford', 'CT', '06156     '),
            (88, datetime.date(2022, 11, 1), 202210, 202302, False, 'complete', 'pbm', 'CVS-PBM Part 3', '151 Farmington Avenue, RC61', 'Hartford', 'CT', '06156     '),
            (104, datetime.date(2022, 11, 10), 202210, 202302, True, 'complete', 'carrier', 'Cigna Health and Life Insurance Company', '900 Cottage Grove Road', 'Bloomfield', 'CT', '06002     '),
            (105, datetime.date(2022, 11, 10), 202210, 202302, False, 'processing', 'carrier', 'Baylor Scott and White Health Plan', '1206 West Campus Drive', 'Temple', 'TX', '76502     '),
            (106, datetime.date(2022, 11, 10), 202210, 202302, True, 'complete', 'carrier', 'Sendero Health Plans', '2028 E. Ben White Boulevard, Suite 400', 'Austin', 'TX', '78741     '),
            (107, datetime.date(2022, 11, 10), 202210, 202302, False, 'processing', 'carrier', 'Crum & Forster', '5 Christopher Way, 2nd Floor', 'Eatontown', 'NJ', '07724     '),
            (108, datetime.date(2022, 11, 10), 202210, 202302, True, 'complete', 'carrier', 'Integon National Insurance Company', '1515 North Rivercenter Drive, Suite 135', 'Milwaukee', 'WI', '53212     '),
            (110, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'tpa_aso', 'OptumHealth Care Solutions, Inc.', '11000 Optum Circle', 'Eden Prairie', 'MN', '55344     '),
            (112, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'National Health Insurance Company', '1515 North Rivercenter Drive, Suite 135', 'Milwaukee', 'WI', '53212     '),
            (114, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'Sun Life Assurance Company of Canada', '2323 Grand Boulevard', 'Kansas City', 'MO', '64108     '),
            (115, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'The Prudential Insurance Company of America', '751 Broad Street, 5th Floor', 'Newark', 'NJ', '07102     '),
            (116, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'UnitedHealthcare Medicare & Retirement', 'PO Box 9472', 'Minneapolis', 'MN', '55440     '),
            (117, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'MONY Life Insurance Company', '2801 Highway 280 South', 'Birmingham', 'AL', '35223     '),
            (118, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'Principal Life Insurance Company', '711 High Street', 'Des Moines', 'IA', '50392     '),
            (130, datetime.date(2022, 11, 17), 202210, 202302, False, 'complete', 'tpa_aso', 'TML MultiState Intergovernmental Employee Benefits Pool', '1821 Rutherford Lane, Suite 300', 'Austin', 'TX', '78754     '),
            (79, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'carrier', 'Wellfleet Insurance Company', '5814 Reed Road', 'Fort Wayne', 'IN', '46835     '),
            (80, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'carrier', 'Health Care Service Corporation', '300 East Randolph', 'Chicago', 'IL', '60601     '),
            (81, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'carrier', 'Humana', '500 West Main Street', 'Louisville', 'KY', '40202     '),
            (82, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'tpa_aso', 'Optum Behavioral Health Solutions', '6300 Olsen Memorial Highway', 'Minneapolis', 'MN', '55427     '),
            (124, datetime.date(2022, 11, 17), 202210, 202302, False, 'processing', 'tpa_aso', 'Devoted Health Services Inc.', '221 Crescent Street, Suite 202', 'Waltham', 'MA', '02435     '),
            (111, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'tpa_aso', 'EBIX Health Administration Exchange', '1 EBIX Way', 'Johns Creek', 'GA', '30097     '),
            (2, datetime.date(2022, 8, 3), 202210, 202302, True, 'complete', 'tpa_aso', 'TEST Meritan Health Inc', '300 Corporate Parkway', 'Amherst', 'NY', '14226     '),
            (3, datetime.date(2022, 8, 3), 202210, 202302, True, 'complete', 'carrier', 'TEST Friday Health Insurance Company, Inc', '700 Main Street', 'Alamosa', 'CO', '81101     '),
            (84, datetime.date(2022, 10, 29), 202210, 202302, True, 'processing', 'carrier', 'Reserve National Insurance Company', '601 E. Britton Road', 'Oklahoma City', 'OK', '73114     '),
            (191, datetime.date(2023, 2, 22), 202210, 202302, True, 'complete', 'carrier', 'UTHealth Houston-TEST', '7000 Fannin', 'Houston', 'TX', '77030     '),
            (203, datetime.date(2023, 3, 7), 202210, 202302, True, 'received', 'carrier', 'Garretts Test Business 3-7-23', 'test mailing address', 'Niagara Falls', 'MO', '50210     '),
            (173, datetime.date(2023, 2, 8), 202210, 202302, True, 'received', 'carrier', 'Garrett test business one million', 'Test ADDRESS Address that Tests Addresses ', 'Austin', 'AR', '50210     '),
            (76, datetime.date(2022, 10, 24), 202210, 202302, True, 'complete', 'carrier', 'GlobalHealth of Texas, Inc.', '210 Park Avenue, Suite 2800', 'Oklahoma City', 'OK', '73102     '),
            (77, datetime.date(2022, 10, 24), 202210, 202302, True, 'complete', 'carrier', 'Golden Rule Insurance Company', '7440 Woodland Drive', 'Indianapolis', 'IN', '46278     '),
            (78, datetime.date(2022, 10, 24), 202210, 202302, True, 'complete', 'carrier', 'Molina Healthcare of Texas', '1660 Westridge Circle North', 'Irving', 'TX', '75038     '),
            (86, datetime.date(2022, 11, 1), 202210, 202302, False, 'complete', 'pbm', 'CVS-PBM Part 1', '151 Farmington Avenue, RC61', 'Hartford', 'CT', '06156     '),
            (87, datetime.date(2022, 11, 1), 202210, 202302, False, 'complete', 'pbm', 'CVS-PBM Part 2', '151 Farmington Avenue, RC61', 'Hartford', 'CT', '06156     '),
            (88, datetime.date(2022, 11, 1), 202210, 202302, False, 'complete', 'pbm', 'CVS-PBM Part 3', '151 Farmington Avenue, RC61', 'Hartford', 'CT', '06156     '),
            (104, datetime.date(2022, 11, 10), 202210, 202302, True, 'complete', 'carrier', 'Cigna Health and Life Insurance Company', '900 Cottage Grove Road', 'Bloomfield', 'CT', '06002     '),
            (105, datetime.date(2022, 11, 10), 202210, 202302, False, 'processing', 'carrier', 'Baylor Scott and White Health Plan', '1206 West Campus Drive', 'Temple', 'TX', '76502     '),
            (106, datetime.date(2022, 11, 10), 202210, 202302, True, 'complete', 'carrier', 'Sendero Health Plans', '2028 E. Ben White Boulevard, Suite 400', 'Austin', 'TX', '78741     '),
            (107, datetime.date(2022, 11, 10), 202210, 202302, False, 'processing', 'carrier', 'Crum & Forster', '5 Christopher Way, 2nd Floor', 'Eatontown', 'NJ', '07724     '),
            (108, datetime.date(2022, 11, 10), 202210, 202302, True, 'complete', 'carrier', 'Integon National Insurance Company', '1515 North Rivercenter Drive, Suite 135', 'Milwaukee', 'WI', '53212     '),
            (110, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'tpa_aso', 'OptumHealth Care Solutions, Inc.', '11000 Optum Circle', 'Eden Prairie', 'MN', '55344     '),
            (112, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'National Health Insurance Company', '1515 North Rivercenter Drive, Suite 135', 'Milwaukee', 'WI', '53212     '),
            (114, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'Sun Life Assurance Company of Canada', '2323 Grand Boulevard', 'Kansas City', 'MO', '64108     '),
            (115, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'The Prudential Insurance Company of America', '751 Broad Street, 5th Floor', 'Newark', 'NJ', '07102     '),
            (116, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'UnitedHealthcare Medicare & Retirement', 'PO Box 9472', 'Minneapolis', 'MN', '55440     '),
            (117, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'MONY Life Insurance Company', '2801 Highway 280 South', 'Birmingham', 'AL', '35223     '),
            (118, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'Principal Life Insurance Company', '711 High Street', 'Des Moines', 'IA', '50392     '),
            (130, datetime.date(2022, 11, 17), 202210, 202302, False, 'complete', 'tpa_aso', 'TML MultiState Intergovernmental Employee Benefits Pool', '1821 Rutherford Lane, Suite 300', 'Austin', 'TX', '78754     '),
            (79, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'carrier', 'Wellfleet Insurance Company', '5814 Reed Road', 'Fort Wayne', 'IN', '46835     '),
            (80, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'carrier', 'Health Care Service Corporation', '300 East Randolph', 'Chicago', 'IL', '60601     '),
            (81, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'carrier', 'Humana', '500 West Main Street', 'Louisville', 'KY', '40202     '),
            (82, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'tpa_aso', 'Optum Behavioral Health Solutions', '6300 Olsen Memorial Highway', 'Minneapolis', 'MN', '55427     '),
            (124, datetime.date(2022, 11, 17), 202210, 202302, False, 'processing', 'tpa_aso', 'Devoted Health Services Inc.', '221 Crescent Street, Suite 202', 'Waltham', 'MA', '02435     '),
            (111, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'tpa_aso', 'EBIX Health Administration Exchange', '1 EBIX Way', 'Johns Creek', 'GA', '30097     '),
            (2, datetime.date(2022, 8, 3), 202210, 202302, True, 'complete', 'tpa_aso', 'TEST Meritan Health Inc', '300 Corporate Parkway', 'Amherst', 'NY', '14226     '),
            (3, datetime.date(2022, 8, 3), 202210, 202302, True, 'complete', 'carrier', 'TEST Friday Health Insurance Company, Inc', '700 Main Street', 'Alamosa', 'CO', '81101     '),
            (84, datetime.date(2022, 10, 29), 202210, 202302, True, 'processing', 'carrier', 'Reserve National Insurance Company', '601 E. Britton Road', 'Oklahoma City', 'OK', '73114     '),
            (191, datetime.date(2023, 2, 22), 202210, 202302, True, 'complete', 'carrier', 'UTHealth Houston-TEST', '7000 Fannin', 'Houston', 'TX', '77030     '),
            (203, datetime.date(2023, 3, 7), 202210, 202302, True, 'received', 'carrier', 'Garretts Test Business 3-7-23', 'test mailing address', 'Niagara Falls', 'MO', '50210     '),
            (173, datetime.date(2023, 2, 8), 202210, 202302, True, 'received', 'carrier', 'Garrett test business one million', 'Test ADDRESS Address that Tests Addresses ', 'Austin', 'AR', '50210     '),
            (76, datetime.date(2022, 10, 24), 202210, 202302, True, 'complete', 'carrier', 'GlobalHealth of Texas, Inc.', '210 Park Avenue, Suite 2800', 'Oklahoma City', 'OK', '73102     '),
            (77, datetime.date(2022, 10, 24), 202210, 202302, True, 'complete', 'carrier', 'Golden Rule Insurance Company', '7440 Woodland Drive', 'Indianapolis', 'IN', '46278     '),
            (78, datetime.date(2022, 10, 24), 202210, 202302, True, 'complete', 'carrier', 'Molina Healthcare of Texas', '1660 Westridge Circle North', 'Irving', 'TX', '75038     '),
            (86, datetime.date(2022, 11, 1), 202210, 202302, False, 'complete', 'pbm', 'CVS-PBM Part 1', '151 Farmington Avenue, RC61', 'Hartford', 'CT', '06156     '),
            (87, datetime.date(2022, 11, 1), 202210, 202302, False, 'complete', 'pbm', 'CVS-PBM Part 2', '151 Farmington Avenue, RC61', 'Hartford', 'CT', '06156     '),
            (88, datetime.date(2022, 11, 1), 202210, 202302, False, 'complete', 'pbm', 'CVS-PBM Part 3', '151 Farmington Avenue, RC61', 'Hartford', 'CT', '06156     '),
            (104, datetime.date(2022, 11, 10), 202210, 202302, True, 'complete', 'carrier', 'Cigna Health and Life Insurance Company', '900 Cottage Grove Road', 'Bloomfield', 'CT', '06002     '),
            (105, datetime.date(2022, 11, 10), 202210, 202302, False, 'processing', 'carrier', 'Baylor Scott and White Health Plan', '1206 West Campus Drive', 'Temple', 'TX', '76502     '),
            (106, datetime.date(2022, 11, 10), 202210, 202302, True, 'complete', 'carrier', 'Sendero Health Plans', '2028 E. Ben White Boulevard, Suite 400', 'Austin', 'TX', '78741     '),
            (107, datetime.date(2022, 11, 10), 202210, 202302, False, 'processing', 'carrier', 'Crum & Forster', '5 Christopher Way, 2nd Floor', 'Eatontown', 'NJ', '07724     '),
            (108, datetime.date(2022, 11, 10), 202210, 202302, True, 'complete', 'carrier', 'Integon National Insurance Company', '1515 North Rivercenter Drive, Suite 135', 'Milwaukee', 'WI', '53212     '),
            (110, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'tpa_aso', 'OptumHealth Care Solutions, Inc.', '11000 Optum Circle', 'Eden Prairie', 'MN', '55344     '),
            (112, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'National Health Insurance Company', '1515 North Rivercenter Drive, Suite 135', 'Milwaukee', 'WI', '53212     '),
            (114, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'Sun Life Assurance Company of Canada', '2323 Grand Boulevard', 'Kansas City', 'MO', '64108     '),
            (115, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'The Prudential Insurance Company of America', '751 Broad Street, 5th Floor', 'Newark', 'NJ', '07102     '),
            (116, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'UnitedHealthcare Medicare & Retirement', 'PO Box 9472', 'Minneapolis', 'MN', '55440     '),
            (117, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'MONY Life Insurance Company', '2801 Highway 280 South', 'Birmingham', 'AL', '35223     '),
            (118, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'Principal Life Insurance Company', '711 High Street', 'Des Moines', 'IA', '50392     '),
            (130, datetime.date(2022, 11, 17), 202210, 202302, False, 'complete', 'tpa_aso', 'TML MultiState Intergovernmental Employee Benefits Pool', '1821 Rutherford Lane, Suite 300', 'Austin', 'TX', '78754     '),
            (79, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'carrier', 'Wellfleet Insurance Company', '5814 Reed Road', 'Fort Wayne', 'IN', '46835     '),
            (80, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'carrier', 'Health Care Service Corporation', '300 East Randolph', 'Chicago', 'IL', '60601     '),
            (81, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'carrier', 'Humana', '500 West Main Street', 'Louisville', 'KY', '40202     '),
            (82, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'tpa_aso', 'Optum Behavioral Health Solutions', '6300 Olsen Memorial Highway', 'Minneapolis', 'MN', '55427     '),
            (124, datetime.date(2022, 11, 17), 202210, 202302, False, 'processing', 'tpa_aso', 'Devoted Health Services Inc.', '221 Crescent Street, Suite 202', 'Waltham', 'MA', '02435     '),
            (111, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'tpa_aso', 'EBIX Health Administration Exchange', '1 EBIX Way', 'Johns Creek', 'GA', '30097     '),
            (2, datetime.date(2022, 8, 3), 202210, 202302, True, 'complete', 'tpa_aso', 'TEST Meritan Health Inc', '300 Corporate Parkway', 'Amherst', 'NY', '14226     '),
            (3, datetime.date(2022, 8, 3), 202210, 202302, True, 'complete', 'carrier', 'TEST Friday Health Insurance Company, Inc', '700 Main Street', 'Alamosa', 'CO', '81101     '),
            (84, datetime.date(2022, 10, 29), 202210, 202302, True, 'processing', 'carrier', 'Reserve National Insurance Company', '601 E. Britton Road', 'Oklahoma City', 'OK', '73114     '),
            (191, datetime.date(2023, 2, 22), 202210, 202302, True, 'complete', 'carrier', 'UTHealth Houston-TEST', '7000 Fannin', 'Houston', 'TX', '77030     '),
            (203, datetime.date(2023, 3, 7), 202210, 202302, True, 'received', 'carrier', 'Garretts Test Business 3-7-23', 'test mailing address', 'Niagara Falls', 'MO', '50210     '),
            (173, datetime.date(2023, 2, 8), 202210, 202302, True, 'received', 'carrier', 'Garrett test business one million', 'Test ADDRESS Address that Tests Addresses ', 'Austin', 'AR', '50210     '),
            (76, datetime.date(2022, 10, 24), 202210, 202302, True, 'complete', 'carrier', 'GlobalHealth of Texas, Inc.', '210 Park Avenue, Suite 2800', 'Oklahoma City', 'OK', '73102     '),
            (77, datetime.date(2022, 10, 24), 202210, 202302, True, 'complete', 'carrier', 'Golden Rule Insurance Company', '7440 Woodland Drive', 'Indianapolis', 'IN', '46278     '),
            (78, datetime.date(2022, 10, 24), 202210, 202302, True, 'complete', 'carrier', 'Molina Healthcare of Texas', '1660 Westridge Circle North', 'Irving', 'TX', '75038     '),
            (86, datetime.date(2022, 11, 1), 202210, 202302, False, 'complete', 'pbm', 'CVS-PBM Part 1', '151 Farmington Avenue, RC61', 'Hartford', 'CT', '06156     '),
            (87, datetime.date(2022, 11, 1), 202210, 202302, False, 'complete', 'pbm', 'CVS-PBM Part 2', '151 Farmington Avenue, RC61', 'Hartford', 'CT', '06156     '),
            (88, datetime.date(2022, 11, 1), 202210, 202302, False, 'complete', 'pbm', 'CVS-PBM Part 3', '151 Farmington Avenue, RC61', 'Hartford', 'CT', '06156     '),
            (104, datetime.date(2022, 11, 10), 202210, 202302, True, 'complete', 'carrier', 'Cigna Health and Life Insurance Company', '900 Cottage Grove Road', 'Bloomfield', 'CT', '06002     '),
            (105, datetime.date(2022, 11, 10), 202210, 202302, False, 'processing', 'carrier', 'Baylor Scott and White Health Plan', '1206 West Campus Drive', 'Temple', 'TX', '76502     '),
            (106, datetime.date(2022, 11, 10), 202210, 202302, True, 'complete', 'carrier', 'Sendero Health Plans', '2028 E. Ben White Boulevard, Suite 400', 'Austin', 'TX', '78741     '),
            (107, datetime.date(2022, 11, 10), 202210, 202302, False, 'processing', 'carrier', 'Crum & Forster', '5 Christopher Way, 2nd Floor', 'Eatontown', 'NJ', '07724     '),
            (108, datetime.date(2022, 11, 10), 202210, 202302, True, 'complete', 'carrier', 'Integon National Insurance Company', '1515 North Rivercenter Drive, Suite 135', 'Milwaukee', 'WI', '53212     '),
            (110, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'tpa_aso', 'OptumHealth Care Solutions, Inc.', '11000 Optum Circle', 'Eden Prairie', 'MN', '55344     '),
            (112, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'National Health Insurance Company', '1515 North Rivercenter Drive, Suite 135', 'Milwaukee', 'WI', '53212     '),
            (114, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'Sun Life Assurance Company of Canada', '2323 Grand Boulevard', 'Kansas City', 'MO', '64108     '),
            (115, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'The Prudential Insurance Company of America', '751 Broad Street, 5th Floor', 'Newark', 'NJ', '07102     '),
            (116, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'UnitedHealthcare Medicare & Retirement', 'PO Box 9472', 'Minneapolis', 'MN', '55440     '),
            (117, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'MONY Life Insurance Company', '2801 Highway 280 South', 'Birmingham', 'AL', '35223     '),
            (118, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'carrier', 'Principal Life Insurance Company', '711 High Street', 'Des Moines', 'IA', '50392     '),
            (130, datetime.date(2022, 11, 17), 202210, 202302, False, 'complete', 'tpa_aso', 'TML MultiState Intergovernmental Employee Benefits Pool', '1821 Rutherford Lane, Suite 300', 'Austin', 'TX', '78754     '),
            (79, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'carrier', 'Wellfleet Insurance Company', '5814 Reed Road', 'Fort Wayne', 'IN', '46835     '),
            (80, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'carrier', 'Health Care Service Corporation', '300 East Randolph', 'Chicago', 'IL', '60601     '),
            (81, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'carrier', 'Humana', '500 West Main Street', 'Louisville', 'KY', '40202     '),
            (82, datetime.date(2022, 10, 25), 202210, 202302, True, 'complete', 'tpa_aso', 'Optum Behavioral Health Solutions', '6300 Olsen Memorial Highway', 'Minneapolis', 'MN', '55427     '),
            (124, datetime.date(2022, 11, 17), 202210, 202302, False, 'processing', 'tpa_aso', 'Devoted Health Services Inc.', '221 Crescent Street, Suite 202', 'Waltham', 'MA', '02435     '),
            (111, datetime.date(2022, 11, 11), 202210, 202302, True, 'complete', 'tpa_aso', 'EBIX Health Administration Exchange', '1 EBIX Way', 'Johns Creek', 'GA', '30097     '),
            (2, datetime.date(2022, 8, 3), 202210, 202302, True, 'complete', 'tpa_aso', 'TEST Meritan Health Inc', '300 Corporate Parkway', 'Amherst', 'NY', '14226     '),
            (3, datetime.date(2022, 8, 3), 202210, 202302, True, 'complete', 'carrier', 'TEST Friday Health Insurance Company, Inc', '700 Main Street', 'Alamosa', 'CO', '81101     '),
            (84, datetime.date(2022, 10, 29), 202210, 202302, True, 'processing', 'carrier', 'Reserve National Insurance Company', '601 E. Britton Road', 'Oklahoma City', 'OK', '73114     '),
            (191, datetime.date(2023, 2, 22), 202210, 202302, True, 'complete', 'carrier', 'UTHealth Houston-TEST', '7000 Fannin', 'Houston', 'TX', '77030     '),
            (203, datetime.date(2023, 3, 7), 202210, 202302, True, 'received', 'carrier', 'Garretts Test Business 3-7-23', 'test mailing address', 'Niagara Falls', 'MO', '50210     '),
            (173, datetime.date(2023, 2, 8), 202210, 202302, True, 'received', 'carrier', 'Garrett test business one million', 'Test ADDRESS Address that Tests Addresses ', 'Austin', 'AR', '50210     '),
        ]
        registrations_entities = [
            (
                5, 1, 5, 46, 11111, None, 5, 'Garretts Test Business 2', '11-0001111', True, True, True, True, False
            ),
            (
                5, 2, 50000, 47, 11010, 21101, 1, 'A Second Test Entity', '00-0000000', True, False, False, True, False
            )
        ]
        registrations_contacts = [
            (
                52,
                1,
                False,
                'Test Role',
                'Garrett Test Tester',
                '2222222222',
                'notarealemail@emailplace.com'
            ),
            (
                53,
                1,
                False,
                'A 2nd Test Role',
                'Test Garrett 2 Test',
                '15555555555',
                'testemail@testemail.net'
            ),
            (
                54,
                2,
                True,
                'A 3rd and final test role',
                'Test 3rd Role Name Garrett',
                '0000000000',
                'email@gmail.com'
            )
        ]

        context = self.get_context_data(registrations_content, registrations_entities, registrations_contacts, *args,**kwargs)
        template = loader.get_template(self.template_name)
        return HttpResponse(template.render(context, request))

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not is_apcd_admin(request.user):
            return HttpResponseRedirect('/')
        return super(RegistrationsTable, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, registrations_content, registrations_entities, registrations_contacts, *args, **kwargs):
        context = super(RegistrationsTable, self).get_context_data(*args, **kwargs)

        def _set_registration(reg, reg_ents, reg_conts):
            org_types = {
                    'carrier': 'Insurance Carrier',
                    'tpa_aso': 'Plan Administrator¹ (TPA/ASO)',
                    'pbm': 'Pharmacy Benefit Manager (PBM)'
            }
            return {
                    'biz_name': reg[7],
                    'type': org_types[reg[6]] if (reg[6] and reg[6] in org_types.keys()) else None,
                    'location': '{city}, {state}'.format
                        (
                            city=reg[9],
                            state=reg[10]
                        ),
                    'reg_status': reg[5].title(),
                    'reg_id': reg[0],
                    'view_modal_content': _set_modal_content(reg, reg_ents, reg_conts, org_types)
                }
        def _set_entities(reg_ent):
            return {
                'claim_val': reg_ent[0],
                'ent_id': reg_ent[3],
                'claim_and_enc_vol': reg_ent[2],
                'license': reg_ent[4] if reg_ent[4] else None,
                'naic': reg_ent[5] if reg_ent[5] else None,
                'no_covered': reg_ent[6],
                'ent_name': reg_ent[7],
                'fein': reg_ent[8] if reg_ent[8] else None,
                'files_type': {
                    "Eligibility/Enrollment": reg_ent[9],
                    "Provider": reg_ent[10],
                    "Medical": reg_ent[11],
                    "Pharmacy": reg_ent[12],
                    "Dental": reg_ent[13]
                }
            }
        def _set_contacts(reg_cont):

            def format_phone_number(num):
                formatted_num_list = list(reversed(num))
                last_four_digits = 3
                last_seven_digits = 7
                all_ten_digits = 11
                placement_corrector = 1 #To add formatting chars in correct places
                for curr_position in range(len(formatted_num_list) + 1):
                    placement_position = curr_position + placement_corrector
                    if curr_position == last_four_digits or curr_position == last_seven_digits:
                        formatted_num_list.insert(placement_position,'-')
                    if curr_position == all_ten_digits and len(num) > 10:
                        formatted_num_list.insert(placement_position,' ')
                        formatted_num_list.append('+')
                return ''.join(reversed(formatted_num_list))

            return {
                'cont_id': reg_cont[0],
                'notif': reg_cont[2],
                'role': reg_cont[3],
                'name': reg_cont[4],
                'phone': format_phone_number(reg_cont[5]),
                'email': reg_cont[6],
            }
        def _set_modal_content(reg, reg_ent, reg_cont, org_types):
            return {
                'biz_name': reg[7],
                'type': org_types[reg[6]] if (reg[6] and reg[6] in org_types.keys()) else None,
                'city': reg[9],
                'state': reg[10],
                'address': reg[8],
                'zip': reg[11],
                'for_self': reg[4],
                'entities': [_set_entities(ent) for ent in reg_ent],
                'contacts': [_set_contacts(cont) for cont in reg_cont],
                'org_types': org_types,
                'us_state_list': [
                    'AL - Alabama',
                    'AK - Alaska',
                    'AS - American Samoa',
                    'AR - Arkansas',
                    'AZ - Arizona',
                    'CA - California',
                    'CO - Colorado',
                    'CT - Connecticut',
                    'DE - Delaware',
                    'DC - District of Columbia',
                    'FL - Florida',
                    'GA - Georgia',
                    'GU - Guam',
                    'HI - Hawaii',
                    'ID - Idaho',
                    'IL - Illinois',
                    'IN - Indiana',
                    'IA - Iowa',
                    'KS - Kansas',
                    'KY - Kentucky',
                    'LA - Louisiana',
                    'ME - Maine',
                    'MD - Maryland',
                    'MA - Massachusetts',
                    'MI - Michigan',
                    'MN - Minnesota',
                    'MS - Mississippi',
                    'MO - Missouri',
                    'MT - Montana',
                    'NE - Nebraska',
                    'NH - New Hampshire',
                    'NJ - New Jersey',
                    'NM - New Mexico',
                    'NV - Nevada',
                    'NY - New York',
                    'NC - North Carolina',
                    'ND - North Dakota',
                    'MP - Northern Mariana Islands',
                    'OH - Ohio',
                    'OK - Oklahoma',
                    'OR - Oregon',
                    'PA - Pennsylvania',
                    'RI - Rhode Island',
                    'SC - South Carolina',
                    'SD - South Dakota',
                    'TN - Tennessee',
                    'TX - Texas',
                    'UT - Utah',
                    'VT - Vermont',
                    'VA - Virginia',
                    'VI - Virgin Islands',
                    'WA - Washington',
                    'WV - West Virginia',
                    'WI - Wisconsin',
                    'WY - Wyoming'
                ],
            }

        context['header'] = ['Business Name', 'Type', 'Location', 'Registration Status', 'Actions']
        context['status_options'] = ['All', 'Received', 'Processing', 'Complete']
        context['org_options'] = ['All']

        try:
            page_num = int(self.request.GET.get('page'))
        except:
            page_num = 1

        def getDate(row):
            date = row[1]
            return date if date is not None else parser.parse('1-1-0001')  # put 'None' date entries all together at end of listing

        registrations_content = sorted(registrations_content, key=lambda row:getDate(row), reverse=True)  # sort registrations by newest to oldest

        registration_table_entries = []
        for registration in registrations_content:
            associated_entities = [ent for ent in registrations_entities if ent[1] == registration[0]]
            associated_contacts = [cont for cont in registrations_contacts if cont[1] == registration[0]]
            registration_table_entries.append(_set_registration(registration, associated_entities, associated_contacts))
            org_name = registration[7]
            if org_name not in context['org_options']:
                context['org_options'].append(org_name)

        status_filter = self.request.GET.get('status')
        org_filter = self.request.GET.get('org')

        context['selected_status'] = None
        if status_filter is not None and status_filter != 'All':
            context['selected_status'] = status_filter
            registration_table_entries = table_filter(status_filter, registration_table_entries, 'reg_status')

        context['selected_org'] = None
        if org_filter is not None and org_filter != 'All':
            context['selected_org'] = org_filter
            registration_table_entries = table_filter(org_filter.replace("(", "").replace(")",""), registration_table_entries, 'biz_name')

        queryStr = '?'
        if len(self.request.META['QUERY_STRING']) > 0:
            queryStr = queryStr + self.request.META['QUERY_STRING'].replace(f'page={page_num}', '') + ('&' if self.request.GET.get('page') is None else '')
        context['query_str'] = queryStr
        context.update(paginator(self.request, registration_table_entries))
        context['pagination_url_namespaces'] = 'administration:admin_regis_table'
        return context
