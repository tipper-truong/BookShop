"use strict"
import React from 'react';
import { connect } from 'react-redux'; // accesses the redux store
import { bindActionCreators } from 'redux';
import { getBooks } from '../../actions/bookActions';
import { Carousel, Panel, Col, Grid, Row, Button } from 'react-bootstrap';

import BookItem from './bookItem';
import BookForm from './booksForm';
import Cart from './cart';

class BooksList extends React.Component 
{
	componentDidMount() {
		// from dispatching an action creator (getBooks)
		this.props.getBooks();
	}
	render() {
		const booksList = this.props.books.map(function(booksList, i) {
			return (
				<Col key={i} xs={12} sm={6} md={4}>
					<BookItem 
						_id={booksList._id}
						title={booksList.title}
						description={booksList.description}
						images={booksList.images}
						price={booksList.price}
						/>
				</Col>

			)
		})
		return (
			<Grid>
				<Row>
					<Carousel>
					  <Carousel.Item>
					    <img width={900} height={500} alt="900x300" src="/images/home1.jpg" />
					    <Carousel.Caption>
					      <h3>First slide label</h3>
					      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
					    </Carousel.Caption>
					  </Carousel.Item>
					  <Carousel.Item>
					    <img width={900} height={500} alt="900x300" src="/images/home2.jpg" />
					    <Carousel.Caption>
					      <h3>Second slide label</h3>
					      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					    </Carousel.Caption>
					  </Carousel.Item>
					</Carousel>
				</Row>
				<Row>
					<Panel bsStyle="primary">
					 <Panel.Heading>
				      <Panel.Title componentClass="h3">Cart</Panel.Title>
				    </Panel.Heading>
					<Cart />
					</Panel>
					
				</Row>
				<Row style={{marginTop: '15px'}}>
					{booksList}
				</Row>
			</Grid>
		)
	}
}

// Responsible for returning a piece of state that
// we want to request
function mapStateToProps(state) {
	return {
		books: state.books.books
	};
}

// Returns a bind action creator
// Responsible for calling action creator getBooks in bookActions.js
// Once it's called, this.props.books can retrieve
// Bind action is a method which dispatch the action you are passing as an object
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getBooks : getBooks
	}, dispatch)
}
// connect the component to the store
export default connect(mapStateToProps, mapDispatchToProps)(BooksList);