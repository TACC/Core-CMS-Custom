def has_apcd_group(user):
    for group in user.groups.all():
        if group.name in ['APCD_ADMIN', 'SUBMITTER_ADMIN', 'SUBMITTER_USER']:
            return True
    return False

def is_apcd_admin(user):
    return user.groups.filter(name='APCD_ADMIN').exists()