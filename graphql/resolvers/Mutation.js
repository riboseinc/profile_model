import { find, reduce, reject } from "lodash";
import fs from "fs";
import uuidv4 from "uuid/v4";
import { UserInputError } from 'apollo-server-express';

import getObjectByUid from "./utilities/getObjectByUid";
import contactBooks from "../../data/contact_books";
import people from "../../data/people";

const getPersonByUid = uid => getObjectByUid(people, uid);
const getContactBookByUid = uid => getObjectByUid(contactBooks, uid);
const savePeople = people => {
  fs.writeFile("data/people.json", JSON.stringify(people, null, 2), err => {
    if(err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
};

const personBuilder = {
  uid: () => uuidv4(),
  contactBookId: input => input.contactBookId,
  firstName: input => input.person.personalInformation.name.firstName,
  lastName: input => input.person.personalInformation.name.lastName,
  gender: input => input.person.personalInformation.gender,
  birthday: input => find(
    input.person.personalInformation.memorableDates,
    memorableDate => memorableDate.type == "BIRTHDAY"
  ).date.format("YYYY-MM-DD")
};

const buildObject = (builder, input) => reduce(
  Object.keys(builder),
  (obj, key) => {
    try {
      let val = builder[key](input);

      if (val !== null) {
        obj[key] = val;
      }
    } catch(_) {}

    return obj;
  },
  {}
);

export default {
  addPerson(_, input) {
    if (!getContactBookByUid(input.contactBookId)) {
      throw new UserInputError("Contact book does not exist!");
    }

    let person = buildObject(personBuilder, input);

    savePeople(people.concat([person]));

    return person;
  },

  removePerson(_, input) {
    if (!getPersonByUid(input.personId)) {
      throw new UserInputError("Person does not exist!");
    }

    savePeople(reject(people, person => person.uid == input.personId));

    return input.personId;
  }
};