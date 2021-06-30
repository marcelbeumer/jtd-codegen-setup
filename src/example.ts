import { isLoginOpts, LoginOpts } from "./schema/login_opts";
import { isLoginResult } from "./schema/login_result";
import { isIndividual, isPerson, Person } from "./schema/person";

const loginOpts: LoginOpts = {
  user: "",
  pass: "",
};

const person: Person = {
  firstName: "John",
  lastName: "Doe",
  mother: {
    firstName: "Katy",
    lastName: "Round",
  },
  father: {
    firstName: "Pete",
    lastName: "Doe",
  },
};

const maybeBePerson = { ...person };
const invalidPerson = { ...person, father: { ...person.father, firstName: 0 } };

if (isPerson(maybeBePerson)) {
  console.log("ok1", !!maybeBePerson);
}

if (isIndividual(person.mother)) {
  console.log("ok2", !!person.mother);
}

if (!isPerson(invalidPerson)) {
  console.log("ok3", !!invalidPerson);
}

if (isLoginOpts(loginOpts)) {
  console.log("ok4", !!loginOpts);
}

if (!isLoginResult({})) {
  console.log("ok5", true);
}
