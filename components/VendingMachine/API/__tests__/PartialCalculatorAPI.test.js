import { cleanup } from "@testing-library/react";

import PartialCalculatorAPI from "../PartialCalculatorAPI";

afterEach(cleanup);

let state = {
  rValues: "",
  probabilities: "",
  windowIsOpen: false,
  loading: false,
  error: null,
  notification: null,
};

const useApiMock = (api, defaultValue) => {
  let state = defaultValue;
  let setState = (updater) => {
    if (typeof updater === "function") {
      state = updater(state);
    } else {
      state = updater;
    }
    ref.api = api({ state, setState });
  };
  let ref = {
    api: api({ state, setState }),
  };
  return ref;
};

const mockApi = useApiMock(PartialCalculatorAPI, state);

//Allows us to ignore window . log calls
global.log = () => {};

describe("input updaters", () => {
  // Basic inputs
  it("updates R Values", () => {
    mockApi.api.updateRValues("1, 2, 3");
    expect(mockApi.api.rValues).toEqual("1, 2, 3");
  });
  it("updates probabilities", () => {
    mockApi.api.updateProbabilities("4,3,2");
    expect(mockApi.api.probabilities).toEqual("4,3,2");
  });

  //   Only numbers and commas
  it("doesn't allow nonnumeric entries in the R input", () => {
    mockApi.api.updateRValues("");
    mockApi.api.updateRValues("abc./;'");
    expect(mockApi.api.rValues).toEqual("");
  });
  it("doesn't allow nonnumeric entries in the probabilities input", () => {
    mockApi.api.updateProbabilities("");
    mockApi.api.updateProbabilities("abc./;'");
    expect(mockApi.api.probabilities).toEqual("");
  });
});

describe("setError, setLoading, setNotification", () => {
  it("sets the error", () => {
    mockApi.api.setError("Error");
    expect(mockApi.api.error).toEqual("Error");
  });
  it("sets loading", () => {
    mockApi.api.setLoading(true);
    expect(mockApi.api.loading).toEqual(true);
  });
  it("sets notification", () => {
    mockApi.api.setNotification("NOTE:");
    expect(mockApi.api.notification).toEqual("NOTE:");
  });
  it("resets error, loading and notification", () => {
    mockApi.api.resetAll();
    expect(mockApi.api.notification).toEqual(null);
    expect(mockApi.api.loading).toEqual(false);
    expect(mockApi.api.error).toEqual(null);
  });
});

// describe("input checkers", () => {
//   it("checks that commas are present");
// });
