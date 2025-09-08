// src/middleware/logger.js
const logger = store => next => action => {
  const result = next(action);

  const log = {
    eventType: action.type,
    details: action.payload,
    timestamp: new Date().toISOString()
  };

  let logs = JSON.parse(localStorage.getItem("logs")) || [];
  logs.push(log);
  localStorage.setItem("logs", JSON.stringify(logs));

  console.log("LOG:", log);

  return result;
};

export default logger;
