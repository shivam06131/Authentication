import ReactDom from "react-dom";
import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./Reducers/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//if want to dispatch an action rather than directly dispatching type and payload , then we have to use the "thunk" , and to use thunk we have to use applyMiddleware() , thunk can only be used inside the applyMiddleware()

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

// const store = createStore(
//   reducer,
//   composeEnhancers(compose(applyMiddleware(thunk)))
// );

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
