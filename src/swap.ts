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

// const setFillStyle = (node: SceneNode, styleId: string | null) => {
//   if (style?.name) {
//         const refName = createReferenceName(style.name);
//         const newId = searchStyle(localStyle, refName);
//         if (newId) {
//           node.fillStyleId = newId;
//         }
//   }
// };

const swapNodeTheme = (node: SceneNode, localStyle: ColorStyle[]) => {
  if (
    node.type == "FRAME" ||
    node.type == "COMPONENT" ||
    node.type == "INSTANCE"
  ) {
    if (node.fillStyleId !== figma.mixed && node.fillStyleId) {
      const style = figma.getStyleById(node.fillStyleId);
      if (style?.name) {
        const refName = createReferenceName(style.name);
        const newId = searchStyle(localStyle, refName);
        if (newId) {
          node.fillStyleId = newId;
          figma.mixed;
        }
      }
    }
  }
};

const swapTheme = (theme: string) => {
  console.log(`Start swap to ${theme}`);
  const targetTheme = loadLocalStyle(theme);
  console.log("localStyle:", targetTheme);
  const selected = figma.currentPage.selection;
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
