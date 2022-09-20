const createdEvent = {
  msg: "OK",
  createdEvent: {
    _id: "123",
    firstName: "Test",
    lastName: "Test",
    email: "test@test.com",
    eventDate: "2022-09-20",
  },
};

const testResponseData = {
  ok: true,
  json() {
    new Promise((resolve, reject) => {
      resolve(createdEvent);
    });
  },
};

export default {
  fetch: jest.fn().mockResolvedValue(testResponseData),
};
