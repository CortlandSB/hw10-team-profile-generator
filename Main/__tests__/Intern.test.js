const Intern = require("../lib/Intern");

test("Can set school with constructor", () => {
  const testValue = "UCLA";
  const e = new Intern("Robert", 1, "test@test.com", testValue);
  expect(e.school).toBe(testValue);
});

test("getRole should return \"Intern\"", () => {
  const testValue = "Intern";
  const e = new Intern("Robert", 1, "test@test.com", "UCLA");
  expect(e.getRole()).toBe(testValue);
});

test("Can get school with getSchool", () => {
  const testValue = "UCLA";
  const e = new Intern("Robert", 1, "test@test.com", testValue);
  expect(e.getSchool()).toBe(testValue);
});
