import React from "react";
import ReactDOM from "react-dom";
import 'babel-polyfill';
import './react-table-defaults';
import './react-chartjs-2-defaults';
import './styles/index.css';
import App from './app/App'

const render = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
}

window.onload = () => {
  render();
}