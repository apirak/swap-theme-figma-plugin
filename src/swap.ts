import { Component } from "preact";
import {
  loadLocalStyle,
  loadLocalEffect,
  createReferenceName,
} from "./utility/style";
import { ReferenceStyle } from "./utility/style";

let dayFolder = "Day";
let nightFolder = "Night";
let count = 0;

const storageKeys = {
  DAY: "dayFromStorage",
  NIGHT: "nightFromStorage",
};

const oppositeTheme = (current: string): string => {
  return current == dayFolder ? nightFolder : dayFolder;
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
    nightFolder = nightFolderStorage;
  }
};

const setDayFolder = async (name: string) => {
  await figma.clientStorage.setAsync(storageKeys.DAY, name);
  dayFolder = name;
};

const setNightFolder = async (name: string) => {
  await figma.clientStorage.setAsync(storageKeys.NIGHT, name);
  nightFolder = name;
};

const testSetDayFolder = (name: string) => {
  dayFolder = name;
};

const testSetNightFolder = (name: string) => {
  nightFolder = name;
};

const getDayFolder = (): string => {
  return dayFolder;
};

const getNightFolder = (): string => {
  return nightFolder;
};

const getCount = (): number => {
  return count;
};

const resetCount = () => {
  count = 0;
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
  localStyle: ReferenceStyle[],
  theme: string
) => {
  if (frame.effectStyleId) {
    const style = figma.getStyleById(frame.effectStyleId);
    if (style?.name) {
      const refName = createReferenceName(style.name, oppositeTheme(theme));
      const newId = searchStyle(localStyle, refName);
      if (newId) {
        frame.effectStyleId = newId;
        count++;
      }
    }
  }
};

const swapFill = (
  frame: FrameNode | ComponentNode,
  localStyle: ReferenceStyle[],
  theme: string
) => {
  if (frame.fillStyleId !== figma.mixed && frame.fillStyleId) {
    const style = figma.getStyleById(frame.fillStyleId);
    if (style?.name) {
      const refName = createReferenceName(style.name, oppositeTheme(theme));
      const newId = searchStyle(localStyle, refName);
      if (newId) {
        frame.fillStyleId = newId;
        count++;
      }
    }
  }
};

const swapStroke = (
  frame: FrameNode | ComponentNode | TextNode,
  localStyle: ReferenceStyle[],
  theme: string
) => {
  if (frame.strokeStyleId) {
    const style = figma.getStyleById(frame.strokeStyleId);
    if (style?.name) {
      const refName = createReferenceName(style.name, oppositeTheme(theme));
      const newId = searchStyle(localStyle, refName);
      if (newId) {
        frame.strokeStyleId = newId;
        count++;
      }
    }
  }
};

const swapMixTextFill = (
  textNode: TextNode,
  localStyle: ReferenceStyle[],
  theme: string
) => {
  if (textNode.fillStyleId == figma.mixed) {
    textNode.getStyledTextSegments(["fillStyleId"]).forEach((segment) => {
      if (segment.fillStyleId) {
        const style = figma.getStyleById(segment.fillStyleId);
        if (style?.name) {
          const refName = createReferenceName(style.name, oppositeTheme(theme));
          const newId = searchStyle(localStyle, refName);
          if (newId) {
            textNode.setRangeFillStyleId(segment.start, segment.end, newId);
            count++;
          }
        }
      }
    });
  }
};

const swapNodeTheme = (
  node: SceneNode | PageNode,
  localStyle: ReferenceStyle[],
  localEffect: ReferenceStyle[],
  theme: string
) => {
  const frame = nodeWithSimpleFillAndStroke(node);
  if (frame) {
    swapFill(frame, localStyle, theme);
    swapStroke(frame, localStyle, theme);
    swapEffect(frame, localEffect, theme);
  }
  const textNode = textNodeWithComplexFillAndStroke(node);
  if (textNode) {
    swapMixTextFill(textNode, localStyle, theme);
    swapStroke(textNode, localStyle, theme);
    swapEffect(textNode, localEffect, theme);
  }
};

const swapTheme = async (theme: string) => {
  const targetTheme = loadLocalStyle(theme);
  const targetEffect = loadLocalEffect(theme);
  const selected = figma.currentPage.selection;
  resetCount();
  walkNodes(selected, (node: SceneNode | PageNode) => {
    swapNodeTheme(node, targetTheme, targetEffect, theme);
  });
};

const prualStyle = (count: number): string => {
  return count > 1 ? "styles" : "style";
};

const notifySwap = (theme: string) => {
  figma.notify(`Swap to ${theme} (${count} ${prualStyle(count)})`);
};

const swapToDay = async () => {
  await initPlugin();
  await swapTheme(dayFolder);
  await notifySwap("Day 🌞");
  await figma.closePlugin();
};

const swapToNight = async () => {
  await initPlugin();
  await swapTheme(nightFolder);
  await notifySwap("Night 🌚");
  await figma.closePlugin();
};

const justSwapToDay = () => {
  swapTheme(dayFolder);
  notifySwap("Day 🌞");
};

const justSwapToNight = () => {
  swapTheme(nightFolder);
  notifySwap("Night 🌚");
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
  oppositeTheme,
};

// For testing
export {
  walkNodes,
  swapNodeTheme,
  getCount,
  resetCount,
  testSetDayFolder,
  testSetNightFolder,
};
