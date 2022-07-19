/**
 * check if param is empty
 */
export function isEmpty(param, checkPropertyEmpty = false): boolean {

  // null and undefined are "empty"
  if (param == null) { return true; }

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (param.length > 0) { return false; }
  if (param.length === 0) { return true; }

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof param !== 'object') { return false; }

  return checkPropertyEmpty
    ? Object.keys(param).length === 0 || !Object.keys(param).some(property => isNotEmpty(param[property], true))
    : Object.keys(param).length === 0;
}

/**
 * check if param is not empty
 */
export function isNotEmpty(param, checkPropertyEmpty = false): boolean {
  return !isEmpty(param, checkPropertyEmpty);
}

/**
 * check if param is number
 */
export function isNumber(param): boolean {
  return !isNaN(param);
}

/**
 * check if param is not number
 */
export function isNotNumber(param): boolean {
  return !isNumber(param);
}

/**
 * convert param to number
 */
export function toNumber(param, numberWhenFail = 0): number {
  return isNumber(param) ? param * 1 : numberWhenFail;
}

/**
 * in array, move item from oldIndex to newIndex
 * input:
 *  array: [ 0, 1, 2, 3, 4, 5 ]
 *  oldIndex: 3
 *  newIndex: 2
 * result:
 *  array: [ 0, 1, 3, 2, 4, 5 ]
 */
export function moveItem(array: any[], oldIndex: number, newIndex: number): void {
  if (isInvalidIndex(array, oldIndex)) {
    throw new Error(`invliad oldIndex ${oldIndex}`);
  }
  if (isInvalidIndex(array, newIndex)) {
    throw new Error(`invliad newIndex ${newIndex}`);
  }
  const item = array.splice(oldIndex, 1)[0];
  array.splice(newIndex, 0, item);
}

/**
 * in array, check index is valid
 */
export function isValidIndex(array: any[], index: number): boolean {
  return index >= 0 && index <= array.length - 1;
}

/**
 * in array, check index is invalid
 */
export function isInvalidIndex(array: any[], index: number): boolean {
  return !isValidIndex(array, index);
}

/**
 * remove a character at a certain position in a string
 */
export function removeByIndex(str: string, index: number): string {
  return str.slice(0, index) + str.slice(index + 1);
}

/**
 * StringBuilder
 */
export class StringBuilder {

  private list = [] as string[];

  append(str: string): void {
    this.list.push(str);
  }

  toString(): string {
    return this.list.join(' ');
  }
}
