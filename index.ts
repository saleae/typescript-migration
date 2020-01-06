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

type ArrayType<A> = A extends (infer T)[] ? T : A;

/**
 * Shallow union Initial and Change giving Change prioirty.
 *
 * If the type is defined on both Intial and Change the type from
 * change will be used.
 */
export type Current<Initial, Change> = NotNever<
  OldMinusNew<Initial, Change> & New<Change>
>;

export type ShallowUnion<Initial, Change> = Current<Initial, Change>;

type New<Change> = {
  [T in keyof Change]: Change[T];
};

export type OldMinusNew<Initial, Change> = {
  [D in Exclude<keyof Initial, keyof Change>]: Initial[D];
};

/**
 *  Remove keys that were set to never from the type
 */
export type NotNever<T> = Omit<T, JustNeverKeys<T>>;
export type JustNeverKeys<T> = {
  [P in keyof T]: T[P] extends never ? P : never;
}[keyof T];
