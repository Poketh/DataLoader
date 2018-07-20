import React, { Component } from 'react';

class DataDisplay extends React.Component {
  render() {
    return(
      <div className='sticky-display'>
        <h4 style={{color: this.props.white}}>
          {this.props.display}
        </h4>
        <div style={{color: this.props.white}}>
          <img style={{width:'32px', height:'auto'}} src={this.props.logo}/> x {this.props.displayBalance}
        </div>
        <div className='border border-white mt-5'>
          <img
            className='data-display animated bounce p-5'
            src={this.props.displayImg}
          />
        </div>
      </div>
    );
  }
}

export default DataDisplay;