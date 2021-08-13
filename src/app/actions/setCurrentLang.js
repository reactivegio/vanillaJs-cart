import { TitleTemplate } from "../../template/title.template";
const { Lang } = require("../Lang/index");

export const setCurrentLang = () => {
  /** If change language I have to replace all name with current translation */

  const langLabel = document.querySelector(".dropDown-toggle-label");
  langLabel.querySelector("img").src = `./assets/flags/${Lang.language}.svg`;
};
