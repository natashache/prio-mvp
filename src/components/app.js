import React, { Component } from 'react';
import Container from './container';
import Inputbox from './inputBox';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      list:[]
    };
    this.handleListInput=this.handleListInput.bind(this);
  }

  handleListInput(inputText) {
    const input={text:inputText,order:this.state.list.length+1,id:this.state.list.length+1};
    this.setState({
      list:[...this.state.list,input]
    });
  }

  render() {
    return (
      <div>
        <div>
          <h1>Prio</h1>
          <br></br>
        </div>
        <Inputbox addToList={this.handleListInput}/>
        <Container list={this.state.list}/>
      </div>
    );
  }
}
