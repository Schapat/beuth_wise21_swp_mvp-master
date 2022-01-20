import React, { Component } from 'react';
import { MenuItems } from './MenuItems';
import { Link } from "react-router-dom";
import Logo from '../../media/img/logo.png';

import './Navbar.css';

class Navbar extends Component {

  state = {
    clicked: false
  }

  handleClick = () => {
    this.setState({clicked: !this.state.clicked})
  }

  render(){
    return(
      <nav className='NavbarItems'>
        <a href="/"> <img src={Logo} className="product-logo" alt="logo"></img></a>
        
        <div className='menu-icon'>
            <i className={ this.state.clicked ? 'fas fa-times' : 'fas fa-bars'} onClick={ this.handleClick }></i>
        </div>

        <ul className={ this.state.clicked ? 'nav-menu active' : 'nav-menu' }>
          {MenuItems.map((item,index) => {
            return(
              <Link className={item.cName} to={ item.url } key= { item.title }>{item.title}</Link>
            )
          })}
        </ul>

      </nav>
    )
  }
}

export default Navbar;
