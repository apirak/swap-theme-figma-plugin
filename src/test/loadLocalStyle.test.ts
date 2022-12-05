import { createFigma } from "figma-api-stub";
import { loadStyle } from "../utility/style";

describe("Separete Key from Name", () => {
  // @ts-ignore
  global.figma = createFigma({
    simulateErrors: true,
  });

  const fills1: ReadonlyArray<Paint> = [
    {
      type: "SOLID",
      color: {
        r: 0.9490196108818054,
        g: 0.6000000238418579,
        b: 0.29019609093666077,
      },
      opacity: 1,
      visible: true,
    },
  ];

  const newStyle = (name: string) => {
    const style: PaintStyle = figma.createPaintStyle();
    style.type = "PAINT";
    style.name = name;
    style.paints = fills1;
    return style;
  };

  it("should load only Specific style", () => {
    let localStyleBasic: PaintStyle[] = [
      newStyle("Day / DayPrimary"),
      newStyle("Night / NightPrimary"),
    ];
    expect(loadStyle("Day", localStyleBasic)).toEqual([
      {
        id: localStyleBasic[0].id,
        name: "Day / DayPrimary",
        refName: "DayPrimary",
      },
    ]);
    expect(loadStyle("Night", localStyleBasic)).toEqual([
      {
        id: localStyleBasic[1].id,
        name: "Night / NightPrimary",
        refName: "NightPrimary",
      },
    ]);
  });

  it("should load style that have space in front", () => {
    let localStyleBasic: PaintStyle[] = [
      newStyle("Day / DayPrimary"),
      newStyle(" Night / NightPrimary"),
    ];
    expect(loadStyle("Night", localStyleBasic)).toEqual([
      {
        id: localStyleBasic[1].id,
        name: " Night / NightPrimary",
        refName: "NightPrimary",
      },
    ]);
  });

  it("should load all style that share the same theme", () => {
    let localStyleLarge: PaintStyle[] = [
      newStyle("Day / Primary"),
      newStyle("Day / Secondary"),
      newStyle("Day / Color 1"),
      newStyle("Day /  Color 2"),
      newStyle("Night / Primary"),
      newStyle("Night / Secondary"),
      newStyle("Night / Color 1"),
      newStyle("Night/Color 2"),
    ];
    expect(loadStyle("Day", localStyleLarge)).toEqual([
      {
        id: localStyleLarge[0].id,
        name: "Day / Primary",
        refName: "Primary",
      },
      {
        id: localStyleLarge[1].id,
        name: "Day / Secondary",
        refName: "Secondary",
      },
      {
        id: localStyleLarge[2].id,
        name: "Day / Color 1",
        refName: "Color1",
      },
      {
        id: localStyleLarge[3].id,
        name: "Day /  Color 2",
        refName: "Color2",
      },
    ]);
  });
  it("should load style that have many hierachy", () => {
    let localStyleBasic: PaintStyle[] = [
      newStyle("Day / Break /  DayPrimary"),
      newStyle(" Night / Break / NightPrimary"),
    ];
    expect(loadStyle("Day", localStyleBasic)).toEqual([
      {
        id: localStyleBasic[0].id,
        name: "Day / Break /  DayPrimary",
        refName: "Break/DayPrimary",
      },
    ]);
  });
});
