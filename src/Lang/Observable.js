import { setTitle } from "../actions/setTitle";
import { replaceProductTranslation } from "../actions/replaceProductTranslation";
import { setCurrentLang } from "../actions/setCurrentLang";
import UserCart from "../Cart/index";
const { i18n } = require("../i18n/index");
const SiteLang = require("./index");

class LangObservable {
  constructor(subscribeFunction) {
    this._subscribeFunction = subscribeFunction;
  }

  subscribe(observer) {
    return this._subscribeFunction(observer);
  }
}

const observableLang = new LangObservable((subscriber) => {
  try {
    const twoWayBinding = (event) => {
      subscriber.next(event.currentTarget.dataset.lang);
    };

    Array.from(document.querySelectorAll(".langChanger")).forEach(function (
      element
    ) {
      element.addEventListener("click", twoWayBinding);
    });

    return subscriber.complete();
  } catch (err) {
    subscriber.error(err);
  }
});

window.addEventListener("load", onload);

onload = function () {
  observableLang.subscribe({
    next(x) {
      SiteLang.set(x, i18n.translations);
      /** Rerender all text */
      setTitle("#titleApp", "title", "html");
      setTitle("#titleProduct", "products", "html");
      setTitle("#titleCart", "cart", "html");
      setTitle(".cartBtn", "addCart", "text");
      setCurrentLang();
      replaceProductTranslation();
      UserCart.load();
    },
    error(err) {
      console.error("something went wrong : " + err);
    },
    complete() {
      console.log("done");
    },
  });
};
