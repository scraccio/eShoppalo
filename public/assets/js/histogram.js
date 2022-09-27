function rangeHistogram(X, step) {
  var max = Math.max(...X);
  var binNum = Math.floor(max / step);
  var bins = new Array(binNum+1).fill(0);
  X.forEach((x) => bins[Math.floor(x / step)]++);

  var rangeArray = new Array(binNum+1);
  for(let i=0; i<rangeArray.length; i++){
    rangeArray[i] = (i*5) + '€-' + (i*5+5) + '€';
  }

  var obj = {
    range: rangeArray,
    histogram: bins,
    highest: bins.indexOf(Math.max(...bins))
  }
  return obj;

}

function toHistogram(array){
  var bins = new Array(Math.max(...array) - Math.min(...array) + 1).fill(0);
  array.forEach((x) => bins[x - Math.min(...array)]++)

  var obj = {
    histogram: bins,
    highest: bins.indexOf(Math.max(...bins))
  }
  return obj;
}