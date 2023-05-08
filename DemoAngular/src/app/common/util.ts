
/**
 * check param is empty
 */
export function isEmpty(param: any, checkPropertyEmpty = false): boolean {

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
 * check param is not empty
 */
export function isNotEmpty(param: any, checkPropertyEmpty = false): boolean {
  return !isEmpty(param, checkPropertyEmpty);
}

/**
 * find max value in array
 */
export function findMax(array: number[]): number | undefined {
  if (isEmpty(array)) {
    return undefined;
  }
  return array.reduce((cur, acc) => cur > acc ? cur : acc);
}

/**
 * find min value in array
 */
export function findMin(array: number[]): number | undefined {
  if (isEmpty(array)) {
    return undefined;
  }
  return array.reduce((cur, acc) => cur < acc ? cur : acc);
}

/**
 * sum the input numbers
 * ps. if the element in the input numbers cannot parse to number
 *     then it will be considered 0
 */
export function sum(...nums: any[]): number {
  return nums.reduce((acc, cur) => acc += Number(cur) || 0, 0);
}

/**
 * check str is number
 */
export function isNumber(str: string): boolean {
  return !isNaN(str as any) && !isNaN(parseFloat(str));
}

/**
 * analysis list
 * input:
 *  list: [ {roleId: 'a'}, {roleId: 'a'}, {roleId: 'a'}, {roleId: 'b'}, {roleId: 'b'}, {roleId: 'c'} ]
 *  key: roleId
 *  isOutputIdex: true
 * output:
 *  {
 *    a: [0,1,2],
 *    b: [3,4],
 *    c: [5]
 *  }
 */
export function analysisList(list: any[], key: string, isOutputIdex = true): any {
  if (isEmpty(list)) {
    return [];
  }
  return list.reduce((acc, cur, idx) => {
    const serial = isOutputIdex ? idx : idx + 1;
    isEmpty(acc[cur[key]]) ? acc[cur[key]] = [serial] : acc[cur[key]].push(serial);
    return acc;
  }, {});
}

/**
 * convert object to formData
 */
export function object2FormData(obj: { [key: string]: any }, prefiex = ''): FormData {
  const formData = new FormData();
  Object.keys(obj).forEach(key => {
    const newKey = isEmpty(prefiex) ? key : `${prefiex}.${key}`;
    const value = isEmpty(obj[key]) ? '' : obj[key];
    formData.set(newKey, value);
  });
  return formData;
}

/**
 * convert arrayBuffer to json object
 */
export function arrayBuffer2JsonObject(buffer: ArrayBuffer): any {
  const bytes = new Uint8Array(buffer);
  const str = utf8ByteArray2Str(bytes);
  return JSON.parse(str);
}

/**
 * convert utf8 byte array to string
 */
export function utf8ByteArray2Str(bytes: Uint8Array): string {
  const length = bytes.byteLength;
  let str = '';

  for (let i = 0; i < length; i++) {
    const value = bytes[i];

    if (value < 0x80) {
      str += String.fromCharCode(value);
    } else if (value > 0xBF && value < 0xE0) {
      // tslint:disable-next-line: no-bitwise
      str += String.fromCharCode((value & 0x1F) << 6 | bytes[i + 1] & 0x3F);
      i += 1;
    } else if (value > 0xDF && value < 0xF0) {
      // tslint:disable-next-line: no-bitwise
      str += String.fromCharCode((value & 0x0F) << 12 | (bytes[i + 1] & 0x3F) << 6 | bytes[i + 2] & 0x3F);
      i += 2;
    } else {
      // tslint:disable-next-line: no-bitwise
      const charCode = ((value & 0x07) << 18 | (bytes[i + 1] & 0x3F) << 12 | (bytes[i + 2] & 0x3F) << 6 | bytes[i + 3] & 0x3F) - 0x010000;
      // tslint:disable-next-line: no-bitwise
      str += String.fromCharCode(charCode >> 10 | 0xD800, charCode & 0x03FF | 0xDC00);
      i += 3;
    }
  }

  return str;
}

/**
 * trim file extension
 * input:
 *  a.b.c.txt
 * output:
 *  a.b.c
 */
export function trimFileExtension(fileName: string): string {
  return fileName.split('.').slice(0, -1).join('.');
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