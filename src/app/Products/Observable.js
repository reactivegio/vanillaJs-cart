const { Cart } = require("../Cart");
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
      if (Cart().elements.find((el) => el.id === x.id)) {
        Cart().updateCountElement(x.id, "+");
      } else {
        Cart().add(x.obj, true);
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
