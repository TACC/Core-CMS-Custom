def _get_orgtypes():
    return {
        'carrier': 'Insurance Carrier',
        'tpa_aso': 'Plan Administrator¹ (TPA/ASO)',
        'pbm': 'Pharmacy Benefit Manager (PBM)',
    }


def _set_registration_for_listing(reg):
    org_types = _get_orgtypes()
    return {
        'biz_name': reg[5],
        'type': org_types[reg[4]] if (reg[4] and reg[4] in org_types.keys()) else None,
        'location': '{city}, {state}'.format(city=reg[7], state=reg[8]),
        'reg_status': reg[3].title() if reg[3] else None,
        'reg_id': reg[0],
        'year': reg[10],
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
        'plans_type': {
            "Commercial": reg_ent[9],
            "Medicare": reg_ent[10],
            "Medicaid": reg_ent[11],
        },
        'files_type': {
            "Eligibility/Enrollment": reg_ent[12],
            "Provider": reg_ent[13],
            "Medical": reg_ent[14],
            "Pharmacy": reg_ent[15],
            "Dental": reg_ent[16]
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
        'phone': format_phone_number(reg_cont[5]) if reg_cont[5] else None,
        'email': reg_cont[6],
    }


def _set_registration(reg, reg_ent, reg_cont):
    org_types = _get_orgtypes()
    return {
        'reg_id': reg[0],
        'biz_name': reg[5],
        'type': org_types[reg[4]] if (reg[4] and reg[4] in org_types.keys()) else None,
        'city': reg[7],
        'state': reg[8],
        'address': reg[6],
        'zip': reg[9].strip(),
        'for_self': reg[2],
        'year': reg[10],
        'status': reg[3].title() if reg[3] else None,
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
