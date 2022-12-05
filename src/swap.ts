import { loadLocalStyle } from "./utility/style";

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

const swapTheme = (theme: string) => {
  console.log(`Start swap to ${theme}`);
  const localStyle = loadLocalStyle(theme);
  console.log("localStyle:", localStyle);
  //https://github.com/gavinmcfarland/figma-node-decoder/blob/9249fb5af8855504260ad7738502df00e584cc6c/src/pluginGeneration.ts#L1055
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
export { walkNodes };
