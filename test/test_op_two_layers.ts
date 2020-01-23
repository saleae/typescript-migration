import { ShallowUnion, DeepUnion } from "../";

interface V1 {
  name?: string;
  id: number;
}

interface V2Delta {
  name?: string[];
}

interface V3Delta {
  id: number[];
}

type FinalVersion = ShallowUnion<ShallowUnion<V1, V2Delta>, V3Delta>;

// expect name to be optional
const final: FinalVersion = {
  id: [1, 2, 3, 4]
};
