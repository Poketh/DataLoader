import React from 'react';
import ReactDOM from 'react-dom';

import './MatrixDescriptor.css';
import styled from 'styled-components';

const abi = [{"constant":false,"inputs":[{"name":"_itm","type":"uint64[20]"}],"name":"addItem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_pallete","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"_idx","type":"uint64"}],"name":"getItem","outputs":[{"name":"","type":"uint64[20]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}];

class MatrixDescriptor extends React.Component {
  constructor (props){
    super(props);

    this.paintCanvas = this.paintCanvas.bind(this);
  }

  componentDidMount(){
    var MD = window.web3.eth.contract(abi).at('0x4885a23e34ca136dc068bf2b900cd42c1dd71500');
    MD.getItem.call([this.props.num], (err, ans) => {
      this.paintCanvas(ans);
    });
  }

  paintCanvas(ans){
    let raw = ans.map(i => i['c'][0]);

    let sx = 5;
    let sy = 4;

    let hexdata = raw.map(d => {
      return [(0xFF0000 & d) >> 16, (0x00FF00 & d) >> 8, 0x0000FF & d, d === 0 ? 0 : 255]
    })

    let rdata = [].concat(...hexdata).slice()

    let canvas = this.refs.canvas; 
    canvas.width = sx;
    canvas.height = sy;

    let context = canvas.getContext( '2d' );

    let imageData = context.getImageData ( 0, 0, sx, sy );
    let data = imageData.data;

    for(let i = 0; i < rdata.length; i++){
      data[i] = rdata[i];
    }

    context.putImageData( imageData, 0, 0 );
  }

  render(){
    return(
      <canvas style={{padding:'10px'}} ref="canvas"/>
    );
  }
}

export default MatrixDescriptor;
