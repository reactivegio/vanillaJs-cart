import { TitleTemplate } from "../template/title.template";
import SiteLang from "../Lang/index";

export const setTitle = (selector, stringTranslate, type) => {
  const langTranslate = SiteLang.get(stringTranslate);
  const typeElem = {
    html: TitleTemplate(langTranslate),
    text: langTranslate,
  };
  const appElement = document.querySelectorAll(selector);

  Array.from(appElement).map((el) => {
    return (el.innerHTML = typeElem[type]);
  });
};
