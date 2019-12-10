import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import ThePoetsPost from './Components/ThePoetsPost'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Router>
      <ThePoetsPost />
  </Router>
  , document.getElementById('root'))
