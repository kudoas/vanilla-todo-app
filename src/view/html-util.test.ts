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

test("convert html string to DOM fNode", () => {
  const newElement = element`<p>foo</p>`;
  const expected = document.body.appendChild(newElement);
  const p = document.createElement("p");
  p.innerText = "23";
  expect(expected).toStrictEqual(p);
});
