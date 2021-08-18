import { TitleTemplate } from "../template/title.template";
import SiteLang from "../Lang/index";
const { Products } = require("../Products/index");

export const replaceProductTranslation = () => {
  /** If change language I have to replace all name with current translation */

  Products.data.map((el) => {
    const changeName = SiteLang.get("name", el);
    const currentCard = document.querySelector(`#product_${el.id}`);
    currentCard.querySelector(".title").innerHTML = changeName;
  });
};
