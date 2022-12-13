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
    expect(createReferenceName("Day x primary", "Day")).toEqual("Dayxprimary");
    expect(createReferenceName(" Day primary", "Day")).toEqual("Dayprimary");
  });

  it("should remove only first folder", () => {
    expect(createReferenceName("Day / primary / one", "Day")).toEqual(
      "primary/one"
    );
    expect(createReferenceName(" Day primary / two", "Day")).toEqual(
      "Dayprimary/two"
    );
  });

  it("should remove second folder it define in theme", () => {
    expect(
      createReferenceName(" Apirak / Day / primary", "Apirak/Day")
    ).toEqual("primary");
  });

  it("should process name with bracket", () => {
    expect(
      createReferenceName(" Apirak / [Day] / primary", "Apirak/[Day]")
    ).toEqual("primary");
    expect(createReferenceName(" [Day] / primary", "[Day]")).toEqual("primary");
  });
});
