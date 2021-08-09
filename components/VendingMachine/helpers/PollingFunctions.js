// Polling functions
export const poll = async (fn, validate, maxAttempts) => {
  window.log(`Starting poll...`);
  let attempts = 0;
  let interval;

  const executePoll = async (resolve, reject) => {
    let result;
    interval = attempts * 500;
    try {
      result = await fn();
      window.log(`Result: ${JSON.stringifyresult}`);
    } catch (error) {
      window.log(`Error running polling query ${error}`);
      return reject(error);
    }

    attempts++;
    window.log(`Attempt: ${attempts}, Interval: ${interval}`);

    if (validate(result)) {
      return resolve(result);
    } else if (maxAttempts == attempts) {
      return reject(new Error("Failed to get result from polling"));
    } else {
      setTimeout(executePoll, interval, resolve, reject);
    }
  };

  return new Promise(executePoll);
};

export const validatePollingResponse = (response) => {
  if (response === undefined) {
    return false;
  }
  if (response.data.body[0].calculationStatus == "finished") {
    return true;
  }

  return false;
};
