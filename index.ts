import { DeepCurrent } from "./model";

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
  version: string;
  numChannels: {
    analog: number;
    digital: number;
  };
}

// Deep merge the types to get V2
type V2 = DeepCurrent<V1, DeltaV2>;

/**
 * Transform a V1 config into a V2 config
 * @param config {V1} config
 * @returns {V2} a new V2 config
 */
const initialToV2 = (config: V1): V2 => {
  return {
    ...config,
    version: [config.version.major, config.version.minor].join("."),
    numChannels: {
      analog: 0,
      digital: 0
    }
  };
};

// display the result
console.log(initialToV2(initialConfig));
