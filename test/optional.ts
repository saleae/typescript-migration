import { DeepUnion } from "..";
import { DeepReadonly } from "../DeepReadOnly";

export interface AnalyzersObj {
  [nodeId: number]: BaseAnalyzer;
}

// common types
export type ChannelType = "Digital" | "Analog";
export interface Channel {
  type: ChannelType;
  index: number;
}

export type AnalyzerSettings = AnalyzerSetting[];

export const DISPLAY_RADIX = [
  "Binary",
  "Decimal",
  "Hexadecimal",
  "Ascii",
  "AsciiHex"
] as const;
export type DisplayRadix = typeof DISPLAY_RADIX[number];

export interface BaseAnalyzer {
  settings: AnalyzerSettings;
  name: string;
  type: string;
  nodeId: number;
  portIndex: number;
  color: string;
  status: "new" | "existing";
  showInDataTable: boolean;
  streamToTerminal: boolean;
  displayRadix: DisplayRadix;
  channelsWithBubbles: Channel[];
  channelsWithMarkers: Channel[];
  subscriptions: number[];
  defaultSettings: AnalyzerSettings;
}

interface AnalyzerChannelSetting {
  type: "Channel";
  channelRequired: boolean;
  value?: number;
}

interface AnalyzerNumberListOption {
  dropdownText: string;
  dropdownTooltip?: string; // subtext
  value: number;
}

interface AnalyzerNumberListSetting {
  type: "NumberList";
  options: AnalyzerNumberListOption[];
  value: number;
}

interface AnalyzerIntegerSetting {
  type: "Integer";
  minimumValue: number;
  maximumValue: number;
  value: number;
}

interface AnalyzerTextSetting {
  type: "Text";
  textType: "NormalText";
  value: string;
}

interface AnalyzerBoolSetting {
  type: "Bool";
  checkboxText: string;
  value: boolean;
}

export type AllAnalyzerSettingsTypes =
  | AnalyzerChannelSetting
  | AnalyzerNumberListSetting
  | AnalyzerIntegerSetting
  | AnalyzerTextSetting
  | AnalyzerBoolSetting;

export interface AnalyzerSetting {
  title: string;
  tooltip?: string;
  setting: AllAnalyzerSettingsTypes;
}

export interface SessionV1 {
  analyzers: AnalyzersObj;
}

export interface SessionV2Delta {
  test: string;
}

type SessionV2 = DeepUnion<SessionV1, SessionV2Delta>;

export interface MetaFileV1 {
  session: DeepReadonly<SessionV1>;
}

interface MetaFileDeltaV2 {
  session: DeepReadonly<SessionV2>;
}

export type MetaFileV2 = DeepUnion<MetaFileV1, MetaFileDeltaV2>;

// the latest version of MetaFile
export type MetaFile = MetaFileV2;

interface Base {
  // This is the new MetaFile type
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
  c?: {
    a: boolean[];
  };
}
type V3 = DeepUnion<V2, DeltaV3>;

interface DeltaV4 {
  c?: {
    a?: boolean[];
  }[];
  d: {
    a: {
      x: {}[];
      z: number[];
    }[];
  };
  session: DeepReadonly<SessionV1>;
}
type V4 = DeepUnion<V3, DeltaV4>;

interface DeltaV5 {
  d: {
    a: DeepReadonly<{
      x?: {}[];
      z: number[];
    }>[];
  };
  session: DeepReadonly<SessionV2>;
}
type V5 = DeepUnion<V4, DeltaV5>;

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

const v4: V4 = {
  a: 1,
  b: "hi",
  d: {
    a: [
      {
        z: [1],
        x: [{}]
      }
    ]
  },
  session: {
    analyzers: {
      0: {
        channelsWithMarkers: [],
        defaultSettings: [],
        settings: [],
        showInDataTable: true,
        status: "existing",
        subscriptions: [],
        channelsWithBubbles: [],
        color: "red",
        displayRadix: "Ascii",
        name: "",
        nodeId: 1,
        portIndex: 1,
        streamToTerminal: false,
        type: ""
      }
    }
  }
};

const v5: V5 = {
  a: 1,
  b: "hi",
  c: [{}],
  d: {
    a: [
      {
        z: [1],
        x: [{}]
      }
    ]
  },
  session: {
    test: "",
    analyzers: {
      0: {
        channelsWithMarkers: [],
        defaultSettings: [],
        settings: [],
        showInDataTable: true,
        status: "existing",
        subscriptions: [],
        channelsWithBubbles: [],
        color: "red",
        displayRadix: "Ascii",
        name: "",
        nodeId: 1,
        portIndex: 1,
        streamToTerminal: false,
        type: ""
      }
    }
  }
};

const a: DeepReadonly<AnalyzersObj[]> = Object.values(v5.session.analyzers);

const dV5: DeepReadonly<V5[]> = [
  {
    a: 1,
    b: "hi",
    c: [{}],
    d: {
      a: [
        {
          z: [1],
          x: [{}]
        }
      ]
    },
    session: {
      test: "",
      analyzers: {
        0: {
          channelsWithMarkers: [],
          defaultSettings: [],
          settings: [],
          showInDataTable: true,
          status: "existing",
          subscriptions: [],
          channelsWithBubbles: [],
          color: "red",
          displayRadix: "Ascii",
          name: "",
          nodeId: 1,
          portIndex: 1,
          streamToTerminal: false,
          type: ""
        }
      }
    }
  }
];

const file: MetaFile = {
  session: {
    test: "",
    analyzers: {
      0: {
        channelsWithMarkers: [],
        defaultSettings: [],
        settings: [],
        showInDataTable: true,
        status: "existing",
        subscriptions: [],
        channelsWithBubbles: [],
        color: "red",
        displayRadix: "Ascii",
        name: "",
        nodeId: 1,
        portIndex: 1,
        streamToTerminal: false,
        type: ""
      }
    }
  }
};

const aa: DeepReadonly<AnalyzersObj[]> = Object.values(file.session.analyzers);
