module.exports = () => {
  const os = require("os");
  const interfaces = os.networkInterfaces();

  let networkIP = "";
  Object.keys(interfaces).forEach(function(interfaceName) {
    interfaces[interfaceName].forEach(function(networkInterface) {
      if (
        "IPv4" !== networkInterface.family ||
        networkInterface.internal !== false
      ) {
        return;
      }
      networkIP = networkInterface.address;
    });
  });

  console.log(networkIP);
};
