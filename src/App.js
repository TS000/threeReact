import React, { Component } from 'react'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Home from './layouts/Home'
import About from './layouts/About'

const GlobalStyle = createGlobalStyle`
  html, body {
    position: relative;
    height: 100%
    width: 100%
    padding: 0
    background: #000000
    font-size: 10px
    font-family: 
      -apple-system,
      BlinkMacSystemFont,
      Segoe UI,
      Roboto,
      Oxygen-Sans,
      Ubuntu,
      Cantarell,
      Helvetica Neue,
      sans-serif
      body {
        margin: 0
        padding: 0
      }
    @media (min-width: 320px) {
    font-size: 12px;
    }
    @media screen and (min-width: 1400px) {
      font-size: 14px;
    }
  }
`

console.log(
  `%c
                   P▄█▀▄S
                 E▄██▀▀▀▀▄L
               E▄███▀▀▀▀▀▀▀▄E
             D▄████▀▀▀▀▀▀▀▀▀▀▄E
            ▄█████▀▀▀▀▀▀▀▀▀▀▀▀█▄P

              `,
  'font-family:monospace'
)

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
      <GlobalStyle />
          <Router>
            <div>
            <Header />
            <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
              <Route
                path="/admin"
                component={() =>
                  (window.location =
                    'https://www.youtube.com/watch?time_continue=116&v=dJRsWJqDjFE')
                }
               />
              <Route
                path="/wp-admin"
                component={() =>
                  (window.location = 'https://youtu.be/djV11Xbc914?t=1m27s')
                 }
              />
             </Switch>
             </div>
          </Router>
          </React.Fragment>
    )
  }
}