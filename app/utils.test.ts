import { validateLogin } from "./utils";

test("validateEmail returns false for non-emails", () => {
  expect(validateLogin(undefined)).toBe(false);
  expect(validateLogin(null)).toBe(false);
  expect(validateLogin("")).toBe(false);
  expect(validateLogin("not-an-email")).toBe(false);
  expect(validateLogin("n@")).toBe(false);
});

test("validateEmail returns true for emails", () => {
  expect(validateLogin("kody@example.com")).toBe(true);
});
