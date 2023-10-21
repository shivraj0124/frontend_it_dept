import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'
import './stylesheet.css'
// import { jsxDEV } from "react/jsx-dev-runtime";
ReactDOM.hydrate(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);




// import React from 'react'
// import ReactDOM from 'react-dom'
// import App from './App'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )