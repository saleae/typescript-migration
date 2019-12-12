import { DeepUnion } from ".";

// Define initial type and sub types
interface V1 {
  version: {
    major: number;
    minor: number;
  };
  analzyers: Analyzer[];
}

interface Analyzer {
  id: number;
  type: "serial" | "spi" | "can";
}

// Setup an example instance of the initialConfig
const initialConfig: V1 = {
  version: { major: 1, minor: 1 },
  analzyers: [
    {
      id: 1,
      type: "can"
    }
  ]
};

// Define the changes as the delth between V1 and V2
interface DeltaV2 {
  version: never;
  numChannels: {
    analog: number;
    digital: number;
    meta: {
      label: string;
    };
  };
}

// Deep merge the types to get V2
type V2 = DeepUnion<V1, DeltaV2>;

/**
 * Transform a V1 config into a V2 config
 * @param {V1} config config
 * @returns {V2} a new V2 config
 */
const initialToV2 = (config: V1): V2 => {
  const { version, ...rest } = config;
  return {
    ...rest,
    numChannels: {
      analog: 0,
      digital: 0,
      meta: {
        label: "hi"
      }
    }
  };
};

interface DeltaV3 {
  numChannels: {
    meta: {
      label: number;
    };
  };
}

type V3 = DeepUnion<V2, DeltaV3>;

const v2ToV3 = (config: V2): V3 => {
  return {
    ...config,
    numChannels: {
      ...config.numChannels,
      meta: {
        label: 1
      }
    }
  };
};

// display the result
console.log(v2ToV3(initialToV2(initialConfig)));
