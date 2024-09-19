/* eslint-disable @typescript-eslint/ban-types */
export type Constructor<C> = new (...args: any[]) => C

export type ConditionFunction<TParam, TGuarded extends TParam = TParam> =
  | ((param: TParam) => param is TGuarded)
  | ((param: TParam) => boolean);

export type ConditionObject<TParam, TGuarded extends TParam = Partial<TParam>> = {
  // eslint-disable-next-line no-use-before-define
  [K in keyof TGuarded]: Condition<TParam[K], TGuarded[K]>;
};

export type Condition<TParam, TGuarded extends TParam = TParam> =
  | ConditionFunction<TParam, TGuarded>
  | ConditionObject<TParam, TGuarded>;

export type Cases<TParam, TGuarded extends TParam, TResult> = {
  condition: Condition<TParam, TGuarded>;
  callback: (param: TGuarded) => TResult;
}
