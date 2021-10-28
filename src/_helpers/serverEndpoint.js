const serverEndpoint = process.env.NODE_ENV === 'development'
  ? `http://${process.env.REACT_APP_LOCAL_ENDPOINT}`
  : `http://${process.env.REACT_APP_PRODUCTION_ENDPOINT}`;

export default serverEndpoint;
