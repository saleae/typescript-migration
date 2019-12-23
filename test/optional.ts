import { DeepUnion } from "..";

interface Base {
  a: number;
  b: string;
  c: {
    a: boolean[];
  };
}

interface DeltaV2 {
  a?: number;
}
type V2 = DeepUnion<Base, DeltaV2>;

interface DeltaV3 {
  a: number;
  c: {
    a?: boolean[];
  };
}
type V3 = DeepUnion<V2, DeltaV3>;

const base: Base = {
  a: 1,
  b: "b",
  c: {
    a: [true]
  }
};

const v2: V2 = {
  b: "b",
  c: {
    a: [true]
  }
};

const v3: V3 = {
  a: 1,
  b: "hi",
  c: {
    a: [true]
  }
};
