type ExtractAction<Reducer> = Reducer extends (s: any, a: infer Action) => any
  ? Action
  : never;

type ActionTypesHelper<T> = { [K in keyof T]: ActionTypes<T[K]> };
// prettier-ignore
export type ActionTypes<ReducerOrObj> =
  ReducerOrObj extends (...args: any[]) => any
    ? ExtractAction<ReducerOrObj>
    : ReducerOrObj extends object
    ? ActionTypesHelper<ReducerOrObj>[keyof ReducerOrObj]
    : never;
