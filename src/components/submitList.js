import React, { Component } from 'react';
import Axios from 'axios';

const SubmitList = (props)=> {

  const handleListSubmit = (e)=> {
    e.preventDefault();
    console.log('submit this:',props);
    const today=new Date();
    const data={
      month: today.getMonth()+1,
      year: today.getFullYear(),
      list: props.list
    };
    Axios.post('/api/lists', data)
      .then(function(res) {
        console.log('post successful');
      });
  }

  return (
    <div className='row'>
      <form onSubmit={handleListSubmit}>
      Submit when you're done >>
      <button className='button btn btn-primary'>
        Submit
      </button>
      </form>
    </div>
  );
};

export default SubmitList;