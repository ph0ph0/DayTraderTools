import { useState } from "react";
import axios from "axios";

const useEndpoint = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postEndpoint = async (url, data) => {
    window.log(`Hitting endpoint!`);
    const result = await axios.post(url, data);
    window.log(`response: ${result}`);
  };

  return {
    loading,
    error,
    setLoading,
    setError,
    postEndpoint,
  };
};

export default useEndpoint;
