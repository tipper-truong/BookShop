 import React from 'react';
import { connect } from 'react-redux';
import { Modal, Panel, Col, Row, Button, Well, ButtonGroup, Label } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { deleteCartItem, updateCart, updateTotal, getCart } from '../../actions/cartActions';
import { totalAmount } from '../helper';
class Cart extends React.Component {

	componentDidMount() {
		this.props.getCart();
	}

	constructor() 
	{
		super();
		this.state = {
			showModal:false
		}
	}

	open() {
		this.setState({showModal: true});
		this.props.updateTotal(totalAmount(this.props.cart).amount, totalAmount(this.props.cart).qty, this.props.cart); // 3rd param is current cart
	}

	close() {
		this.setState({showModal: false})
	}

	onDelete(_id) {

		const currentBookToDelete = this.props.cart;
			const indexToDelete = currentBookToDelete.findIndex(
				function(cart) {
					return cart._id === _id;
				}
			)

		let cartAfterDelete = [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)];
		this.props.deleteCartItem(cartAfterDelete);
	}

	onIncrement(_id) {
		this.props.updateCart(_id, 1, this.props.cart);
	}

	onDecrement(_id, quantity) {
		if(quantity > 1) {
			this.props.updateCart(_id, -1, this.props.cart); 
		}
	}

	render() {
		if(this.props.cart[0]) {
				return this.renderCart();
		} else {
				return this.renderEmpty();
		}
	}

	renderEmpty() {
		return(<div></div>);
	}

	renderCart() {
		const cartItemsList = this.props.cart.map(function(cartList) {
			return(
				<Panel.Body key={cartList._id}>
					<Row>
						<Col xs={12} sm={4}>
							<h6>{cartList.title}</h6><span>    </span>
						</Col>

						<Col xs={12} sm={2}>
							<h6>usd {cartList.price}</h6>
						</Col>

						<Col xs={12} sm={2}>
							<h6>qty. <Label bsStyle="success">{cartList.quantity}</Label></h6>
						</Col>

						<Col xs={6} sm={4}>
							<ButtonGroup style={{minWidth:'300px'}}>
								<Button 
								bsStyle="default" 
								bsSize="small"
								onClick={this.onDecrement.bind(this, cartList._id, cartList.quantity)}>
									-
								</Button>

								<Button 
								bsStyle="default" 
								bsSize="small"
								onClick={this.onIncrement.bind(this, cartList._id)}>
								+
								</Button>
								
								<span>     </span>

								<Button 
								bsStyle="danger" 
								bsSize="small"
								onClick={this.onDelete.bind(this, cartList._id)}>DELETE</Button>
							</ButtonGroup>
						</Col>
					</Row>
				</Panel.Body>
			);
		}, this);

		return(
			<Panel.Body
				header="Cart"
				bsStyle="primary">
				{cartItemsList}
				<Row>
					<Col xs={12}>
						<h6>Total amount: ${totalAmount(this.props.cart).amount}</h6>
						<Button 
						onClick={this.open.bind(this)}
						bsSize="small"
						bsStyle="success">
							PROCEED TO CHECKOUT
						</Button>
						<Modal show={this.state.showModal} onHide={this.close.bind(this)}>

							<Modal.Header closeButton>
								<Modal.Title>Thanks for shopping at BookShop</Modal.Title>
							</Modal.Header>

							<Modal.Body>
								<h6>Your order has been saved</h6>
								<p>You will receive an email confirmation</p>
							</Modal.Body>
							<Modal.Footer>
								<Col xs={6}>
									<h6>Total: ${totalAmount(this.props.cart).amount}</h6>
								</Col>
								<Button onClick={this.close.bind(this)}>Close</Button>
							</Modal.Footer>
						</Modal>
					</Col>
				</Row>
			</Panel.Body>
		);
	}
}


function mapStateToProps(state) {
	return {
		cart: state.cart.cart
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		deleteCartItem: deleteCartItem,
		updateCart: updateCart,
		updateTotal: updateTotal,
		getCart: getCart
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);