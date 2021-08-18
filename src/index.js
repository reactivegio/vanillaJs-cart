import "./Products/load";
import "./scss/style.scss";
import { setTitle } from "./actions/setTitle";
import { DropdownElementTemplate } from "./template/dropdownElement.template";
import SiteLang from "./Lang/index";
import UserCart from "./Cart/index";
const { i18n } = require("./i18n/index");
const { CartObservable } = require("./Cart/Observable");
const { LangObservable } = require("./Lang/Observable");
const { Products } = require("./Products");
const { ProductsObservable } = require("./Products/Observable");

export const App = {
  init() {
    debugger;
    // when first parameter is not passed then retrieve browser language
    SiteLang.set(null, i18n.translations);
    SiteLang.load();
    const dropdown = document.querySelector("#langDropdown");
    // render the list of lang dropdown
    SiteLang.options.languages.map((lang) => {
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
    UserCart.load();

    try {
      CartObservable();
      LangObservable();
      ProductsObservable();
    } catch {}
  },
};
