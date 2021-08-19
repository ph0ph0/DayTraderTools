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
  const resultText = state.resultText;

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
        resultText: "",
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
    if (windowIsOpen) {
      window.log(`Closing window in submit`);
      setState((prevState) => {
        return {
          ...prevState,
          windowIsOpen: false,
        };
      });
    }
    // let the window close
    if (windowIsOpen) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
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
        setTimeout(() => {
          setNotification(null);
        }, 5000);
        break;
      case 4:
        window.log(`Hit 4`);
        setNotification(
          "NOTE: 4 sets of inputs can take over a minute to run... Please be patient!"
        );
        setTimeout(() => {
          setNotification(null);
        }, 5000);
        break;
      default:
        window.log(`Hit none`);
        resetAll();
    }

    const objectId = uuidv4();
    const dataInputs = {
      id: objectId,
      R: rFloats,
      P_AtR: probFloats,
      total_shares: 1000,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    window.log(`Sending data to endpoint: ${JSON.stringify(dataInputs)}`);
    // Send data to cloud
    var queryID;
    try {
      setLoading(true);
      const response = await axios.post(
        partialCalculatorURL,
        dataInputs,
        headers
      );
      window.log(`Response: ${JSON.stringify(response)}`);
      const body = JSON.parse(response["data"]["body"]);
      window.log(`body: ${JSON.stringify(body)}`);
      queryID = body["id"];
      if (dataInputs.id != queryID) {
        throw "database id is not the same as sent id";
      }
      window.log(`Done sending data to backend`);
      window.log(`Now looking to poll with id: ${queryID}`);

      // Now poll the backend until we get a response.
      const queryIdObject = { id: queryID };
      const queryBackend = async () => {
        try {
          window.log(`querying backend: ${JSON.stringify(queryIdObject)}`);
          return await axios.post(pollingURL, queryIdObject, headers);
        } catch (error) {
          throw new Error(`Error calling axios post: ${error}`);
        }
      };

      const partialCalculatorResult = await poll(
        queryBackend,
        validatePollingResponse,
        20
      );
      window.log(
        `PartialCalculatorResult: ${JSON.stringify(partialCalculatorResult)}`
      );
      window.log(`rFLOATSBJKKJHKLBJ: ${rFloats.length}`);
      setLoading(false);
      setNotification(null);
      setState((prevState) => {
        return {
          ...prevState,
          windowIsOpen: true,
          resultText: parseResults(partialCalculatorResult, rFloats),
        };
      });
    } catch (error) {
      setLoading(false);
      setError(`Contact admin: ${error}`);
      setNotification(null);
      window.log(`Error hitting API: ${error}`);
      return;
    }
  };

  const parseResults = (jsonData, rVals) => {
    // We only want the top 3
    const limit = 3;
    // data array is an array of arrays. Each element in the dataArray is an array which contains the result for that iteration. So the first entry would be:
    // [[0,100], 900].
    window.log(`rValLength!: ${rVals.length}`);
    const dataArray = jsonData.data.body[0].results;
    let resultString = "Totals are after 1000 trades \n\n";
    for (var i = 0; i < limit; i++) {
      resultString = resultString.concat(`Strategy ${i + 1}: \n`);
      const result = dataArray[i];
      for (var j = 0; j < rVals.length; j++) {
        // Iterate through the partial percentages
        const partialPercentage = result[0][j];
        window.log(`pP: ${partialPercentage}`);
        const rValue = rVals[j];
        window.log(`for rVAL: ${rValue}`);
        const string = `${partialPercentage}% partial at ${rValue}R,`;
        window.log(`Made string: ${string}`);
        resultString = resultString.concat(string, "\n");
      }
      resultString = resultString.concat(` Total: ${result[1]}R`, "\n\n");
    }

    // let stringData = JSON.stringify(jsonData.data.body[0].results);
    // stringData = stringData.replace(/\[/g, "(");
    // stringData = stringData.replace(/\]/g, ")");
    return resultString;
  };

  const checkRValues = (rVals) => {
    const rValueArrayStrings = rVals.trim().split(",");
    if (!rVals.includes(",")) {
      window.log(`No comma in R vals`);
      setError(
        "Please provide a comma separated list for both inputs eg 2, 3, 4"
      );
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
        setError("Please ensure that there are no trailing/trapped commas");
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
        "Probabilities array is too long, please provide a maximum of 4 entries"
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
    resultText,
    setError,
    setLoading,
    setNotification,
    resetAll,
    updateRValues,
    updateProbabilities,
    checkRValues,
    checkProbabilities,
    submitData,
  };
};

export default PartialCalculatorAPI;
