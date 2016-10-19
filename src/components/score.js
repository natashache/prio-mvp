import React, { Component } from 'react';

const Score=(props)=> {
  if(props.score<0) {
    return (
      <div className='row col-md-10'>
        <br></br>
        <hr className='m-y-2'></hr>
        <a className='btn text-md-center' onClick={props.click}><h3 className='lead text-md-center'>Calculate your priority score for today >></h3></a>
      </div>
    )
  } else {
    return (
      <div className='row col-md-10'>
        <br></br>
        <hr className='m-y-2'></hr>
        <a className='btn text-md-center' onClick={props.click}><h3 className='lead text-md-center'>Calculate your priority score again >></h3></a>
        <br></br>
        <h2 className='text-md-center'>Your priority score today</h2>
        <p className='text-md-center lead'>(lower score is better)</p>
        <h2 className='text-md-center'><span style={{fontSize:'500%'}}  className="tag tag-warning">{props.score}</span></h2>

      </div>
    )
  }
};

export default Score;