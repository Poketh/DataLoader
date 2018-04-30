const crypto = require('crypto');
var ethUtils = require('ethereumjs-util');

var getRandomWallet = function() {
  var randbytes = crypto.randomBytes(32);
  var address = '0x' + ethUtils.privateToAddress(randbytes).toString('hex');
  return { address: address, privKey: randbytes.toString('hex') }
}
var countBits = function(bin) {
  return bin.toString(2).replace(/0/gi,'').length;
}
var hasBits = function(wallet, input, diffPow) {
  var _add = wallet.address;

  const diffMask = Math.pow(2,diffPow)-1;
  const h = parseInt(_add.substr(-13), 16)
  const x = countBits(h);

  const diff = Math.floor(parseInt(_add.substr(2,6), 16));
  const done = (diff & diffMask) === 0;

  return x === parseInt(input,10) && done;
}
var getWallet = function(input = '', diffMask = 3) {
  var _wallet = getRandomWallet();
  var g = 0;
  while (!hasBits(_wallet, input, diffMask)) { g++;  _wallet = getRandomWallet(); }
  console.log("\n Generated " + g + " wallets.");
  return _wallet;
}

module.exports = {
  getWallet: getWallet,
};
