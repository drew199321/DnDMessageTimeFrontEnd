const serverEndpoint = process.env.NODE_ENV === 'development'
  ? `http://${process.env.REACT_APP_LOCAL_ENDPOINT}`
  : `https://${process.env.REACT_APP_PRODUCTION_ENDPOINT}`;

export default serverEndpoint;
