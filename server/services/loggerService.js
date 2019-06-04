const colors = require('colors');
exports.msg = msg => {
  let d = new Date().toLocaleTimeString();
  return console.log(`${colors.grey(d)} ✨ ${colors.green(msg)}`);
};
exports.err = msg => {
  let d = new Date().toLocaleTimeString();
  return console.log(`${colors.grey(d)} ❗️ ${colors.red(msg)}`);
};
