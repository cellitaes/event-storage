import { it, expect, describe } from "vitest";
import HttpError from "./httpError";

describe("class HttpError", () => {
  it("should contain provided message", () => {
    const testMessage = "Test";

    const httpError = new HttpError(testMessage);

    expect(httpError.message).toBe(testMessage);
  });

  it("should contain provided message and status code", () => {
    const testMessage = "Test";
    const testStatusCode = 1;

    const httpError = new HttpError(testMessage, testStatusCode);

    expect(httpError.message).toBe(testMessage);
    expect(httpError.code).toBe(testStatusCode);
  });

  it("should have defult message and status code should be undefined", () => {
    const httpError = new HttpError();

    expect(httpError.message).toBe("");
    expect(httpError.code).toBeUndefined();
  });
});
