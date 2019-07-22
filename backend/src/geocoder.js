import NodeGeocoder from 'node-geocoder';

let options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'xxx', // for Mapquest, OpenCage, Google Premier
  formatter: null, // 'gpx', 'string', ...
};

export default NodeGeocoder(options);
