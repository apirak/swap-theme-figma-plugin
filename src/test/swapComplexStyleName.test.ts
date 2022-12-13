import { createFigma } from "figma-api-stub";
import { style } from "../style.css";
import {
  swapNodeTheme,
  getCount,
  resetCount,
  setDayFolder,
  setNightFolder,
  testSetDayFolder,
  testSetNightFolder,
} from "../swap";
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

  it("should preform well when style name has basket", () => {
    styleDay.name = "[Day] / Primary";
    styleNight.name = "[Night] / Primary";

    const node = figma.createRectangle();
    node.name = "rectangle 1";
    node.fillStyleId = styleDay.id;
    node.strokeStyleId = styleDay.id;
    page.appendChild(node);

    testSetDayFolder("[Day]");
    testSetNightFolder("[Night]");

    let localStyleBasic: PaintStyle[] = [styleDay, styleNight];
    const targetTheme = loadStyle("[Night]", localStyleBasic);

    swapNodeTheme(node, targetTheme, [], "[Night]");

    expect(figma.getStyleById(node.fillStyleId)?.name).toEqual(
      "[Night] / Primary"
    );
  });

  it("should preform well when style has name infrontof it", () => {
    styleDay.name = "Name /[Day] / Primary";
    styleNight.name = "Name / [Night] / Primary";

    const node = figma.createRectangle();
    node.name = "rectangle 1";
    node.fillStyleId = styleDay.id;
    node.strokeStyleId = styleDay.id;
    page.appendChild(node);

    testSetDayFolder("Name/[Day]");
    testSetNightFolder("Name/[Night]");

    let localStyleBasic: PaintStyle[] = [styleDay, styleNight];
    const targetTheme = loadStyle("Name/[Night]", localStyleBasic);

    swapNodeTheme(node, targetTheme, [], "Name/[Night]");

    expect(figma.getStyleById(node.fillStyleId)?.name).toEqual(
      "Name / [Night] / Primary"
    );
  });
});
