function shuffle(array) {
  const a = cloneArray(array);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function cloneArray(array) {
  return array.slice(0);
}

function circularIndex(array, i) {
  return (i + array.length) % array.length;
}

function circularGet(array, i) {
  return array[circularIndex(array, i)];
}

function splitTextIntoLines(str, maxCharPerLine) {
  const n = str.length;
  const lines = [];
  var charsDone = 0;
  var tmp, lastSpaceIndex;
  while (charsDone < n) {
    tmp = str.substring(charsDone, maxCharPerLine + charsDone);
    lastSpaceIndex = tmp.lastIndexOf(" ");
    if (tmp.length < maxCharPerLine || lastSpaceIndex < 0) {
      lines.push(tmp);
      charsDone += tmp.length;
    } else {
      lines.push(tmp.substring(0, lastSpaceIndex));
      charsDone += lastSpaceIndex + 1;
    }
  }
  return lines;
}

function clearArray(arr) {
  arr.length = 0;
}

function hap() {
  // Used for debugging. Yeah I'm good
  console.log("Happened");
}
