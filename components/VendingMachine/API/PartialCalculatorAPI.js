const PartialCalculatorAPI = ({ state, setState }) => {
  const rValues = state.rValues;
  const probabilities = state.probabilities;

  const submitData = () => {
    window.log("Calculating Partials...");
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

  return {
    rValues,
    probabilities,
    updateRValues,
    updateProbabilities,
    submitData,
  };
};

export default PartialCalculatorAPI;
