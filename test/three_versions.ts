import { DeepUnion } from "..";

interface Base {
  version: number;
  config: {
    users: string[];
    apiEndpoint: string;
  };
}

interface V2Changeset {
  version: {
    major: number;
    minor: number;
  };
}

interface V3Changeset {
  config: {
    users: { name: string; id: number }[];
  };
}

export type V2 = DeepUnion<Base, V2Changeset>;
export type V3 = DeepUnion<V2, V3Changeset>;

const version2: V2 = {
  // check for type munging
  version: {
    major: 1,
    minor: 2
  },
  config: {
    users: ["user1", "user2"],
    apiEndpoint: "test"
  }
};

const version3: V3 = {
  version: {
    major: 0,
    minor: 0
  },
  config: {
    apiEndpoint: "test",
    users: [{ name: "hi", id: 1 }]
  }
};
