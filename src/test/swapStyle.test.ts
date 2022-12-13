import { createFigma } from "figma-api-stub";
import { swapNodeTheme } from "../swap";
import { loadStyle } from "../utility/style";

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
    page.appendChild(node);

    let localStyleBasic: PaintStyle[] = [styleDay, styleNight];
    const targetTheme = loadStyle("Night", localStyleBasic);

    swapNodeTheme(node, targetTheme, []);

    expect(figma.getStyleById(node.fillStyleId)?.name).toEqual(
      "Night / Primary"
    );
  });

  it("should swap Component style from Day to Night", () => {
    const node = figma.createComponent();
    node.name = "Component 1";
    node.fillStyleId = styleDay.id;
    node.strokeStyleId = styleDay.id;
    page.appendChild(node);

    let localStyleBasic: PaintStyle[] = [styleDay, styleNight];
    const targetTheme = loadStyle("Night", localStyleBasic);

    swapNodeTheme(node, targetTheme, []);

    expect(figma.getStyleById(node.fillStyleId)?.name).toEqual(
      "Night / Primary"
    );
  });

  it("should swap Instant style from Day to Night", () => {
    const component = figma.createComponent();
    component.name = "Component 1";
    component.fillStyleId = styleDay.id;
    component.strokeStyleId = styleDay.id;
    const node = component.createInstance();
    page.appendChild(node);

    let localStyleBasic: PaintStyle[] = [styleDay, styleNight];
    const targetTheme = loadStyle("Night", localStyleBasic);

    swapNodeTheme(node, targetTheme, []);

    if (node.fillStyleId !== figma.mixed && node.effectStyleId) {
      expect(figma.getStyleById(node.fillStyleId)?.name).toEqual(
        "Night / Primary"
      );
    }
  });

  it("should swap Rectangle style from Day to Night", () => {
    const node = figma.createRectangle();
    node.name = "rectangle 1";
    node.fillStyleId = styleDay.id;
    node.strokeStyleId = styleDay.id;
    page.appendChild(node);

    let localStyleBasic: PaintStyle[] = [styleDay, styleNight];
    const targetTheme = loadStyle("Night", localStyleBasic);

    swapNodeTheme(node, targetTheme, []);

    expect(figma.getStyleById(node.fillStyleId)?.name).toEqual(
      "Night / Primary"
    );
  });
});
