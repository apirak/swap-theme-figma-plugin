import { createReferenceName } from "../utility/style";

describe("Remove space from style name", () => {
  it("should remove all space", () => {
    expect(createReferenceName("Day / primary", "Day")).toEqual("primary");
    expect(createReferenceName("Day/ primary", "Day")).toEqual("primary");
    expect(createReferenceName("Day /primary", "Day")).toEqual("primary");
    expect(createReferenceName("Day  /   primary", "Day")).toEqual("primary");
    expect(createReferenceName(" Day  /   primary", "Day")).toEqual("primary");
    expect(createReferenceName("  Day  /   primary", "Day")).toEqual("primary");
  });
  it("should remove only 'Day' with '/' ", () => {
    expect(createReferenceName("Day x/ primary", "Day")).toEqual(
      "Dayx/primary"
    );
    expect(createReferenceName(" Day primary", "Day")).toEqual("Dayprimary");
  });
});
