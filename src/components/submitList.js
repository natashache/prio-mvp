import React, { Component } from 'react';
import Axios from 'axios';

const SubmitList = (props)=> {

  const handleListSubmit = (e)=> {
    e.preventDefault();
    console.log('submit this:',props);
    const today=new Date();
    const entry={
      month: today.getMonth()+1,
      year: today.getFullYear(),
      list: props.list,
      user: 'camilliatree'
    };
    // const clientId='MLLKPtP5gnWbqLeHf9E4AA';
    // const redirectUri=encodeURIComponent('http://localhost:3000/oauth_redirect');
    // const src=`https://camilliatree.harvestapp.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=optional-csrf-token&response_type=token`;
    // Axios.post('/api/lists', data)
    Axios({
      method:'post',
      url:'/api/lists',
      data:entry
      }).then(function(res) {
        console.log('response:',res);
      });
    // const authCode=btoa('ilovewordsworth@gmail.com:che042382');
    const authCode='aWxvdmV3b3Jkc3dvcnRoQGdtYWlsLmNvbTpjaGUwNDIzODI=';
    // const config={
    //   // headers:{'Acces-Control-Allow-Origin': '*'}
    //   Method: 'get',
    //   url: 'https://camilliatree.harvestapp.com/projects',
    //   Authorization: 'Basic '+authCode,
    //   'ContentType': 'application/json',
    //   Accept: 'application/json'
    // };
    // Axios(config)
    //       .then(function(res) {
    //         console.log('response:',res);
    //       });
  }

  return (
    <div className='row offset-md-5'>
      <form onSubmit={handleListSubmit} className='pull-right'>
      <label className='pull-right'>Submit when you're done >>  </label>
      <button className='button btn btn-default'>
        Submit
      </button>
      </form>
    </div>
  );
};

export default SubmitList;