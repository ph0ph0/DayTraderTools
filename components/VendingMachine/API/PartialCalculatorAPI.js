import axios from "axios";
import { poll, validatePollingResponse } from "../helpers/PollingFunctions";
import { v4 as uuidv4 } from "uuid";

const PartialCalculatorAPI = ({ state, setState }) => {
  const rValues = state.rValues;
  const probabilities = state.probabilities;
  const windowIsOpen = state.windowIsOpen;
  const loading = state.loading;
  const error = state.error;

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

  const submitData = async () => {
    window.log(`Calculating partials for p: ${probabilities}, r: ${rValues}`);

    // Lambda request receiver endpoint
    const partialCalculatorURL =
      "https://fecu0p7sjj.execute-api.eu-west-2.amazonaws.com/test/partialoptimiserlambda";
    const pollingURL =
      "https://fecu0p7sjj.execute-api.eu-west-2.amazonaws.com/test/pollingresource";

    //trim the white space either side of the strings, convert to floats.

    const objectId = uuidv4();
    const dataInputs = {
      id: objectId,
      R: [2, 4, 6, 8],
      P_AtR: [80, 57, 60, 20],
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      window.log(`Error hitting API: ${error}`);
      return;
    }
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

    try {
      const partialCalculatorResult = await poll(
        queryBackend,
        validatePollingResponse,
        20
      );
      window.log(
        `PartialCalculatorResult: ${JSON.stringify(partialCalculatorResult)}`
      );
    } catch (error) {
      window.log(`Error polling: ${error}`);
    }
    setState((prevState) => {
      return {
        ...prevState,
        windowIsOpen: !windowIsOpen,
      };
    });
  };

  const updateRValues = (newValue) => {
    window.log(`new R Value text: ${newValue}`);
    setState((prevState) => {
      return {
        ...prevState,
        rValues: newValue,
      };
    });
  };

  const updateProbabilities = (newValue) => {
    window.log(`new probabilities text: ${newValue}`);
    setState((prevState) => {
      return {
        ...prevState,
        probabilities: newValue,
      };
    });
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
    updateRValues,
    updateProbabilities,
    submitData,
  };
};

export default PartialCalculatorAPI;
