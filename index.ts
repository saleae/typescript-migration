/**
 * Deep union types Initial and Change and give priority to Change.
 *
 * Change is defined as the difference between the Initial interface
 * and the new version of the interface
 *
 * Currently Functions are not supported.
 */
export type DeepUnion<Initial, Change> = Initial extends number
  ? Change
  : Initial extends boolean
  ? Change
  : Initial extends string
  ? Change
  : Initial extends undefined
  ? Change
  : Initial extends any[]
  ? Change extends any[]
    ? DeepUnion<ArrayType<Initial>, ArrayType<Change>>[]
    : Change
  : Change extends any[]
  ? Change
  : {
      [KEY in keyof Current<Initial, Change>]: Current<
        Initial,
        Change
      >[KEY] extends number
        ? Current<Initial, Change>[KEY]
        : Current<Initial, Change>[KEY] extends string
        ? Current<Initial, Change>[KEY]
        : Current<Initial, Change>[KEY] extends boolean
        ? Current<Initial, Change>[KEY]
        : Current<Initial, Change>[KEY] extends undefined
        ? Current<Initial, Change>[KEY]
        : KEY extends keyof Change
        ? KEY extends keyof Initial
          ? Current<Initial, Change>[KEY] extends any[]
            ? DeepUnion<ArrayType<Initial[KEY]>, ArrayType<Change[KEY]>>[]
            : DeepUnion<Initial[KEY], Change[KEY]>
          : Change[KEY]
        : KEY extends keyof Initial
        ? Initial[KEY]
        : never;
    };

// mapped type for readability
export type ShallowUnion<Initial, Change> = {
  [key in keyof Current<Initial, Change>]: Current<Initial, Change>[key];
};

type ArrayType<A> = A extends (infer T)[] ? T : A;

/**
 * Shallow union Initial and Change giving Change prioirty.
 *
 * If the type is defined on both Intial and Change the type from
 * change will be used.
 */
export type Current<Initial, Change> = NotNever<
  Optional<OldMinusNew<Initial, Change>> & New<Change>
>;

type New<Change> = Change;

export type OldMinusNew<Initial, Change> = Pick<
  Initial,
  Exclude<keyof Initial, keyof Change>
>;

/**
 *  Remove keys that were set to never from the type
 */
export type NotNever<T> = Omit<T, JustNeverKeys<T>>;
export type JustNeverKeys<T> = {
  [P in keyof T]: T[P] extends never ? P : never;
}[keyof T];

type OptionalPropertyOf<T extends object> = Exclude<
  {
    [K in keyof T]: T extends Record<K, T[K]> ? never : K;
  }[keyof T],
  undefined
>;
type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type Optional<T> = T extends object
  ? WithOptional<T, OptionalPropertyOf<T>>
  : T;
