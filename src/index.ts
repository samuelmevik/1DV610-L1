import { is, isArray, isFunction, isObject, isString } from "./guards.js";
import { Cases, Condition, ConditionFunction, ConditionObject } from "./typings";

const { keys } = Object

function patternMatch(param: any) {
    return function (...cases: Cases[]) {
        return cases.find(({ condition }) => checkCondition(condition, param))?.callback()
    }
}

function checkCondition(condition: Condition, param: any) : boolean {
    if (isObject<ConditionObject>(condition)) {
        return keys(condition).every(key => checkCondition(condition[key], param[key]))
    }
    else if (isFunction<ConditionFunction>(condition)) {
        return condition(param)
    }
    return false
}


function when (condition: Condition, callback: Function) {
    return ({
        condition,
        callback
    })
}

function otherWise (callback: Function) {
    return when(() => true, callback)
}



