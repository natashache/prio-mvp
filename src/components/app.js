import React, { Component } from 'react';
import Container from './container';
import Inputbox from './inputBox';
import TimeTracker from './timeTracker';
import Axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      list:[]
    };
    this.handleListInput=this.handleListInput.bind(this);
  }

  componentWillMount() {
    const that=this;
    const today=new Date();
    const entry={
      month: today.getMonth()+1,
      year: today.getFullYear(),
      user: 'camilliatree'
    };
    this.serverRequest=Axios.get('/api/lists', {
          params:entry
    })
      .then(function(res) {
        if(res.data.length>0) {
          that.setState({
            list:res.data
          })
        }
      })
      .catch(function(err) {
        console.log(err);
      });

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
        <div className='page-header'>
          <h1 className='display-3'>Prio</h1>
          <p className='lead'>
            Keeps you on track to achieve what really matters
          </p>
          <hr className='m-y-2'></hr>
        </div>
        <br></br>
        <div className='row'>
          <div className='col-md-8'>
            <Inputbox addToList={this.handleListInput}/>
            <Container list={this.state.list}/>
          </div>
          <div className='col-md-4 pull-right'>
            <TimeTracker />
          </div>
        </div>
      </div>
    );
  }
}
