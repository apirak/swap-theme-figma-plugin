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

  const frame1 = figma.createFrame();
  frame1.name = "Frame1";
  frame1.fillStyleId = styleDay.id;
  frame1.strokeStyleId = styleDay.id;
  page.appendChild(frame1);

  it("should swap Frame style from Day to Night", () => {
    let localStyleBasic: PaintStyle[] = [styleDay, styleNight];
    const targetTheme = loadStyle("Night", localStyleBasic);

    if (frame1.fillStyleId !== figma.mixed && frame1.fillStyleId) {
      const style = figma.getStyleById(frame1.fillStyleId);
    }

    swapNodeTheme(frame1, targetTheme);

    let name: string = "";
    if (frame1.fillStyleId !== figma.mixed && frame1.fillStyleId) {
      const style = figma.getStyleById(frame1.fillStyleId);
      name = style?.name ? style.name : "";
    }

    expect(name).toEqual("Night / Primary");
  });
});
