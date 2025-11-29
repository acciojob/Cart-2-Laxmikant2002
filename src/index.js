import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { CartProvider } from "./components/context";
import "./styles/App.css";

ReactDOM.render(
  <CartProvider>
    <App />
  </CartProvider>,
  document.getElementById("root")
);



