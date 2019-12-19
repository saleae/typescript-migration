# Versioning Typescript Types

At Saleae, we strongly type our save file schema with TypeScript. Types are great for development but make dealing with multiple versions of a schema difficult.

Recently we implemented backward compatibility for our save files and found an elegant solution to versioning types. We're proud of our solution and would love to share it with you.

## Big Ugly Files: The Naive Solution

It's possible to solve this problem by typing each of the possible versions and writing upgrade functions to move from version to version. This architecture would be okay if our types were simple; however, our types are very intricate, which doesn't play nicely with this solution.

Large files of nested type definitions aren't pretty. In the ideal case, we could define the delta between versions and compute the final version by layering "changes" on top of the initial version, much like how git manages changesets.

## Merging Types: The Elegant Solution

On our search for a better solution, we realized we could define the problem as merging two TypeScript interfaces while giving priority to the changeset. This architecture facilitates the elegant storage of types and concise readability.

Unfortunately, TypeScript doesn't support merging interfaces with overlapping keys natively. To accomplish this type of merge, we built a set of generics.

The main product we expose is the DeepUnion type. The DeepUnion generic receives two types (a) the base type and (b) the changeset. The resulting type can be thought about as the base type when overridden by the changeset.

For example, if both types define a given key, the resulting type utilizes the type from the changeset. To perform a shallow merge, we apply this logic to each key on either type.

To handle nested types, we recursively apply this logic to the root types handling both primitives and nested objects.

You can look at how we do this here: GitHub: Saleae/Typescript-Migration/DeepUnion.

## Handling old schemas: Upgrade Functions

In the initial problem, implementing a versioned save schema, we need to upgrade old types to the latest version of that type. To do this, we utilized type predicates to narrow down the type of a given save file and a set of upgrade functions to bring old schemas up to date.

Sometimes we need to upgrade a file through several versions; to accomplish this, we chain together consecutive upgrade functions.

## How to Use DeepUnion

If you want to use our type versioning system, install our npm module typescript-migration. Here's how to version a complex type with DeepUnion:

```typescript
import { DeepUnion } from "typescript-migration";

// setup the base type
interface Base {
  softwareVersion: number;
  config: {
    users: string[];
    apiEndpoint: string;
  };
}

// update the version key
interface V2Changeset {
  softwareVersion: {
    major: number;
    minor: number;
  };
  version: number;
}

// create the final v2 type
export type V2 = DeepUnion<Base, V2Changeset>;
```

```typescript
// ...types from the last example
interface Version {
  1: Base;
  2: V2;
}

type LatestVersion = V2;

const v1ToV2 = (config: Base): V1 => {
  return {
    ...config,
    softwareVersion: {
      major: config.softwareVersion,
      minor: 0
    },
    version: 2
  };
};

// type predicate based on version number
const isVersion = <T extends keyof Version>(
  config: AnyVersion,
  version: T
): config is Version[T] => {
  return config.version === version;
};

// upgrade to the latest version
export const upgradeToCurrent = (config: AnyVersion): LatestVersion => {
  if (isVersion(config, 2)) return config;
  else if (isVersion(config, 1)) return upgradeToCurrent(v1ToV2(config));

  // if not version 1 then it's version 2
  throw new Error(
    "Config cannot be upgraded to current version, please add new upgrade utility."
  );
};
```
