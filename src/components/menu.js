import React from 'react';
import { Nav, NavItem, Navbar, Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCart } from '../actions/cartActions';
import { totalAmount } from './helper';

class Menu extends React.Component {

  componentDidMount() {
    this.props.getCart();
  }

	render(){
        return(
          <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">BookShop</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/about">About</NavItem>
            <NavItem eventKey={2} href="/contacts">Contact Us</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="/admin">Admin</NavItem>
            <NavItem eventKey={2} href="/cart">Your Cart
              <span>    { (totalAmount(this.props.cart).qty > 0)?( // if # of items in cart is > 0
                <Badge className="badge">
                {totalAmount(this.props.cart).qty}</Badge>):('')}
                {/* display the # of items in cart, if zero items, display nothing  :{''} */}
              </span>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      )
    }
}

function mapStateToProps(state) {
	return { 
		cart: state.cart.cart
	}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCart : getCart
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);