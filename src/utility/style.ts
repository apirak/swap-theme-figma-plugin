type ReferenceStyle = {
  id: string;
  name: string;
  refName: string;
};

const createReferenceName = (name: string, theme: string): string => {
  let refName = name.replace(/\s+/g, ""); //remove space
  refName = refName.replace(`${theme}/`, "");
  return refName;
};

const matchWithTheme = (name: string, theme: string): boolean => {
  return name.replace(/\s+/g, "").includes(theme.replace(/\s+/g, ""));
};

const loadStyle = (theme: string, styles: PaintStyle[]): ReferenceStyle[] => {
  let allStyle: ReferenceStyle[] = [];

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

const loadEffect = (theme: string, styles: EffectStyle[]): ReferenceStyle[] => {
  let allEffect: ReferenceStyle[] = [];

  styles.forEach((style) => {
    if (matchWithTheme(style.name, theme)) {
      allEffect.push({
        id: style.id,
        name: style.name,
        refName: createReferenceName(style.name, theme),
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
