//import "../UI/notification";
import { ProductCardTemplate } from "../../template/productCard.template";
const { i18n } = require("../i18n/index");
const { Lang } = require("../Lang/index");
const { Products } = require("./index");
import "../../scss/products.scss";
//const { UI } = require("../UI/index");

Products.load = function () {
  /** In this case I retrieve data from a json */
  fetch("../../config/products.json")
    .then((response) => response.json())
    .then((obj) => {
      Products.data = obj;
      const d1 = document.getElementById("titleProduct");
      d1.insertAdjacentHTML("afterend", "<ul class='productsList'></ul>");
      const ulList = document.querySelector(".productsList");
      obj.map((el) => {
        ulList.insertAdjacentHTML(
          "beforeend",
          ProductCardTemplate(
            el.id,
            Lang.get("name", el),
            el.price,
            el.currency,
            Lang.get("addCart", i18n.translations)
          )
        );
      });
    })
    .catch((e) => {
      //UI.notification.show(e.name + " \n" + e.message, false);
    });
};
