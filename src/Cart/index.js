import { CartTemplate } from "../template/cart.template";
import { CartElementTemplate } from "../template/cartElement.template";
import { EmptyTemplate } from "../template/empty.template";
import { i18n } from "../i18n";
import SiteLang from "../Lang/index";

class Cart {
  constructor() {
    this.elements = [];
  }

  /**
   * Add a row in cart
   * @param {object} product: the object product to add
   * @param {boolean} isToUpdateLS: It is to update in localStorage
   */
  add(product, isToUpdateLS) {
    this.elements.push({
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
            SiteLang.translate(i18n.translations["product"]),
            SiteLang.translate(i18n.translations["price"]),
            SiteLang.translate(i18n.translations["quantity"]),
            SiteLang.translate(i18n.translations["total"])
          )
        );
    }
    document.querySelector("tbody").insertAdjacentHTML(
      "beforeend",
      CartElementTemplate({
        ...product,
        nameTranslate: product.nameTranslate
          ? product.nameTranslate
          : SiteLang.get("name", product),
        count: product.count ? product.count : 1,
      })
    );
    this.calculateTotal();
    if (isToUpdateLS) {
      // update LocalStorage
      localStorage.setItem("myCart", JSON.stringify(this.elements));
    }
  }

  /**
   * Calculate cart total
   */
  calculateTotal() {
    const total = this.elements.reduce((sum, i) => {
      return sum + i.price * i.count;
    }, 0);

    const tableCart = document.querySelector(".cart-list");
    tableCart.querySelector("#big-total").innerHTML =
      Math.round(total * 100) / 100;
  }

  load() {
    // when reload for language change clear all cart and rerender it
    if (document.querySelector(".cart-list")) {
      this.elements.length = 0;

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
        this.add(elem, false);
      });
      this.calculateTotal();
    }
  }
  /**
   * Update single count element if the element exist.
   * @param {number} productid
   */
  updateCountElement(productid, type) {
    this.elements.find((el, key) => {
      if (el.id === productid) {
        if (type === "+") {
          el.count++;
        } else {
          // when count is 0 the product is deleted from cart list
          if (el.count > 1) {
            debugger;
            el.count--;
          } else {
            this.elements.splice(key, 1);
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
        if (this.elements.length === 0) {
          debugger;
          document.querySelector(".cart-list").remove();
          const container = document.getElementById("titleCart");
          container.insertAdjacentHTML("afterend", EmptyTemplate());
        }
      }
    });

    localStorage.setItem("myCart", JSON.stringify(this.elements));
    this.calculateTotal();
  }
}

const UserCart = new Cart();

export default UserCart;
