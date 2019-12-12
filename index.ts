import { DeepCurrent } from "./model";

interface Analyzer {
  id: number;
  type: "serial" | "spi" | "can";
}

interface InitialSaveConfig {
  version: {
    major: number;
    minor: number;
  };
  analzyers: Analyzer[];
}

const initialConfig: InitialSaveConfig = {
  version: { major: 1, minor: 1 },
  analzyers: [
    {
      id: 1,
      type: "can"
    }
  ]
};

interface DeltaV2 {
  version: string;
  numChannels: {
    analog: number;
    digital: number;
  };
}

type V2 = DeepCurrent<InitialSaveConfig, DeltaV2>;

const initialToV2 = (config: InitialSaveConfig): V2 => {
  return {
    ...config,
    version: [config.version.major, config.version.minor].join("."),
    numChannels: {
      analog: 0,
      digital: 0
    }
  };
};

console.log(initialToV2(initialConfig));
