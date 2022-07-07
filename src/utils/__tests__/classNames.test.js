import { classNames } from "../";

describe("classNames", () => {
  it("classNames('class-1', 'class-2') should return a string: 'class-1 class-2'", () => {
    expect(typeof classNames).toBe("function");
    expect(classNames("class-1", "class-2")).toBe("class-1 class-2");
  });
  it("classNames(1,2,3) should return '1 2 3'", () => {
    expect(classNames(1, 2, 3)).toBe("1 2 3");
  });
  it("classNames(['one', 2, 'three']) should return 'one 2 3'", () => {
    expect(classNames(["one", 2, "three"])).toBe("one 2 three");
  });
});
