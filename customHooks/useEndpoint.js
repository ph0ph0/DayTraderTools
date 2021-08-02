import { useState } from "react";
import axios from "axios";

export const useEndpoint = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postEndpoint = async (url, data) => {
    try {
      setLoading(true);
      const response = await axios.post(url, data, headers);
      window.log(`Response: ${JSON.stringify(response)}`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      window.log(`Error hitting API: ${error}`);
    }
  };

  return {
    loading,
    error,
    postEndpoint,
  };
};

// export default useEndpoint;
