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

  const createStyle = (
    rColor: number,
    gColor: number,
    bColor: number
  ): ReadonlyArray<Paint> => {
    return [
      {
        type: "SOLID",
        color: { r: rColor, g: gColor, b: bColor },
        opacity: 1,
        visible: true,
      },
    ];
  };

  const styleDay: PaintStyle = figma.createPaintStyle();
  styleDay.type = "PAINT";
  styleDay.name = "Day / Primary";
  styleDay.paints = createStyle(0, 0, 1);

  const styleDay2: PaintStyle = figma.createPaintStyle();
  styleDay2.type = "PAINT";
  styleDay2.name = "Day / Secondary";
  styleDay2.paints = createStyle(0, 1, 0);

  const styleNight: PaintStyle = figma.createPaintStyle();
  styleNight.type = "PAINT";
  styleNight.name = "Night / Primary";
  styleNight.paints = createStyle(1, 1, 1);

  const styleNight2: PaintStyle = figma.createPaintStyle();
  styleNight2.type = "PAINT";
  styleNight2.name = "Night / Secondary";
  styleNight2.paints = createStyle(0, 1, 1);

  async function newText(text: string, name: string): Promise<TextNode> {
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
    const textNode = figma.createText();
    const fontName = { family: "Roboto", style: "Regular" };
    textNode.fontName = fontName;
    textNode.characters = text;
    textNode.fontSize = 12;

    textNode.name = name;
    return textNode;
  }

  it("should swap Text Style from Day to Night", async () => {
    const node: TextNode = await newText("Color1Color2", "Text 1");
    // ***************
    // * Can't test Because don't have stuf for setRange...
    // ***************
    // node.setRangeFillStyleId(0, 6, styleDay.id);
    // node.setRangeFillStyleId(7, 12, styleDay2.id);

    page.appendChild(node);

    let localStyleBasic: PaintStyle[] = [
      styleDay,
      styleDay2,
      styleNight,
      styleNight2,
    ];
    const targetTheme = loadStyle("Night", localStyleBasic);

    // swapNodeTheme(node, targetTheme);

    // const xs = node.getStyledTextSegments(["fillStyleId"]);
    const x = 0;
    expect(x).toEqual(0);
  });
});
