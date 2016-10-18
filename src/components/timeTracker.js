import React, { Component } from 'react';

export default class TimeTracker extends Component {
  render() {
    const platform='camilliatree';
    const permalink=encodeURIComponent('http://localhost:3000/');
    const src=`https://platform.harvestapp.com/platform/timer?
              app_name=Prio&
              closable=true&
              permalink=${permalink}&
              external_item_id=1&
              external_item_name=something&
              chromeless=false`;
    const style= {
      height: '275px',
      borderColor: 'transparent'
    };

    return (
      <div className=''>
        <iframe src={src} style={style} >
        </iframe>
      </div>
    )
  }
}