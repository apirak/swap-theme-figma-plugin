let dayFolder = "Day";
let nightFolder = "Night";

type ColorStyle = {
  id: string;
  name: string;
  refName: string;
};

const removeSpace = (s: string) => {
  return s.replace(/\s+/g, "");
};

const loadLocalStyle = (): ColorStyle[] => {
  let allStyle: ColorStyle[] = [];
  const localStyles = figma.getLocalPaintStyles();

  localStyles.forEach((style) => {
    allStyle.push({
      id: style.id,
      name: style.name,
      refName: removeSpace(style.name),
    });
  });
  return allStyle;
};

const swapToNight = () => {
  console.log("Start swap to Night");
  const x = loadLocalStyle();
  console.log("x:", x);
  figma.closePlugin("close: swap to night");
};

const swapToDay = () => {
  console.log("Start swap to Day");
  const x = loadLocalStyle();
  console.log("x:", x);
  figma.closePlugin("close: swap to day");
};

export { swapToDay, swapToNight };

export { removeSpace };
