import { HelloTemplate } from "../template/hello.template";
import "./style.scss";

export const App = {
  init() {
    const appElement = document.querySelector("#app");
    appElement.innerHTML = HelloTemplate();
  },
};
