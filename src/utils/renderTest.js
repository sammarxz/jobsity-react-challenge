import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { render } from "@testing-library/react";

import getStore from "../store/getStore";
import reducers from "../store/reducers";

function renderTest(ui) {
  return render(
    <Provider store={getStore(reducers)}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
}

export { renderTest };
