import { removeSpace } from "../swap";

describe("Remove space from style name", () => {
  it("should remove all space", () => {
    expect(removeSpace("Day / primary")).toEqual("Day/primary");
    expect(removeSpace("Day/ primary")).toEqual("Day/primary");
    expect(removeSpace("Day /primary")).toEqual("Day/primary");
    expect(removeSpace("Day  /   primary")).toEqual("Day/primary");
    expect(removeSpace(" Day / primary ")).toEqual("Day/primary");
  });
});
