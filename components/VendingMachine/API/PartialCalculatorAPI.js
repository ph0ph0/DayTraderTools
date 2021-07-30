import { useEndpoint } from "../../../customHooks/useEndpoint";

const PartialCalculatorAPI = ({ state, setState }) => {
  const rValues = state.rValues;
  const probabilities = state.probabilities;
  const windowIsOpen = state.windowIsOpen;

  const submitData = async () => {
    window.log(`Calculating partials for p: ${probabilities}, r: ${rValues}`);

    const { postEndpoint } = useEndpoint();

    // Lambda request receiver endpoint
    const url =
      "https://fecu0p7sjj.execute-api.eu-west-2.amazonaws.com/test/partialoptimiserlambda";

    // const data = {
    //   id: String,
    //   R: [Int],
    //   P_AtR: [Int],
    //   total_shares: Int
    // }

    const data = {
      id: "52",
      R: [2, 4, 6, 8],
      P_AtR: [80, 57, 40, 10],
      total_shares: 1000,
    };
    window.log(`Sending data to endpoint...`);
    await postEndpoint(url, data);

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
