class CartObservable {
  constructor(subscribeFunction) {
    this._subscribeFunction = subscribeFunction;
  }

  subscribe(observer) {
    return this._subscribeFunction(observer);
  }
}

const observableCart = new CartObservable((subscriber) => {
  try {
    const addProduct = (event) => {
      subscriber.next(event.parentNode.dataset.id, "+");
    };
    const removeProduct = (event) => {
      subscriber.next(event.parentNode.dataset.id, "-");
    };

    document.querySelector(".cart-list").addEventListener("click", () => {
      debugger;
      if (event.target.className === "addBtn") {
        addProduct(event.target);
      } else if (event.target.className === "removeBtn") {
        removeProduct(event.target);
      }
    });

    return subscriber.complete();
  } catch (err) {
    subscriber.error(err);
  }
});

window.addEventListener("load", onload);

onload = function () {
  observableCart.subscribe({
    next(x, type) {
      debugger;
      UserCartupdateCountElement(x, type);
    },
    error(err) {
      console.error("something went wrong : " + err);
    },
    complete() {
      console.log("done");
    },
  });
};
