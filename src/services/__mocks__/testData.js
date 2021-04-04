const contacts = [
  {
    subscription: "free",
    _id: "6063ade28044c59034533c58",
    name: "Paule",
    email: "att@gmail.com",
    phone: "(433) 222-3533",
  },
  {
    subscription: "free",
    _id: "6063adf58044c59034533c59",
    name: "Megan",
    email: "meg@gmail.com",
    phone: "(423) 222-3533",
  },
];

const newContact = {
  name: "NEW",
  email: "new@gmail.com",
  phone: "(789) 222-3533",
};

const User = {
  _id: "6063ae86751cf3809077a161",
  subscription: "free",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNjExMWYyNGVmYzA3MjlhODIzMzUxNyIsImlhdCI6MTYxNzE0NTYxNywiZXhwIjoxNjE3MTQ5MjE3fQ.De3Estz-qR-cBDaz-OqctFsAnZfgqYOm5xVpNstKYbQ",
  email: "test@gmail.com",
  password: "$2a$06$0kOm12qtJMIMAjCMZQ6Soeg9pEZ21LXFFPSzT/ThQ0fa5okSb0nDu",
  avatar:
    "https://s.gravatar.com/avatar/c0703c8dcd8fdae798f267b77ae9dde2?s=250",
  createdAt: "2021-03-30T23:04:38.714+00:00",
  updatedAt: "2021-03-30T23:04:38.714+00:00",
};

const users = [];
users[0] = User;

const newUser = { email: "test@test.com", password: "123456" };

module.exports = { contacts, newContact, User, users, newUser };
