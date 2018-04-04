import React from 'react';
import { MenuItem, InputGroup, DropdownButton, Image, Row, Col, Well, Panel, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import axios from 'axios';

import { postBooks, deleteBooks, getBooks, resetButton } from '../../actions/bookActions';
class BooksForm extends React.Component {

	constructor() {
		super();
		this.state = {
			images: [{}],
			img: ''
		}
	}

	componentDidMount() {
		this.props.getBooks();
		// GET IMAGES FROM API
		axios.get('/api/images')
			.then(function(response) {
				this.setState({images: response.data});
			}.bind(this))
			.catch(function(err) {
				this.setState({images: 'error loading image files from server', img: ''})
			})
	}

	handleSubmit() {
		const book = [{
			title: findDOMNode(this.refs.title).value,
			description: findDOMNode(this.refs.description).value,
			images: findDOMNode(this.refs.image).value,
			price: findDOMNode(this.refs.price).value,
		}];
		
		this.props.postBooks(book);
	}

	handleSelect(img) {
		this.setState({
			img: '/images/' + img
		})
	}

	resetForm(){
    //RESET THE Button
    this.props.resetButton();

    findDOMNode(this.refs.title).value = '';
    findDOMNode(this.refs.description).value = '';
    findDOMNode(this.refs.price).value = '';
    this.setState({img:''});
  }

	onDelete() {
		let bookId = findDOMNode(this.refs.delete).value;

		this.props.deleteBooks(bookId);
	}
	render(){
		const bookList = this.props.books.map(function(booksArr) {
			return (
				<option key = {booksArr._id}>{booksArr._id}</option>
			);
		});

		const imgList = this.state.images.map(function(imgArr, i) {
			return (
				<MenuItem 
				key={i} 
				eventKey={imgArr.name}
				onClick={this.handleSelect.bind(this, imgArr.name)}>{imgArr.name}</MenuItem>
			)
		}, this)
	    return(
	      <div>
	        <Well>
	          	<Row>
	          		<Col xs={12} sm={6}>
	          			
	          			 <InputGroup>
						      <FormControl type="text" ref="image" value={this.state.img} />
							      <DropdownButton
							        componentClass={InputGroup.Button}
							        id="input-dropdown-addon"
							        title="Select an image"
							        bsStyle="primary"
							      >
							       {imgList}
							      </DropdownButton>
					    </InputGroup>
					    <Image src={this.state.img} responsive/>
	          			
	          		</Col>
	          		<Col xs={12} sm={6}>
	          		
	          		<FormGroup controlId="title" validationState={this.props.validation}>
		                <ControlLabel>Title</ControlLabel>
		                <FormControl type="text"
		                 placeholder="Enter Title"
		                 ref="title" />
		                 <FormControl.Feedback/>
	                </FormGroup>

	                <FormGroup controlId="description" validationState={this.props.validation}>
		                <ControlLabel>Description</ControlLabel>
		                <FormControl type="text" placeholder="Enter Description" ref="description" />
		                <FormControl.Feedback/>
	                </FormGroup>

	                <FormGroup controlId="price" validationState={this.props.validation}>
		                <ControlLabel>Price</ControlLabel>
		                <FormControl type="text" placeholder="Enter Price" ref="price" />
		                <FormControl.Feedback/>
	                </FormGroup>

			        <Button
		                onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))}
		                bsStyle={(!this.props.style)?("primary"):(this.props.style)}>
		                {(!this.props.msg)?("Save book"):(this.props.msg)}
		            </Button>
			       

			        	 <FormGroup style={{marginTop:'25px'}} controlId="formControlsSelect" validationState={this.props.validation}>
					      <ControlLabel>Select</ControlLabel>
					      <FormControl ref="delete" componentClass="select" placeholder="select">
					        <option value="select">select</option>
					        {bookList}
					      </FormControl>
					    </FormGroup>
					    <Button 
					    bsStyle="danger"
					    onClick={this.onDelete.bind(this)}>
					    	Delete book
					    </Button>
	        		
	          		</Col>
	          	</Row>
	      </Well>
	    </div>
	    )
	  }
}

function mapStateToProps(state) {
	return {
		 books: state.books.books,
		 msg: state.books.msg,
    	style: state.books.style,
    	validation: state.books.validation
	};
}
// Dispatch action creator postBooks function
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		postBooks : postBooks,
		deleteBooks: deleteBooks,
		getBooks: getBooks,
		resetButton: resetButton
	}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);

