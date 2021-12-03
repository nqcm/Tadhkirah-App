export default function calculateDays(level) {
  let days = 0;

  if (level === 1) {
    days = 1;
  } else if (level === 2) {
    days = 2;
  } else if (level === 3) {
    days = 4;
  } else if (level === 4) {
    days = 8;
  } else if (level === 5) {
    days = 16;
  } else {
    days = 0;
  }

  return days;
}
