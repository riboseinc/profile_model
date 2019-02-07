import { find } from "lodash";

const getObjectByUid = (collection, uid) => find(collection, obj => obj.uid == uid);

export default getObjectByUid;