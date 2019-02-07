import { filter, some } from "lodash";

import createReduceFilter from "./utilities/createReduceFilter"

import getObjectByUid from "./utilities/getObjectByUid";
import contactBooks from "../../data/contact_books";
import people from "../../data/people";
import organizations from "../../data/organizations";

const getOrganizationByUid = uid => getObjectByUid(organizations, uid);
const getContactBookByUid = uid => getObjectByUid(contactBooks, uid);

const personalNameFilters = {
  firstName: (people, firstName) => filter(people, person =>
    person.firstName == firstName
  ),

  lastName: (people, lastName) => filter(people, person =>
    person.lastName == lastName
  ),
}

const memorableDateFilters = {
  date: (people, date) => filter(people, person =>
    person.birthday == date
  ),

  type: (people, type) => filter(people, person => {
    switch(type) {
      case "BIRTHDAY":
        return !!person.birthday;
      default:
        return false;
    }
  })
};

const personalInformationFilters = {
  name: (people, input) => createReduceFilter(
    personalNameFilters,
    people,
    input,
  ),

  gender: (people, gender) => filter(people, person => person.gender == gender),

  memorableDate: (people, memorableDate) => createReduceFilter(
    memorableDateFilters,
    people,
    memorableDate
  )
};

const organizationNameFilters = {
  startsWith: (people, startsWith) => filter(people, person =>
    some(person.affiliations, affiliation => {
      let organization = getOrganizationByUid(affiliation.organizationId);
      return organization.name.startsWith(startsWith);
    })
  ),

  endsWith: (people, endsWith) => filter(people, person =>
    some(person.affiliations, affiliation => {
      let organization = getOrganizationByUid(affiliation.organizationId);
      return organization.name.endsWith(endsWith);
    })
  ),

  includes: (people, includes) => filter(people, person =>
    some(person.affiliations, affiliation => {
      let organization = getOrganizationByUid(affiliation.organizationId);
      return organization.name.includes(includes);
    })
  ),

  equals: (people, name) => filter(people, person =>
    some(person.affiliations, affiliation => {
      let organization = getOrganizationByUid(affiliation.organizationId);
      return organization.name == name;
    })
  )
};

const affiliationFilters = {
  organizationName: (people, organizationName) => createReduceFilter(
    organizationNameFilters,
    people,
    organizationName,
  )
};

const filters = {
  contactBook: (people, contactBook) => filter(people, person => {
    let book = getContactBookByUid(person.contactBookId);
    return book.name == contactBook.name;
  }),

  personalInformation: (people, input) => createReduceFilter(
    personalInformationFilters,
    people,
    input,
  ),

  affiliation: (people, input) => createReduceFilter(
    affiliationFilters,
    people,
    input,
  )
};

export default {
  allContactBooks: () => contactBooks,
  allPeople: () => people,
  findPeople: (_, input) => createReduceFilter(
    filters,
    people,
    input,
  )
};