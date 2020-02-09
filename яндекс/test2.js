module.exports = function (diffs) {
  let delta = [0, 0];
  for (diff of diffs) {
    for (i = 0; i < 2; i++) {
      if (diff[i] === 1 && delta[i] >= 0) {
        diff[i] = -1;
        delta[i] += +diff[i];
      } else if (diff[i] === 1 && delta[i] < 0) {
        delta[i] += +diff[i];
      }

    }
  }
  if (delta[0] === 0 && delta[1] === 0) {
    return diffs;
  } else {
      return null;
  }
  
}

