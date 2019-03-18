import React, { Component } from 'react'
import Styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { push as Menu } from 'react-burger-menu'

const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '16px',
    height: '16px',
    left: '35px',
    top: '35px'
  },
  bmBurgerBars: {
    background: 'white'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: 'white'
  },
  bmMenu: {
    background: 'black',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
    overflow: 'hidden'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#04756f',
    padding: '0.8em',
    textAlign: 'center',

    a: {
      color: '#000000',
      listStyle: 'none'
    }
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

const ItemWrap = Styled.div`
  a {
     text-decoration: none;
     display: block;
     padding: 1em;
     color: white;
     font-weight: 700
     font-size: 3rem;
     transition: ease all .2s;
       &:hover {
         color: grey;
       }
        @media screen and (min-width: 1000px) {
      font-size: 1rem;
      padding: .5rem;
    }
`

export default class Nav extends Component {
  // Controlling state to close the menu when a Nav link is selected
  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen })
  }

  closeMenu() {
    this.setState({ menuOpen: false })
  }

  render() {
    return (
      <Menu
        isOpen={this.state.menuOpen}
        onStateChange={state => this.handleStateChange(state)}
        width={250}
        styles={styles}
      >
        <ItemWrap>
          <NavLink onClick={() => this.closeMenu()} exact to='/' activeClassName='active'>
            <span>Home</span>
          </NavLink>
        </ItemWrap>
        <ItemWrap>
          {/*
          <NavLink
            onClick={() => this.closeMenu()}
            to="/crateless" activeClassName="active">
            <span>Crateless</span>
          </NavLink>
        */}
        </ItemWrap>
        <ItemWrap>
          <NavLink onClick={() => this.closeMenu()} to='/about' activeClassName='active'>
            <span>About</span>
          </NavLink>
        </ItemWrap>
      </Menu>
    )
  }
}