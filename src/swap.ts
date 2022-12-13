import { Component } from "preact";
import {
  loadLocalStyle,
  loadLocalEffect,
  createReferenceName,
} from "./utility/style";
import { ReferenceStyle } from "./utility/style";

let dayFolder = "Day";
let nightFolder = "Night";

const storageKeys = {
  DAY: "dayFromStorage",
  NIGHT: "nightFromStorage",
};

const initPlugin = async () => {
  let dayFolderStorage = await figma.clientStorage.getAsync(storageKeys.DAY);
  let nightFolderStorage = await figma.clientStorage.getAsync(
    storageKeys.NIGHT
  );

  if (typeof dayFolderStorage === "undefined") {
    await figma.clientStorage.setAsync(storageKeys.DAY, dayFolder);
  } else {
    dayFolder = dayFolderStorage;
  }
  if (typeof nightFolderStorage == "undefined") {
    await figma.clientStorage.setAsync(storageKeys.NIGHT, nightFolder);
  } else {
    dayFolder = dayFolderStorage;
  }
};

const setDayFolder = async (name: string) => {
  console.log("day x");
  await figma.clientStorage.setAsync(storageKeys.DAY, name);
  dayFolder = name;
};

const setNightFolder = async (name: string) => {
  console.log("night x");
  await figma.clientStorage.setAsync(storageKeys.NIGHT, name);
  nightFolder = name;
};

const getDayFolder = (): string => {
  return dayFolder;
};

const getNightFolder = (): string => {
  return nightFolder;
};

const walkNodes = (nodes: readonly SceneNode[], callback?: Function) => {
  let node;
  let stop = false;

  nodes.forEach((node) => {
    if (callback) {
      stop = callback(node);
    }
    if (
      node.type == "FRAME" ||
      node.type == "GROUP" ||
      node.type == "COMPONENT" ||
      node.type == "INSTANCE" ||
      node.type == "SECTION"
    ) {
      if (node.children) {
        walkNodes(node.children, callback);
      }
    }
  });
};

const searchStyle = (
  styles: ReferenceStyle[],
  ref: string
): string | undefined => {
  let id = undefined;
  for (const style of styles) {
    if (style.refName === ref) {
      id = style.id;
      break;
    }
  }
  return id;
};

const nodeWithSimpleFillAndStroke = (
  node: SceneNode | PageNode
): FrameNode | ComponentNode | undefined => {
  if (
    (node.type == "FRAME" ||
      node.type == "COMPONENT" ||
      node.type == "INSTANCE" ||
      node.type == "RECTANGLE" ||
      node.type == "ELLIPSE" ||
      node.type == "POLYGON" ||
      node.type == "STAR" ||
      node.type == "LINE" ||
      node.type == "TEXT" ||
      node.type == "VECTOR" ||
      node.type == "BOOLEAN_OPERATION") &&
    node.fillStyleId !== figma.mixed
  ) {
    return <FrameNode>node;
  }
  return undefined;
};

const textNodeWithComplexFillAndStroke = (
  node: SceneNode | PageNode
): TextNode | undefined => {
  if (node.type == "TEXT" && node.fillStyleId == figma.mixed) {
    return <TextNode>node;
  } else {
    return undefined;
  }
};

const swapEffect = (
  frame: FrameNode | ComponentNode | TextNode,
  localStyle: ReferenceStyle[]
) => {
  if (frame.effectStyleId) {
    const style = figma.getStyleById(frame.effectStyleId);
    if (style?.name) {
      const refName = createReferenceName(style.name);
      const newId = searchStyle(localStyle, refName);
      if (newId) {
        frame.effectStyleId = newId;
      }
    }
  }
};

const swapFill = (
  frame: FrameNode | ComponentNode,
  localStyle: ReferenceStyle[]
) => {
  if (frame.fillStyleId !== figma.mixed && frame.fillStyleId) {
    const style = figma.getStyleById(frame.fillStyleId);
    if (style?.name) {
      const refName = createReferenceName(style.name);
      const newId = searchStyle(localStyle, refName);
      if (newId) {
        frame.fillStyleId = newId;
      }
    }
  }
};

const swapStroke = (
  frame: FrameNode | ComponentNode | TextNode,
  localStyle: ReferenceStyle[]
) => {
  if (frame.strokeStyleId) {
    const style = figma.getStyleById(frame.strokeStyleId);
    if (style?.name) {
      const refName = createReferenceName(style.name);
      const newId = searchStyle(localStyle, refName);
      if (newId) {
        frame.strokeStyleId = newId;
      }
    }
  }
};

const swapMixTextFill = (textNode: TextNode, localStyle: ReferenceStyle[]) => {
  if (textNode.fillStyleId == figma.mixed) {
    textNode.getStyledTextSegments(["fillStyleId"]).forEach((segment) => {
      if (segment.fillStyleId) {
        const style = figma.getStyleById(segment.fillStyleId);
        if (style?.name) {
          const refName = createReferenceName(style.name);
          const newId = searchStyle(localStyle, refName);
          if (newId) {
            textNode.setRangeFillStyleId(segment.start, segment.end, newId);
          }
        }
      }
    });
  }
};

const swapNodeTheme = (
  node: SceneNode | PageNode,
  localStyle: ReferenceStyle[],
  localEffect: ReferenceStyle[]
) => {
  const frame = nodeWithSimpleFillAndStroke(node);
  if (frame) {
    swapFill(frame, localStyle);
    swapStroke(frame, localStyle);
    swapEffect(frame, localEffect);
  }
  const textNode = textNodeWithComplexFillAndStroke(node);
  if (textNode) {
    swapMixTextFill(textNode, localStyle);
    swapStroke(textNode, localStyle);
    swapEffect(textNode, localEffect);
  }
};

const swapTheme = (theme: string) => {
  const targetTheme = loadLocalStyle(theme);
  const targetEffect = loadLocalEffect(theme);
  const selected = figma.currentPage.selection;
  walkNodes(selected, (node: SceneNode | PageNode) => {
    swapNodeTheme(node, targetTheme, targetEffect);
  });
};

const swapToDay = () => {
  swapTheme(dayFolder);
  figma.closePlugin(`close: swap to ${dayFolder}`);
};

const swapToNight = () => {
  swapTheme(nightFolder);
  figma.closePlugin(`close: swap to ${nightFolder}`);
};

const justSwapToDay = () => {
  swapTheme(dayFolder);
  figma.notify(`Swap to Day 🌞`);
};

const justSwapToNight = () => {
  swapTheme(nightFolder);
  figma.notify(`Swap to Night 🌝`);
};

export {
  swapToDay,
  swapToNight,
  initPlugin,
  justSwapToDay,
  justSwapToNight,
  setDayFolder,
  setNightFolder,
  getDayFolder,
  getNightFolder,
};

// For testing
export { walkNodes, swapNodeTheme };
