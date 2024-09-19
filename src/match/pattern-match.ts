import { isArray, isFunction, isObject } from './guards.js'
import { Condition, Cases, ConditionFunction } from '../typings'

const { keys } = Object

/**
 * Checks if param matches with a pre defined pattern.
 *
 * @param param Accepts nested objects, arrays, numbers and strings.
 */
function patternMatch<TParam> (param: TParam) {
  return function<TResult> (
    ...cases: Cases<TParam, any, TResult>[]
  ): TResult | undefined {
    for (const { condition, callback } of cases) {
      const result = checkCondition(condition, param)
      if (result !== null) {
        return callback(result)
      }
    }
    return undefined
  }
}

/**
 * Validates a condition.
 *
 * @param condition Needs to be a function or a object whose end value is a function. The function needs to return a boolean.
 * @param param Accepts nested objects, arrays, numbers and strings.
 */
function checkCondition<TParam, TGuarded extends TParam> (
  condition: Condition<TParam, TGuarded>,
  param: TParam
): param is TGuarded {
  if (isFunction(condition)) {
    return condition(param)
  } else if (isObject(condition)) {
    return (keys(condition) as (keyof TParam)[]).every((key) =>
      checkCondition(
        condition[key],
        (param as any)[key]
      )
    )
  }
  return false
}

/**
 * Checks condition.
 *
 * @param condition Needs to be a function or a object whose end value is a function. The function needs to return a boolean.
 * @param callback The callback function runs if the condition is true.
 */
function when<TParam, TGuarded extends TParam, TResult> (condition: Condition<TParam, TGuarded>, callback: (param: TGuarded) => TResult): Cases<TParam, TGuarded, TResult> {
  return ({
    condition,
    callback
  })
}

/**
 * If no condition is met this is a fallback.
 *
 * @param callback Callback runs if there is no true case.
 */
function otherWise<TParam, TResult> (callback: (param: TParam) => TResult): Cases<TParam, TParam, TResult> {
  return when(() => true, callback)
}

/**
 * Checks if all the values in the array matches the condition.
 *
 * @param {...any} conditions Needs to be a function or a object whose end value is a function. The function needs to return a boolean.
 */
function allOf<TParam, TGuarded extends TParam> (...conditions: Condition<TParam, TGuarded>[]): ConditionFunction<TParam, TGuarded> {
  return function (args: any) {
    return isArray(args) && conditions.every(condition => args.every(arg => checkCondition(condition, arg)))
  }
}

/**
 * Checks if any of the values in the array matches the condition.
 *
 * @param {...any} conditions Needs to be a function or a object whose end value is a function. The function needs to return a boolean.
 */
function anyOf<TParam, TGuarded extends TParam> (...conditions: Condition<TParam, TGuarded>[]): ConditionFunction<TParam, TGuarded> {
  return function (args: any) {
    return isArray(args) && conditions.some(condition => args.some(arg => checkCondition(condition, arg)))
  }
}

/**
 * Checks if the array includes a param.
 *
 * @param param Can be anything.
 */
function includes<TParam, TGuarded extends TParam> (param: TParam): ConditionFunction<TParam, TGuarded> {
  return function (args: any) {
    return isArray(args) && args.includes(param)
  }
}

export {
  patternMatch,
  when,
  otherWise,
  allOf,
  anyOf,
  includes
}
