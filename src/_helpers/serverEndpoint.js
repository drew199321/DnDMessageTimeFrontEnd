const serverEndpoint = process.env.NODE_ENV === 'development'
  ? process.env.REACT_APP_LOCAL_ENDPOINT
  : process.env.REACT_APP_PRODUCTION_ENDPOINT;

export default serverEndpoint;
