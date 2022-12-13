import { createFigma } from "figma-api-stub";
import { resetCount, swapNodeTheme, getCount } from "../swap";
import { loadEffect } from "../utility/style";

describe("walk in simple node", () => {
  // @ts-ignore
  global.figma = createFigma({
    simulateErrors: true,
  });

  const page = figma.createPage();
  figma.root.appendChild(page);

  const createStyle = (): ReadonlyArray<Paint> => {
    return [
      {
        type: "SOLID",
        color: { r: 0, g: 0, b: 0 },
        opacity: 1,
        visible: true,
      },
    ];
  };

  const createEffect = (): ReadonlyArray<Effect> => {
    return [
      {
        type: "DROP_SHADOW",
        color: { r: 0, g: 0, b: 0, a: 0 },
        offset: { x: 0, y: 0 },
        radius: 0,
        visible: true,
        blendMode: "NORMAL",
      },
    ];
  };

  const effectDay: EffectStyle = figma.createEffectStyle();
  effectDay.type = "EFFECT";
  effectDay.name = "Day / Drop Primary";
  effectDay.effects = createEffect();

  const effectNight: EffectStyle = figma.createEffectStyle();
  effectNight.type = "EFFECT";
  effectNight.name = "Night / Drop Primary";
  effectNight.effects = createEffect();

  const styleDay: PaintStyle = figma.createPaintStyle();
  styleDay.type = "PAINT";
  styleDay.name = "Day / Primary";
  styleDay.paints = createStyle();

  const styleNight: PaintStyle = figma.createPaintStyle();
  styleNight.type = "PAINT";
  styleNight.name = "Night / Primary";
  styleNight.paints = createStyle();

  it("should swap Frame style from Day to Night", () => {
    const node = figma.createFrame();
    node.name = "Frame 1";
    node.fillStyleId = styleDay.id;
    node.strokeStyleId = styleDay.id;
    node.effectStyleId = effectDay.id;
    page.appendChild(node);

    resetCount();
    let localStyleBasic: EffectStyle[] = [effectDay, effectNight];
    const targetTheme = loadEffect("Night", localStyleBasic);

    resetCount();
    swapNodeTheme(node, [], targetTheme);

    expect(figma.getStyleById(node.effectStyleId)?.name).toEqual(
      "Night / Drop Primary"
    );
    expect(getCount()).toEqual(1);
  });
});
