import { createFigma } from "figma-api-stub";
import { walkNodes } from "../swap";

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

  const style1: PaintStyle = figma.createPaintStyle();
  style1.type = "PAINT";
  style1.name = "Day / Primary";
  style1.paints = createStyle();

  const style2: PaintStyle = figma.createPaintStyle();
  style2.type = "PAINT";
  style2.name = "Day / Secondary";
  style2.paints = createStyle();

  const style3: PaintStyle = figma.createPaintStyle();
  style2.type = "PAINT";
  style2.name = "Day / Custom 1";
  style2.paints = createStyle();

  const style4: PaintStyle = figma.createPaintStyle();
  style2.type = "PAINT";
  style2.name = "Day / Custom 2";
  style2.paints = createStyle();

  const frame1 = figma.createFrame();
  frame1.name = "Frame1";
  page.appendChild(frame1);

  const frame2 = figma.createFrame();
  frame2.name = "Frame2";
  frame1.appendChild(frame2);

  const rect1 = figma.createRectangle();
  rect1.fillStyleId = style1.id;
  rect1.strokeStyleId = style2.id;
  rect1.name = "Rect1";
  rect1.resize(100, 200);
  frame1.appendChild(rect1);

  const rect2 = figma.createRectangle();
  rect2.fillStyleId = style1.id;
  rect2.strokeStyleId = style2.id;
  rect2.name = "Rect2";
  rect2.resize(100, 200);
  frame2.appendChild(rect2);

  it("should walk through all node", () => {
    let count = 0;
    let names: String[] = [];
    walkNodes([frame1], (node: SceneNode | PageNode) => {
      count++;
      names.push(node.name);
      return false;
    });
    expect(count).toEqual(4);
    expect(names).toEqual(["Frame1", "Frame2", "Rect2", "Rect1"]);
  });

  it("should walk through node inside", () => {
    let count = 0;
    let names: String[] = [];
    walkNodes([frame2], (node: SceneNode | PageNode) => {
      count++;
      names.push(node.name);
      return false;
    });
    expect(count).toEqual(2);
    expect(names).toEqual(["Frame2", "Rect2"]);
  });
});
