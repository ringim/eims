import { faker } from "@faker-js/faker";
import { sample } from "lodash";

// ----------------------------------------------------------------------

const users = [...Array(2)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: "C19RM/RSSH COMMU...",
  started: "23 Jan 2023, 19:30",
  submitted: "23 Jan 2023, 19:30",
  status: sample(["Approved", "Reviewed", "Rejected"]),
  option: null,
}));

export default users;
