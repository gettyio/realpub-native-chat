/**
 * Scale dimension to reference value by taking in consideration actual reference value.
 * For example, element should be 50px wide on screen wide 375px. If screen actual size is wider
 * then planned everything is going to be scaled up and vice versa.
 * @param dimension - wanted value for reference
 * @param originalRefVal - wanted value reference
 * @param actualRefVal - actual reference value
 * @returns {number}
 */
export function getSizeRelativeToReference(
  dimension,
  originalRefVal,
  actualRefVal
) {
  return dimension / originalRefVal * actualRefVal;
}
export function dimensionRelativeToIphone(
  dimension,
  actualRefVal = window.width
) {
  // 375 is iPhone width
  return getSizeRelativeToReference(dimension, 375, actualRefVal);
}
