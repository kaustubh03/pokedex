/**
 * Adds singular/plural label to num based on the value
 * @param num
 * @param singular
 * @param plural
 * @returns {string}
 */
export default (num, singular, plural) => {
  if (!num || num < 1) return '';
  let retVal = num,
    label = singular;
  if (num > 1) {
    label = plural;
  }
  return `${retVal} ${label}`;
};
