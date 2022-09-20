const { CONNECTION_STRING_PLAYGROUND } = require("../config");

import { it, expect, describe, beforeAll, afterEach, afterAll } from "vitest";

import mongoose from "mongoose";
const Event = require("./event");

const mongodb = CONNECTION_STRING_PLAYGROUND;
mongoose.connect(mongodb);

describe("Event Model", () => {
  beforeAll(async () => {
    await Event.remove({});
  });

  afterEach(async () => {
    await Event.remove({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should have a module", async () => {
    expect(Event).toBeDefined();
  });

  it("should post event to database", async () => {
    const testEvent = new Event({
      firstName: "Test",
      lastName: "Test",
      email: "test@test.com",
      eventDate: "2022-09-20",
    });

    await testEvent.save();
    const foundTestEvent = await Event.findOne({
      firstName: testEvent.firstName,
    });

    expect(foundTestEvent.firstName).toBe(testEvent.firstName);
  });

  it("should throw error due to missing field in schema", async () => {
    const testEvent = new Event({
      firstName: "Test",
      lastName: "Test",
      email: "test@test.com",
    });

    expect(testEvent.save).toThrow;
  });

  it("should throw error due to incorrect field data type in schema", async () => {
    const testEvent = new Event({
      firstName: 1,
      lastName: "Test",
      email: "test@test.com",
      eventDate: "2022-09-20",
    });

    expect(testEvent.save).toThrow;
  });
});
