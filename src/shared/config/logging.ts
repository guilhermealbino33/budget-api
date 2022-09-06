/* eslint-disable no-console */

const getTimeStamp = () => new Date().toISOString();

const info = (message: string, object?: unknown) => {
  if (object) {
    console.log(`[${getTimeStamp()}] [INFO] ${message}`, object);
  } else {
    console.log(`[${getTimeStamp()}] [INFO] ${message}`);
  }
};

const debug = (message: string, object?: unknown) => {
  const LOG_DEBUG_ENABLED = Boolean(process.env.LOG_DEBUG_ENABLED);
  if (LOG_DEBUG_ENABLED) {
    if (object) {
      console.log(`[${getTimeStamp()}] [DEBUG] ${message}`, object);
    } else {
      console.log(`[${getTimeStamp()}] [DEBUG] ${message}`);
    }
  }
};

const error = (message: string, object?: unknown) => {
  if (object) {
    console.log(`[${getTimeStamp()}] [ERROR] ${message}`, object);
  } else {
    console.log(`[${getTimeStamp()}] [ERROR] ${message}`);
  }
};

export default {
  info,
  debug,
  error,
};
