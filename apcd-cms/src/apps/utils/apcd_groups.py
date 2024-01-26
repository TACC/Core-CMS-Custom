def has_apcd_group(user):
    for group in user.groups.all():
        if group.name in ['APCD_ADMIN', 'SUBMITTER_ADMIN', 'SUBMITTER_USER']:
            return True
    return False

def is_apcd_admin(user):
    return user.groups.filter(name='APCD_ADMIN').exists()

def has_groups(user, groups):
    return len([user_group for user_group in user.groups.all() if user_group.name in groups]) > 0  # if user has permission group(s) in requested list, this 
                                                                                              # intersection's length should be non-zero