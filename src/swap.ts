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

const swapTheme = (theme: string) => {
  console.log(`Start swap to ${theme}`);
  const localStyle = loadLocalStyle();
  console.log("localStyle:", localStyle);
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

export { removeSpace };
