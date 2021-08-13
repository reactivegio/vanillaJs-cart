import { TitleTemplate } from "../../template/title.template";
const { Lang } = require("../Lang/index");

export const setTitle = (selector, stringTranslate, type) => {
  const langTranslate = Lang.get(stringTranslate);
  const typeElem = {
    html: TitleTemplate(langTranslate),
    text: langTranslate,
  };
  const appElement = document.querySelectorAll(selector);

  Array.from(appElement).map((el) => {
    return (el.innerHTML = typeElem[type]);
  });
};
