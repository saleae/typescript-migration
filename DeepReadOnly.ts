export declare type SetIntersection<A, B> = A extends B ? A : never;
export declare type SetDifference<A, B> = A extends B ? never : A;
export declare type SetComplement<A, A1 extends A> = SetDifference<A, A1>;
export declare type SymmetricDifference<A, B> = SetDifference<A | B, A & B>;
export declare type NonUndefined<A> = A extends undefined ? never : A;
export declare type FunctionKeys<T extends object> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
export declare type NonFunctionKeys<T extends object> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
export declare type Omit<T extends object, K extends keyof T> = T extends any
  ? Pick<T, SetDifference<keyof T, K>>
  : never;
export declare type PickByValue<T, ValueType> = Pick<
  T,
  {
    [Key in keyof T]: T[Key] extends ValueType ? Key : never;
  }[keyof T]
>;
export declare type OmitByValue<T, ValueType> = Pick<
  T,
  {
    [Key in keyof T]: T[Key] extends ValueType ? never : Key;
  }[keyof T]
>;
export declare type Intersection<
  T extends object,
  U extends object
> = T extends any ? Pick<T, SetIntersection<keyof T, keyof U>> : never;
export declare type Diff<T extends object, U extends object> = Pick<
  T,
  SetDifference<keyof T, keyof U>
>;
export declare type Subtract<T extends T1, T1 extends object> = Pick<
  T,
  SetComplement<keyof T, keyof T1>
>;
export declare type Overwrite<
  T extends object,
  U extends object,
  I = Diff<T, U> & Intersection<U, T>
> = Pick<I, keyof I>;
export declare type Assign<
  T extends object,
  U extends object,
  I = Diff<T, U> & Intersection<U, T> & Diff<U, T>
> = Pick<I, keyof I>;
export declare type Exact<A extends object> = A & {
  __brand: keyof A;
};
export declare type Unionize<T extends object> = {
  [P in keyof T]: {
    [Q in P]: T[P];
  };
}[keyof T];
export declare type PromiseType<T extends Promise<any>> = T extends Promise<
  infer U
>
  ? U
  : never;
export declare type DeepReadonly<T> = T extends (...args: any[]) => any
  ? T
  : T extends any[]
  ? _DeepReadonlyArray<T[number]>
  : T extends object
  ? _DeepReadonlyObject<T>
  : T;
export interface _DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}
export declare type _DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
export declare type DeepRequired<T> = T extends (...args: any[]) => any
  ? T
  : T extends any[]
  ? _DeepRequiredArray<T[number]>
  : T extends object
  ? _DeepRequiredObject<T>
  : T;
export interface _DeepRequiredArray<T>
  extends Array<DeepRequired<NonUndefined<T>>> {}
export declare type _DeepRequiredObject<T> = {
  [P in keyof T]-?: DeepRequired<NonUndefined<T[P]>>;
};
export declare type DeepNonNullable<T> = T extends (...args: any[]) => any
  ? T
  : T extends any[]
  ? _DeepNonNullableArray<T[number]>
  : T extends object
  ? _DeepNonNullableObject<T>
  : T;
export interface _DeepNonNullableArray<T>
  extends Array<DeepNonNullable<NonNullable<T>>> {}
export declare type _DeepNonNullableObject<T> = {
  [P in keyof T]-?: DeepNonNullable<NonNullable<T[P]>>;
};
export declare type DeepPartial<T> = T extends Function
  ? T
  : T extends Array<infer U>
  ? _DeepPartialArray<U>
  : T extends object
  ? _DeepPartialObject<T>
  : T | undefined;
export interface _DeepPartialArray<T> extends Array<DeepPartial<T>> {}
export declare type _DeepPartialObject<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
