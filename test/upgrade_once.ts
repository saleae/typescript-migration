// Start 1
import { DeepUnion } from "..";

// setup the base type
interface Base {
  version: number;
  config: {
    users: string[];
    apiEndpoint: string;
  };
}

// add a software version key
interface V2Changeset {
  softwareVersion: {
    minor: number;
    major: number;
  };
}

type V2 = DeepUnion<Base, V2Changeset>;

// Start 2
interface Version {
  1: Base;
  2: V2;
}

type AnyVersion = Base | V2;
type LatestVersion = V2;

// upgrade function
const v1ToV2 = (config: Base): V2 => ({
  ...config,
  // update version id
  version: 2,
  softwareVersion: {
    major: 0,
    minor: 0
  }
});

// type predicate based on version number
const isVersion = <T extends keyof Version>(
  config: AnyVersion,
  version: T
): config is Version[T] => {
  return config.version === version;
};

// upgrade to the latest version
const upgradeToCurrent = (config: AnyVersion): LatestVersion => {
  if (isVersion(config, 2)) return config;
  else if (isVersion(config, 1)) return upgradeToCurrent(v1ToV2(config));

  // if not version 1 then it's version 2
  throw new Error(
    "Config cannot be upgraded to current version, please add new upgrade utility."
  );
};
