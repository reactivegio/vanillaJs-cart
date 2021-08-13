import { CartTemplate } from "../../template/cart.template";
import { CartElementTemplate } from "../../template/cartElement.template";
import { EmptyTemplate } from "../../template/empty.template";
import { i18n } from "../i18n";
import { Lang } from "../Lang/index";

const arrayElements = [];

/**
 * Add a row in cart
 * @param {object} product: the object product to add
 * @param {boolean} isToUpdateLS: It is to update in localStorage
 */
const add = function (product, isToUpdateLS) {
  arrayElements.push({
    ...product,
    count: product.count ? product.count : 1,
  });

  /** The cart was empty then create table */
  if (!document.querySelector("tbody")) {
    // remove empty content ...
    if (document.querySelector(".empty-contents")) {
      document.querySelector(".empty-contents").remove();
    }
    // ... and add cart table
    document
      .querySelector("#titleCart")
      .insertAdjacentHTML(
        "afterend",
        CartTemplate(
          Lang.translate(i18n.translations["product"]),
          Lang.translate(i18n.translations["price"]),
          Lang.translate(i18n.translations["quantity"]),
          Lang.translate(i18n.translations["total"])
        )
      );
  }
  document.querySelector("tbody").insertAdjacentHTML(
    "beforeend",
    CartElementTemplate({
      ...product,
      nameTranslate: product.nameTranslate
        ? product.nameTranslate
        : Lang.get("name", product),
      count: product.count ? product.count : 1,
    })
  );

  calculateTotal();
  if (isToUpdateLS) {
    // update LocalStorage
    localStorage.setItem("myCart", JSON.stringify(Cart().elements));
  }
};

/**
 * Calculate cart total
 */
const calculateTotal = () => {
  const total = Cart().elements.reduce((sum, i) => {
    return sum + i.price * i.count;
  }, 0);

  const tableCart = document.querySelector(".cart-list");
  tableCart.querySelector("#big-total").innerHTML =
    Math.round(total * 100) / 100;
};

const load = function () {
  // when reload for language change clear all cart and rerender it
  if (document.querySelector(".cart-list")) {
    arrayElements.length = 0;

    document.querySelector(".cart-list").innerHTML = "";
  }

  // the idea is that the data is storage in localStorage and recovered in load phase
  const container = document.getElementById("titleCart");
  const storageCart = JSON.parse(localStorage.getItem("myCart")) || [];

  // empty Cart
  if (storageCart.length === 0) {
    container.insertAdjacentHTML("afterend", EmptyTemplate());
  } else {
    storageCart.map((elem) => {
      add(elem, false);
    });
    calculateTotal();
  }
};

/**
 * Update single count element if the element exist.
 * @param {number} productid
 */
const updateCountElement = function (productid, type) {
  Cart().elements.find((el, key) => {
    if (el.id === productid) {
      if (type === "+") {
        el.count++;
      } else {
        // when count is 0 the product is deleted from cart list
        if (el.count > 1) {
          debugger;
          el.count--;
        } else {
          Cart().elements.splice(key, 1);
          document.getElementById(`cart-item_${productid}`).remove();
        }
      }

      // If exist product row, maybe user has deleted with remove the single element
      if (document.getElementById(`cart-item_${productid}`)) {
        const rowCart = document.querySelector(`#cart-item_${productid}`);
        rowCart.querySelector(`.quantity-value`).innerHTML = el.count;
        rowCart.querySelector(`.total`).innerHTML =
          Math.round(el.count * el.price * 100) / 100;
      }
      // if user has deleted all rows then empty advice is shown
      if (Cart().elements.length === 0) {
        debugger;
        document.querySelector(".cart-list").remove();
        const container = document.getElementById("titleCart");
        container.insertAdjacentHTML("afterend", EmptyTemplate());
      }
    }
  });

  localStorage.setItem("myCart", JSON.stringify(Cart().elements));
  calculateTotal();
};

export const Cart = () => {
  return {
    add: add,
    calculateTotal: calculateTotal,
    elements: arrayElements,
    load: load,
    updateCountElement: updateCountElement,
  };
};
