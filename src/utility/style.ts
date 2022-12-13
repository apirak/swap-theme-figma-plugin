type ReferenceStyle = {
  id: string;
  name: string;
  refName: string;
};

const createReferenceName = (name: string): string => {
  let refName = name.replace(/\s+/g, "").replace(/.+?\//, "");
  return refName;
};

const matchWithTheme = (name: string, theme: string): boolean => {
  const regexp = new RegExp(`^${theme}`, "i");
  return regexp.test(name.replace(/\s+/g, ""));
};

const loadStyle = (theme: string, styles: PaintStyle[]): ReferenceStyle[] => {
  let allStyle: ReferenceStyle[] = [];

  styles.forEach((style) => {
    if (matchWithTheme(style.name, theme)) {
      allStyle.push({
        id: style.id,
        name: style.name,
        refName: createReferenceName(style.name),
      });
    }
  });

  return allStyle;
};

const loadEffect = (theme: string, styles: EffectStyle[]): ReferenceStyle[] => {
  let allEffect: ReferenceStyle[] = [];

  styles.forEach((style) => {
    if (matchWithTheme(style.name, theme)) {
      allEffect.push({
        id: style.id,
        name: style.name,
        refName: createReferenceName(style.name),
      });
    }
  });

  return allEffect;
};

const loadLocalEffect = (theme: string): ReferenceStyle[] => {
  const localEffects = figma.getLocalEffectStyles();
  return loadEffect(theme, localEffects);
};

const loadLocalStyle = (theme: string): ReferenceStyle[] => {
  const localStyles = figma.getLocalPaintStyles();
  return loadStyle(theme, localStyles);
};

export {
  createReferenceName,
  loadLocalStyle,
  loadLocalEffect,
  loadEffect,
  loadStyle,
};

export type { ReferenceStyle };
