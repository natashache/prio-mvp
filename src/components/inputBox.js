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
        <div className='col-md-10'>
          <form className='input-group input-group-lg' onSubmit={this.handleFormSubmit}>
            <input
              className='form-control'
              placeholder="Write down your top 5 priorities for this month and rank them..."
              value={this.state.text}
              onChange={this.handleInputChange}/>
              <span className="input-group-addon" id="sizing-addon2">&#9998;</span>
          </form>
        </div>
      </div>
    );
  }
}