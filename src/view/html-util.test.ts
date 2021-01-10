import { escapeSpecialChars, htmlToElement, element } from "./html-util";

test("convert html special characters", () => {
  const expected = escapeSpecialChars("&'`<>");
  const toBe = "&amp;&#x27;&#x60;&lt;&gt;";
  expect(expected).toBe(toBe);
});

test("convert string to html", () => {
  const expected = htmlToElement("<p></p>");
  const toBe = document.createElement("p");
  expect(expected).toStrictEqual(toBe);
});

test("convert html string to DOM Node", () => {
  const expected = element`<p>${23}</p>`;
});
