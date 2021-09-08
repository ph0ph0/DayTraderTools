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

const resetTests = () => {
  mockApi.api.error = null;
  mockApi.api.notification = null;
  mockApi.api.loading = false;
  mockApi.api.rValues = "";
  mockApi.api.probabilities = "";
};

describe("input updaters", () => {
  // Basic inputs
  it("updates R Values", () => {
    mockApi.api.updateRValues("1, 2, 3");
    expect(mockApi.api.rValues).toEqual("1, 2, 3");
    resetTests();
  });
  it("updates probabilities", () => {
    mockApi.api.updateProbabilities("4,3,2");
    expect(mockApi.api.probabilities).toEqual("4,3,2");
    resetTests();
  });

  //   Only numbers and commas
  it("doesn't allow nonnumeric entries in the R input", () => {
    mockApi.api.updateRValues("");
    mockApi.api.updateRValues("abc./;'");
    expect(mockApi.api.rValues).toEqual("");
    resetTests();
  });
  it("doesn't allow nonnumeric entries in the probabilities input", () => {
    mockApi.api.updateProbabilities("");
    mockApi.api.updateProbabilities("abc./;'");
    expect(mockApi.api.probabilities).toEqual("");
    resetTests();
  });
});

describe("setError, setLoading, setNotification", () => {
  it("sets the error", () => {
    mockApi.api.setError("Error");
    expect(mockApi.api.error).toEqual("Error");
    resetTests();
  });
  it("sets loading", () => {
    mockApi.api.setLoading(true);
    expect(mockApi.api.loading).toEqual(true);
    resetTests();
  });
  it("sets notification", () => {
    mockApi.api.setNotification("NOTE:");
    expect(mockApi.api.notification).toEqual("NOTE:");
    resetTests();
  });
  it("resets error, loading and notification", () => {
    mockApi.api.resetAll();
    expect(mockApi.api.notification).toEqual(null);
    expect(mockApi.api.loading).toEqual(false);
    expect(mockApi.api.error).toEqual(null);
    resetTests();
  });
});

describe("input checkers", () => {
  it("checks that commas are present in R values", () => {
    mockApi.api.updateRValues("");
    mockApi.api.checkRValues(mockApi.api.rValues);
    expect(mockApi.api.error).toEqual(
      "Please provide a comma separated list for both inputs eg 2, 3, 4"
    );
    resetTests();
  });
  it("checks that commas are present in probabilities", () => {
    mockApi.api.updateProbabilities("");
    mockApi.api.checkProbabilities(mockApi.api.probabilities);
    expect(mockApi.api.error).toEqual(
      "Please provide a comma separated list for both inputs eg 2, 3, 4"
    );
    resetTests();
  });
  it("checks trailing commas present in R values", () => {
    mockApi.api.updateRValues("1,");
    mockApi.api.checkRValues(mockApi.api.rValues);
    expect(mockApi.api.error).toEqual(
      "Please ensure that there are no trailing/trapped commas"
    );
    resetTests();
  });
  it("checks for trailing commas present in probabilities", () => {
    mockApi.api.updateProbabilities("1,");
    mockApi.api.checkProbabilities(mockApi.api.probabilities);
    expect(mockApi.api.error).toEqual(
      "Please ensure that there are no trailing/trapped commas"
    );
    resetTests();
  });
  it("checks there are fewer than 4 entries present in R values", () => {
    resetTests();
    mockApi.api.updateRValues("1,2,3,4,5");
    mockApi.api.checkRValues(mockApi.api.rValues);
    expect(mockApi.api.error).toEqual(
      "R Values array is too long, please provide a maximum of 4 entries"
    );
    resetTests();
  });
  it("checks there are fewer than 4 entries present in probs", () => {
    mockApi.api.updateProbabilities("5, 4,3,2,1");
    mockApi.api.checkProbabilities(mockApi.api.probabilities);
    expect(mockApi.api.error).toEqual(
      "Probabilities array is too long, please provide a maximum of 4 entries"
    );
    resetTests();
  });
  it("checks that R values increase from left to right", () => {
    resetTests();
    mockApi.api.updateRValues("4,3,2,1");
    mockApi.api.checkRValues(mockApi.api.rValues);
    expect(mockApi.api.error).toEqual(
      "R Values should increase from left to right"
    );
    resetTests();
  });
  it("checks that probs decrease from left to right", () => {
    resetTests();
    mockApi.api.updateProbabilities("1,2,3,4");
    mockApi.api.checkProbabilities(mockApi.api.probabilities);
    expect(mockApi.api.error).toEqual(
      "Probabilities should decrease from left to right"
    );
    resetTests();
  });
});

// Need to add tests for resetting the token if the api fails
// Test for setting the token error and error fields
