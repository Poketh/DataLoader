import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Card, Divider } from 'antd';

import './MatrixDescriptor.css';
import styled from 'styled-components';

const abi = [{"constant":false,"inputs":[{"name":"_itm","type":"uint64[20]"},{"name":"_title","type":"string"}],"name":"addItem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_idx","type":"uint64"},{"name":"_itm","type":"uint64[20]"},{"name":"_title","type":"string"}],"name":"editItem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_pallete","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"_idx","type":"uint64"}],"name":"getItem","outputs":[{"name":"","type":"uint64[20]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_idx","type":"uint64"}],"name":"getItemTitle","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"idx","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"matrixSize","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"xsize","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ysize","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"}];

class MatrixDescriptor extends React.Component {
  constructor (props){
    super(props);

    this.state = {
      xoff: 0,
      yoff: 0,
      name: "",
    };

    this.paintCanvas = this.paintCanvas.bind(this);
  }

  componentDidMount(){
    // 0x4885a23e34ca136dc068bf2b900cd42c1dd71500
    var MD = window.web3.eth.contract(abi).at('0x845c58071db537e86613525ee1c9a8b67ef47c86');

    MD.getItem.call([this.props.num], (err, ans) => {
      this.paintCanvas(ans);
    });

    MD.getItemTitle.call([this.props.num], (err, ans) => {
      this.setState({name: ans});
    });
  }

  paintCanvas(ans){
    let raw = ans.map(i => i['c'][0]);

    let sx = 5;
    let sy = 4;

    let hexdata = raw.map(d => {
      return [(0xFF0000 & d) >> 16, (0x00FF00 & d) >> 8, 0x0000FF & d, d === 0 ? 0 : 255]
    })


    let cx = 0, cy = 0;

    let lc = 0;
    for(let i = 0; i < 4; i++){
      let accx = 0;
      let ctx = 0;
      for(let j = 0; j < 5; j++){
        if(raw[j + i*5] !== 0){
          accx += j-2;
          ctx++;
        }
      }
      if(ctx > 0){
        cx += (accx);
        lc += ctx;
      }
    }

    console.log(cx, this.props.num)
    const xoff = -cx/lc * 25;

    lc = 0;
    for(let i = 0; i < 5; i++){
      let accy = 0;
      let cty = 0;
      for(let j = 0; j < 4; j++){
        if(raw[i + j*5] !== 0){
          accy += j-2;
          cty++;
        }
      }
      if(cty > 0){
        cy += (accy);
        lc += cty;
      }
    }

    const yoff = -cy/lc * 25;

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

    context.putImageData( imageData, 0, 0);

    this.setState({xoff: xoff, yoff: yoff});
  }

  render(){
    const off = this.state.xoff;
    const off2 = this.state.yoff;

    return(
      <Col span={2} offset={0}>
        <div style={{marginLeft: off, marginTop: off2}}>
          <canvas ref="canvas"/>
        </div>
      </Col>
    );
  }
}

export default MatrixDescriptor;
