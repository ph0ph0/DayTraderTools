import axios from "axios";
import { poll, validatePollingResponse } from "../helpers/PollingFunctions";
import { v4 as uuidv4 } from "uuid";

const PartialCalculatorAPI = ({ state, setState }) => {
  const rValues = state.rValues;
  const probabilities = state.probabilities;
  const windowIsOpen = state.windowIsOpen;
  const loading = state.loading;
  const error = state.error;
  const notification = state.notification;

  const setLoading = (value) => {
    setState((prevState) => {
      return {
        ...prevState,
        loading: value,
      };
    });
  };

  const setError = (value) => {
    setState((prevState) => {
      return {
        ...prevState,
        error: value,
      };
    });
  };
  const setNotification = (value) => {
    setState((prevState) => {
      return {
        ...prevState,
        notification: value,
      };
    });
  };

  const resetAll = () => {
    setState((prevState) => {
      return {
        ...prevState,
        notification: null,
        error: null,
        loading: false,
      };
    });
  };

  const updateRValues = (newValue) => {
    window.log(`new R Value text: ${newValue}`);
    const re = /^[0-9 ,\b]+$/;
    if (newValue === "" || re.test(newValue)) {
      setState((prevState) => {
        return {
          ...prevState,
          rValues: newValue,
        };
      });
    }
  };

  const updateProbabilities = (newValue) => {
    window.log(`new probabilities text: ${newValue}`);
    const re = /^[0-9 ,\b]+$/;
    if (newValue === "" || re.test(newValue)) {
      setState((prevState) => {
        return {
          ...prevState,
          probabilities: newValue,
        };
      });
    }
  };

  const submitData = async () => {
    window.log(`Calculating partials for p: ${probabilities}, r: ${rValues}`);
    resetAll();

    // Lambda request receiver endpoint
    const partialCalculatorURL =
      "https://fecu0p7sjj.execute-api.eu-west-2.amazonaws.com/test/partialoptimiserlambda";
    const pollingURL =
      "https://fecu0p7sjj.execute-api.eu-west-2.amazonaws.com/test/pollingresource";

    //trim the white space either side of the strings, convert to floats.
    // Convert comma separated values into an array of floats.

    // Check input values
    if (!checkProbabilities(probabilities) || !checkRValues(rValues)) return;
    const rValueArrayStrings = rValues.split(",");
    const rFloats = rValueArrayStrings.map((value) => parseFloat(value));
    const probabilityArrayStrings = probabilities.split(",");
    const probFloats = probabilityArrayStrings.map((value) =>
      parseFloat(value)
    );
    window.log(`rFloats: ${rFloats} ; probs: ${probFloats}`);
    if (probFloats.length != rFloats.length) {
      window.log(
        `Please ensure that you have the same number of R Values as Probabilities`
      );
      setError(
        "Please ensure that you have the same number of R Values as Probabilities"
      );
      return;
    }

    switch (probFloats.length) {
      case 3:
        window.log(`Hit 3`);
        setNotification("NOTE: This may take up to 30 seconds to run...");
        break;
      case 4:
        window.log(`Hit 4`);
        setNotification(
          "NOTE: 4 sets of inputs can take over a minute to run... Please be patient!"
        );
        break;
      default:
        window.log(`Hit none`);
        resetAll();
    }
    setState((prevState) => {
      window.log(`Changing`);
      return {
        ...prevState,
        windowIsOpen: !windowIsOpen,
      };
    });
    // return;

    // const objectId = uuidv4();
    // const dataInputs = {
    //   id: objectId,
    //   R: [2, 4, 6, 8],
    //   P_AtR: [80, 57, 60, 20],
    //   total_shares: 1000,
    // };
    // const headers = {
    //   "Content-Type": "application/json",
    // };
    // window.log(`Sending data to endpoint: ${JSON.stringify(dataInputs)}`);
    // // Send data to cloud
    // var queryID;
    // try {
    //   setLoading(true);
    //   const response = await axios.post(
    //     partialCalculatorURL,
    //     dataInputs,
    //     headers
    //   );
    //   window.log(`Response: ${JSON.stringify(response)}`);
    //   const body = JSON.parse(response["data"]["body"]);
    //   window.log(`body: ${JSON.stringify(body)}`);
    //   queryID = body["id"];
    //   if (dataInputs.id != queryID) {
    //     throw "database id is not the same as sent id";
    //   }
    //   window.log(`Done sending data to backend`);
    //   setLoading(false);
    // } catch (error) {
    //   setLoading(false);
    //   setError(error);
    //   window.log(`Error hitting API: ${error}`);
    //   return;
    // }
    // window.log(`Now looking to poll with id: ${queryID}`);
    // // Now poll the backend until we get a response.

    // const queryIdObject = { id: queryID };
    // const queryBackend = async () => {
    //   try {
    //     window.log(`querying backend: ${JSON.stringify(queryIdObject)}`);
    //     return await axios.post(pollingURL, queryIdObject, headers);
    //   } catch (error) {
    //     throw new Error(`Error calling axios post: ${error}`);
    //   }
    // };

    // try {
    //   const partialCalculatorResult = await poll(
    //     queryBackend,
    //     validatePollingResponse,
    //     20
    //   );
    //   window.log(
    //     `PartialCalculatorResult: ${JSON.stringify(partialCalculatorResult)}`
    //   );
    // } catch (error) {
    //   window.log(`Error polling: ${error}`);
    // }
    // setState((prevState) => {
    //   return {
    //     ...prevState,
    //     windowIsOpen: !windowIsOpen,
    //   };
    // });
  };

  const checkRValues = (rVals) => {
    const rValueArrayStrings = rVals.trim().split(",");
    if (!rVals.includes(",")) {
      window.log(`No comma in R vals`);
      setError("Please provide a comma separated list eg 2, 3, 4");
      return false;
    }
    if (rValueArrayStrings.length <= 1) {
      window.log(`Please provide more than one value, separated by commas`);
      setError("Please provide more than one value, separated by commas");
      return false;
    }
    if (rValueArrayStrings.length > 4) {
      window.log(
        `rValue array too long, aborting: ${rValueArrayStrings.length}`
      );
      setError(
        "R Values array is too long, please provide a maximum of 4 entries"
      );
      return false;
    }
    const rValueArrayFloat = rValueArrayStrings.map((value) =>
      parseFloat(value)
    );
    window.log(`Float array: ${rValueArrayFloat}`);
    for (let i = 0; i <= rValueArrayFloat.length; i++) {
      if (rValueArrayFloat[i] === false || Number.isNaN(rValueArrayFloat[i])) {
        window.log(`Please ensure that there are no trailing commas`);
        setError("Please ensure that there are no trailing commas");
        return;
      }
      if (i == 0) continue;
      if (rValueArrayFloat[i] < rValueArrayFloat[i - 1]) {
        window.log(`R Values should increase from left to right`);
        setError("R Values should increase from left to right");
        return false;
      }
    }
    return true;
  };

  const checkProbabilities = (probs) => {
    const probabilityArrayStrings = probs.trim().split(",");
    if (!probs.includes(",")) {
      window.log(`No comma in probabilities`);
      setError(
        "Please provide a comma separated list for both inputs eg 2, 3, 4"
      );
      return false;
    }
    if (probabilityArrayStrings.length <= 1) {
      window.log(
        `${"Please provide more than one value, separated by commas"}`
      );
      setError("Please provide more than one value, separated by commas");
      return false;
    }
    if (probabilityArrayStrings.length > 4) {
      window.log(
        `probabilites array too long, aborting: ${probabilityArrayStrings.length}`
      );
      setError(
        "R Values array is too long, please provide a maximum of 4 entries"
      );
      return false;
    }
    const probabilityArrayFloat = probabilityArrayStrings.map((value) =>
      parseFloat(value)
    );
    window.log(`Float array: ${probabilityArrayFloat}`);
    for (let i = 0; i <= probabilityArrayFloat.length; i++) {
      if (
        probabilityArrayFloat[i] === false ||
        Number.isNaN(probabilityArrayFloat[i])
      ) {
        window.log(`Please ensure that there are no trailing commas`);
        setError("Please ensure that there are no trailing/trapped commas");
        return;
      }
      if (i == 0) continue;
      if (probabilityArrayFloat[i] > probabilityArrayFloat[i - 1]) {
        window.log(`Probabilities should decrease from left to right`);
        setError("Probabilities should decrease from left to right");
        return false;
      }
    }
    return true;
  };

  const switchWindow = () => {
    setState((prevState) => {
      return {
        ...prevState,
        windowIsOpen: !windowIsOpen,
      };
    });
  };

  return {
    rValues,
    probabilities,
    windowIsOpen,
    loading,
    error,
    notification,
    setError,
    setLoading,
    setNotification,
    resetAll,
    updateRValues,
    updateProbabilities,
    submitData,
  };
};

export default PartialCalculatorAPI;
