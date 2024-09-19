import { Constructor } from '../typings'

/**
 * Checks the type of the operand's value is equals to param's.
 *
 * @param type Should be a to string literal.
 */
function typeOf<Type> (type: string) {
  return function (param: Type): param is Type {
    // eslint-disable-next-line valid-typeof
    return typeof param === type
  }
}

/**
 * Checks if the param is an instance of the class type passed.
 *
 * @param type The constructor of a class.
 */
function instanceOf<Type> (type: Constructor<Type>) {
  return function (param: any): param is Type {
    return param instanceof type
  }
}

/**
 * Turns a value into its boolean equivalent.
 *
 * @param param The unknown value.
 */
function isTruthy (param: any) {
  return Boolean(param)
}

/**
 * Turns a value into its boolean equivalent and return true if it is false.
 *
 * @param param The unknown value.
 */
function isFalsy (param: any) {
  return !isTruthy(param)
}

/**
 * Checks if the input is a number.
 *
 * @param param The unknown value.
 */
function isNumber (param: any): param is number {
  return typeOf<number>('number')(param) && !isNaN(param)
}

/**
 * Checks if the input is a string.
 *
 * @param param The unknown value.
 */
function isString (param: any): param is string {
  return typeOf('string')(param)
}

/**
 * Checks if the input is a boolean.
 *
 * @param param The unknown value.
 */
function isBoolean (param: any): param is boolean {
  return typeOf('boolean')(param)
}

/**
 * Checks if the input is undefined.
 *
 * @param param The unknown value.
 */
function isUndefined (param: any): param is undefined {
  return typeOf('undefined')(param)
}

/**
 * Checks if the input is defined.
 *
 * @param param The unknown value.
 */
function isDefined (param: any): param is any {
  return isFalsy(isUndefined(param))
}

/**
 * Checks if the input is null.
 *
 * @param param The unknown value.
 */
function isNull (param: any): param is null {
  return param === null
}

/**
 * Checks if a value is between parameter x and y. Order of x and y deosnt matter.
 *
 * @param x The first value in the range.
 * @param y The second value in the range.
 */
function inRange (x: number, y: number) {
  return function (params: any) : params is number {
    return isNumber(params) && (params >= Math.min(x, y) && params <= Math.max(x, y))
  }
}

/**
 * Checks if the input is a finite number.
 *
 * @param param The unknown value.
 */
function isFiniteNumber (param: any): param is number {
  return isNumber(param) && !isNaN(param) && isFinite(param)
}

/**
 * Checks if the input is an instance of the RegExp class.
 *
 * @param param The unknown value.
 */
function isRegexp<Type extends RegExp> (param: any): param is Type {
  return instanceOf(RegExp)(param)
}

/**
 * Checks if the input is an instance of the Date class.
 *
 * @param param The unknown value.
 */
function isDate<Type extends Date> (param: any): param is Type {
  return instanceOf(Date)(param)
}

/**
 * Checks if the input is an object.
 *
 * @param param The unknown value.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function isObject<Type extends Object> (param: any): param is Type {
  return isFalsy(isNull(param)) && typeOf('object')(param) && isFalsy(instanceOf(Array)(param))
}

/**
 * Checks if the input is a function.
 *
 * @param param The unknown value.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function isFunction<Type extends Function> (param: any): param is Type {
  return typeOf('function')(param)
}

/**
 * Checks if the first parameter is equivalent to the second.
 *
 * @param param The first parameter.
 */
function is (param: any) {
  return function (params: number | string) {
    return param === params
  }
}

const { isArray } = Array

export {
  typeOf,
  isBoolean,
  isDefined,
  isFalsy,
  isNumber,
  isString,
  isTruthy,
  isUndefined,
  inRange,
  isRegexp,
  isFiniteNumber,
  instanceOf,
  isNull,
  isObject,
  isFunction,
  isArray,
  isDate,
  is
}
