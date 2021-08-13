import { CartObservable } from "./Cart/Observable";
import { LangObservable } from "./Lang/Observable";
import { ProductsObservable } from "./Products/Observable";
import "./Products/load";
import "../scss/style.scss";
import { setTitle } from "./actions/setTitle";
import { DropdownElementTemplate } from "../template/dropdownElement.template";
const { i18n } = require("./i18n/index");
const { Cart } = require("./Cart/index");
const { Lang } = require("./Lang/index");
const { Products } = require("./Products");

export const App = {
  init() {
    // when first parameter is not passed then retrieve browser language
    Lang.set(null, i18n.translations);
    Lang.load();
    const dropdown = document.querySelector("#langDropdown");
    // render the list of lang dropdown
    Lang.options.languages.map((lang) => {
      dropdown.insertAdjacentHTML(
        "beforeend",
        DropdownElementTemplate(
          lang.small_title,
          lang.long_title,
          `<img src='./assets/flags/${lang.small_title}.svg' alt="${lang.long_title}" />`
        )
      );
    });

    setTitle("#titleApp", "title", "html");
    setTitle("#titleProduct", "products", "html");
    setTitle("#titleCart", "cart", "html");
    Products.load();

    Cart().load();

    try {
      CartObservable();
      LangObservable();
      ProductsObservable();
    } catch {}
  },
};
