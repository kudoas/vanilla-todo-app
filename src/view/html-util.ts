export const escapeSpecialChars = (str: string): string =>
  str.replace(
    /[&'`"<>]/g,
    (match) =>
      ({
        "&": "&amp;",
        "'": "&#x27;",
        "`": "&#x60;",
        '"': "&quot;",
        "<": "&lt;",
        ">": "&gt;",
      }[match])
  );

/**
 * HTML文字列からHTML要素を作成して返す
 */
export const htmlToElement = (html: string): Element => {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content.firstElementChild;
};

/**
 * HTML文字列からDOM Nodeを作成して返すタグ関数
 */
export const element = (strings: TemplateStringsArray, ...values: ReadonlyArray<any>): Element => {
  const htmlString = strings.reduce(
    (result, str, i) => result + escapeSpecialChars(String(values[i - 1])) + str
  );
  return htmlToElement(htmlString);
};

/**
 * コンテナ要素の中身をbodyElementで上書きする
 */
export const render = (bodyElement: Element, containerElement: Element) => {
  containerElement.innerHTML = "";
  containerElement.appendChild(bodyElement);
};
