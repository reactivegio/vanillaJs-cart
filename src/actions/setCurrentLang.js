import SiteLang from "../Lang/index";

export const setCurrentLang = () => {
  /** If change language I have to replace all name with current translation */

  const langLabel = document.querySelector(".dropDown-toggle-label");
  langLabel.querySelector(
    "img"
  ).src = `./assets/flags/${SiteLang.language}.svg`;
};
