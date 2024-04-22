/**
 * src\Pages\Route\trace\functions\func.js
 */
function calculateDuration(duration) {
  if (duration < 1000) {
    return duration + 'μs';
  } else if (duration < 1000000) {
    return (duration / 1000).toFixed(1) + 'ms';
  } else {
    duration /= 1000000;
  }
  if (duration < 60) {
    return duration.toFixed(1) + 's';
  } else if (duration < 3600) {
    return (duration / 60).toFixed(1) + 'min';
  } else if (duration < 86400) {
    return (duration / 3600).toFixed(1) + 'h';
  } else {
    return (duration / 86400).toFixed(1) + 'd';
  }
}

function clone(obj) {
  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
      var copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
      var copy = [];
      let len = obj.length
      for (var i = 0; i < len; ++i) {
          copy[i] = clone(obj[i]);
      }
      return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
      var copy = {};
      for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
      }
      return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}

export { calculateDuration, clone };
