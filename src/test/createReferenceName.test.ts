import { createReferenceName } from "../utility/style";

describe("Remove space from style name", () => {
  it("should remove all space", () => {
    expect(createReferenceName("Day / primary")).toEqual("primary");
    expect(createReferenceName("Day/ primary")).toEqual("primary");
    expect(createReferenceName("Day /primary")).toEqual("primary");
    expect(createReferenceName("Day  /   primary")).toEqual("primary");
    expect(createReferenceName(" Day  /   primary")).toEqual("primary");
    expect(createReferenceName("  Day  /   primary")).toEqual("primary");
  });
  it("should remove only 'Day' with '/' ", () => {
    expect(createReferenceName("Day x primary")).toEqual("Dayxprimary");
    expect(createReferenceName(" Day primary")).toEqual("Dayprimary");
  });
  it("should remove only first folder", () => {
    expect(createReferenceName("Day / primary / one")).toEqual("primary/one");
    expect(createReferenceName(" Day primary / two")).toEqual("two");
  });
});
