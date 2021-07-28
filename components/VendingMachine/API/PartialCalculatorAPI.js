const PartialCalculatorAPI = ({ state, setState }) => {
  const rValues = state.rValues;
  const probabilities = state.probabilities;
  const windowIsOpen = state.windowIsOpen;

  const submitData = () => {
    window.log(`Calculating partials for p: ${probabilities}, r: ${rValues}`);
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
