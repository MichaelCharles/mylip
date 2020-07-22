module.exports = () => {
  const getNetworkIPs = (() => {
    const ignoreRE = /^(127\.0\.0\.1|::1|fe80(:1)?::1(%.*)?)$/i;

    const exec = require('child_process').exec;
    let cached;
    let command;
    let filterRE;

    switch (process.platform) {
      case 'win32':
        command = 'ipconfig';
        filterRE = /\bIPv[46][^:\r\n]+:\s*([^\s]+)/g;
        break;
      case 'darwin':
        command = 'ifconfig';
        filterRE = /\binet\s+([^\s]+)/g;
        break;
      default:
        command = 'ifconfig';
        filterRE = /\binet\b[^:]+:\s*([^\s]+)/g;
        break;
    }

    return (callback, bypassCache) => {
      if (cached && !bypassCache) {
        callback(null, cached);
        return;
      }
      
      exec(command, (error, stdout, sterr) => {
        cached = [];
        let ip;
        let matches = stdout.match(filterRE) || [];
        
        for (let i = 0; i < matches.length; i++) {
          ip = matches[i].replace(filterRE, '$1')
          if (!ignoreRE.test(ip)) {
            cached.push(ip);
          }
        }
        
        callback(error, cached);
      });
    };
  })();

  getNetworkIPs(function (error, ipAddresses) {
    ipAddresses.forEach(ip => console.log(ip))
    if (error) {
      console.log('error:', error);
    }
  }, false);
};
