// import { useEndpoint } from "../../../CustomHooks/useEndpoint";
import { useState } from "react";
import axios from "axios";

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

    const data = {
      id: "1010",
      R: [2, 4],
      P_AtR: [80, 57],
      total_shares: 1000,
    };

    const headers = {
      "Content-Type": "application/json",
    };
    window.log(`Sending data to endpoint: ${JSON.stringify(data)}`);
    try {
      setLoading(true);
      const response = await axios.post(partialCalculatorURL, data, headers);
      window.log(`Response: ${JSON.stringify(response)}`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      window.log(`Error hitting API: ${error}`);
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
    updateRValues,
    updateProbabilities,
    submitData,
  };
};

export default PartialCalculatorAPI;
