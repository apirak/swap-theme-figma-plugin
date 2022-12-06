import { Component } from "preact";
import { loadLocalStyle, createReferenceName } from "./utility/style";
import { ColorStyle } from "./utility/style";

let dayFolder = "Day";
let nightFolder = "Night";

const walkNodes = (nodes: readonly SceneNode[], callback?: Function) => {
  let node;
  let stop = false;

  nodes.forEach((node) => {
    if (callback) {
      stop = callback(node);
    }
    if (node.type == "FRAME" || node.type == "GROUP") {
      if (node.children) {
        walkNodes(node.children, callback);
      }
    }
  });
};

const searchStyle = (styles: ColorStyle[], ref: string): string | undefined => {
  let id = undefined;
  for (const style of styles) {
    if (style.refName === ref) {
      id = style.id;
      break;
    }
  }
  return id;
};

const nodeWithFillAndStroke = (
  node: SceneNode | PageNode
): FrameNode | ComponentNode | undefined => {
  if (
    node.type == "FRAME" ||
    node.type == "COMPONENT" ||
    node.type == "INSTANCE" ||
    node.type == "RECTANGLE" ||
    node.type == "ELLIPSE" ||
    node.type == "POLYGON" ||
    node.type == "STAR" ||
    node.type == "LINE" ||
    node.type == "TEXT" ||
    node.type == "VECTOR"
  ) {
    return <FrameNode>node;
  }
  return undefined;
};

const swapFill = (
  frame: FrameNode | ComponentNode,
  localStyle: ColorStyle[]
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
  frame: FrameNode | ComponentNode,
  localStyle: ColorStyle[]
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

const swapNodeTheme = (
  node: SceneNode | PageNode,
  localStyle: ColorStyle[]
) => {
  const frame = nodeWithFillAndStroke(node);
  if (frame) {
    swapFill(frame, localStyle);
    swapStroke(frame, localStyle);
  }
};

const swapTheme = (theme: string) => {
  const targetTheme = loadLocalStyle(theme);
  const selected = figma.currentPage.selection;
  walkNodes(selected, (node: SceneNode | PageNode) => {
    swapNodeTheme(node, targetTheme);
  });
};

const swapToNight = () => {
  swapTheme("Night");
  figma.closePlugin("close: swap to night");
};

const swapToDay = () => {
  swapTheme("Day");
  figma.closePlugin("close: swap to day");
};

export { swapToDay, swapToNight };

// For testing
export { walkNodes, swapNodeTheme };
