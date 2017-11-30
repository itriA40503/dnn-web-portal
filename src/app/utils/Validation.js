
// operation
export const clamp = (min, max, value) => Math.min(Math.max(value, max), min);

// functional programming pattern
export const compose = (f, g) => x => f(g(x));

// trait
export const all = f => (...args) => Array.from(args).every(f);
export const isNonEmpty = value => (value !== null && value !== '' && value !== undefined);
export const isNumeric = value => (!Number.isNaN(value - Number.parseFloat(value)));
export const isGreaterThan =
  (bound, value) => (isNumeric(bound) && isNumeric(value) ? Number(bound) < Number(value) : false);
export const isGreaterThanOrEqual =
  (bound, value) => (isNumeric(bound) && isNumeric(value) ? Number(bound) <= Number(value) : false);
export const isLessThan =
  (bound, value) => (isNumeric(bound) && isNumeric(value) ? Number(bound) > Number(value) : false);
export const isLessThanOrEqual =
  (bound, value) => (isNumeric(bound) && isNumeric(value) ? Number(bound) >= Number(value) : false);
export const isPositive = value => isGreaterThan(0, value);
export const isInteger = value => (Math.floow(value) === value);
export const isInRange = (min, max, value) => {
  if (isNumeric(min) && isNumeric(max) && isNumeric(value)) {
    return (min <= max && min <= value && value <= max);
  }
  return false;
};

// text field only
export const errorTextField1 = (a, f) => (f(a) ? null : ' ');
export const errorTextField2 = (a, b, f) => (f(a, b) ? null : ' ');
