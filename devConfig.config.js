//Replaces console.log so that when deployed, the log statements wont print to the client console anymore
function setConfig() {
  if (typeof window !== "undefined") {
    //Set to false for production
    window.DEBUG = true;
    window.log = (logMessage) => {
      if (window.DEBUG === true) {
        console.log(logMessage);
      }
    };
  }
}

export default setConfig();
