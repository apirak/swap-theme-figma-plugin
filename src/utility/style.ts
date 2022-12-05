type ColorStyle = {
  id: string;
  name: string;
  refName: string;
};

const createReferenceName = (name: string, theme: string) => {
  let refName = name.replace(/\s+/g, "").replace(`${theme}/`, "");
  return refName;
};

const matchWithTheme = (name: string, theme: string): boolean => {
  const regexp = new RegExp(`^${theme}`, "i");
  return regexp.test(name.replace(/\s+/g, ""));
};

const loadStyle = (theme: string, styles: PaintStyle[]): ColorStyle[] => {
  let allStyle: ColorStyle[] = [];

  styles.forEach((style) => {
    if (matchWithTheme(style.name, theme)) {
      allStyle.push({
        id: style.id,
        name: style.name,
        refName: createReferenceName(style.name, theme),
      });
    }
  });

  return allStyle;
};

const loadLocalStyle = (theme: string): ColorStyle[] => {
  const localStyles = figma.getLocalPaintStyles();
  return loadStyle(theme, localStyles);
};

export { createReferenceName, loadLocalStyle, loadStyle };

export type { ColorStyle };
