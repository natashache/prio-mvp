import React, { Component } from 'react';


export default class Inputbox extends Component {
  constructor(props) {
    super(props);
    this.state={
      text:''
    };
    this.handleInputChange=this.handleInputChange.bind(this);
    this.handleFormSubmit=this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.props.addToList(this.state.text);
    this.setState({
      text: ''
    });
  }

  handleInputChange(e) {
    this.setState({
      text:e.target.value
    });
  }

  render() {
    return (
      <div className='row'>
        <form className='col-md-5, input-group' onSubmit={this.handleFormSubmit}>
          <input
            className='form-control'
            placeholder="Write down 3-5 priorities for your life"
            value={this.state.text}
            onChange={this.handleInputChange}/>
          <div className='input-group-addon'>
            <span>&#9998;</span>
          </div>
        </form>
      </div>
    );
  }
}