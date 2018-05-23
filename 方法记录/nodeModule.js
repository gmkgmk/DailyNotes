let outputVal = 0;
let increment = 1;

function setOutputVal(val) {
  outputVal = val;
}

function setIncremet(incrementVal) {
  increment = incrementVal;
}

function printNextCount() {
  outputVal += increment;
}

function printOutpuVal() {
  console.log(outputVal);
}

exports.setOutputVal = setOutputVal;
exports.setIncremet = setIncremet;
module.exports.printNextCount = printNextCount;
