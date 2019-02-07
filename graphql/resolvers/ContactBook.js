import { filter } from "lodash";

export default {
  collection: book => filter(people, person => person.contactBookId == book.uid)
};