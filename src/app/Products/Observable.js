import UserCart from "../Cart/index";
const { Products } = require("./index");

class ProductsObservable {
  constructor(subscribeFunction) {
    this._subscribeFunction = subscribeFunction;
  }

  subscribe(observer) {
    return this._subscribeFunction(observer);
  }
}

const observable = new ProductsObservable((subscriber) => {
  try {
    const twoWayBinding = (event) => {
      const idProductToAdd = event.currentTarget.id.replace("addCart_", "");
      const productObj = Products.data.find((el) => el.id === idProductToAdd);
      subscriber.next({ obj: productObj, id: idProductToAdd });
    };
    Array.from(document.querySelectorAll(".cartBtn")).forEach(function (
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
  observable.subscribe({
    next(x) {
      if (UserCart.elements.find((el) => el.id === x.id)) {
        UserCart.updateCountElement(x.id, "+");
      } else {
        UserCart.add(x.obj, true);
      }
    },
    error(err) {
      console.error("something went wrong : " + err);
    },
    complete() {
      console.log("done");
    },
  });
};
