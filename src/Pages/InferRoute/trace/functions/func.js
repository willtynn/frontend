/**
 * src\Pages\Route\trace\functions\func.js
 */
export function calculateDuration(duration) {
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
