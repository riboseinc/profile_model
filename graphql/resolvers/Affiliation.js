import organizations from "../../data/organizations";

import { find } from "lodash";

const getOrganizationByUid = uid => find(organizations, organization => organization.uid == uid);

export default {
  organizations: obj => {
    let organization = getOrganizationByUid(obj.organizationId)

    return organization ? [organization] : [];
  },

  affiliationRoles: obj => obj.roles,
};