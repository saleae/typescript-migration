type New<Change> = {
  [C in keyof Change]: Change[C];
};

type OldMinusNew<Initial, Change> = {
  [D in Exclude<keyof Initial, keyof Change>]: Initial[D];
};

/**
 * Shallow union Initial and Change giving Change prioirty.
 *
 * If the type is defined on both Intial and Change the type from
 * change will be used.
 */
type Current<Initial, Change> = New<Change> & OldMinusNew<Initial, Change>;

/**
 * Deep union types Initial and Change and give priority to Change.
 *
 * Change is defined as the difference between the Initial interface
 * and the new version of the interface
 *
 * Currently Functions are not supported.
 */
export type DeepCurrent<Initial, Change> = {
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
      ? Current<Initial[KEY], Change[KEY]>
      : Change[KEY]
    : KEY extends keyof Initial
    ? Initial[KEY]
    : never;
};
