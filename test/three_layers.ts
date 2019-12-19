import { DeepUnion } from "..";

interface Base {
  users: number;
}

// change from primitive to array of primiive
interface DeltaV1 {
  users: string[];
}
type V1 = DeepUnion<Base, DeltaV1>;

// change from array of primitive to collection
interface DeltaV2 {
  users: { name: string; id: number }[];
}
type V2 = DeepUnion<V1, DeltaV2>;

// add nested object while deleting a key
interface DeltaV3 {
  users: {
    id: never;
    name: string;
    posts: { title: string; likes: number }[];
  }[];
}
type V3 = DeepUnion<V2, DeltaV3>;

// back to primitive
interface DeltaV4 {
  users: number;
}
type V4 = DeepUnion<V3, DeltaV4>;

const a: V1 = {
  users: ["hi"]
};

const b: V2 = {
  users: [
    { name: "hi", id: 1 },
    { name: "test", id: 3 }
  ]
};

const c: V3 = {
  users: [
    {
      name: "user1",
      posts: [
        { title: "hi", likes: 1 },
        { title: "hi", likes: 2 }
      ]
    },
    {
      name: "user1",
      posts: [
        { title: "hi", likes: 3 },
        { title: "hi", likes: 75 }
      ]
    }
  ]
};

const d: V4 = {
  users: 10
};
