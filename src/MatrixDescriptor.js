import React from 'react';

import './MatrixDescriptor.css';

const abi = [{"constant":false,"inputs":[{"name":"_itm","type":"uint64[20]"},{"name":"_title","type":"string"}],"name":"addItem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_idx","type":"uint64"},{"name":"_itm","type":"uint64[20]"},{"name":"_title","type":"string"}],"name":"editItem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_pallete","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"_idx","type":"uint64"}],"name":"getItem","outputs":[{"name":"","type":"uint64[20]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_idx","type":"uint64"}],"name":"getItemTitle","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"idx","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"matrixSize","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"xsize","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ysize","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"}];


class MatrixDescriptor extends React.Component {
  constructor (props){
    super(props);

    this.state = {
      name: "",
    };

    this.paintCanvas  = this.paintCanvas.bind(this);
    this.handleChoose = this.handleChoose.bind(this);
  }

  componentDidMount(){
    var MD = window.web3.eth.contract(abi).at('0x845c58071db537e86613525ee1c9a8b67ef47c86');

    MD.getItem.call([this.props.num], (err, ans) => {
      if(ans) this.paintCanvas(ans);
    });

    MD.getItemTitle.call([this.props.num], (err, ans) => {
      if(ans) this.setState({name: ans});
    });
  }

  handleChoose(e){
    this.props.getChoice(this.props.num,
                         this.state.name,
                         this.refs.canvas,
                         this.state.sx,
                         this.state.sy);
  }

  paintCanvas(ans){
    let raw = ans.map(i => i['c'][0]);

    let sx = 5;
    let sy = 4;

    let hexdata = raw.map(d => {
      return [(0xFF0000 & d) >> 16, (0x00FF00 & d) >> 8, 0x0000FF & d, d === 0 ? 0 : 255]
    })
    

    let rdata     = [].concat(...hexdata).slice()
    let canvas    = this.refs.canvas; 

    let nsx = 1, nsy = 1;
    for(let i = 1; i < 5; i++){
      for(let j = 1; j < 4; j++){
        if(raw[j*5-i] !== 0){
          nsx = 6-i;
          i = j = 100;
        }
      }
    }

    for(let i = 4; i > 0; i--){
      for(let j = 5; j > 0; j--){
        if(raw[i*5-j] !== 0){
          nsy = i;
          i = j = 0;
        }
      }
    }

    canvas.width  = nsx;
    canvas.height = nsy;

    let context   = canvas.getContext( '2d' );

    let imageData = context.getImageData(0, 0, sx, sy);
    let data      = imageData.data;


    for(let i = 0; i < rdata.length; i++){
      data[i] = rdata[i];
    }

    context.putImageData(imageData, 0, 0);

    this.setState({sx: nsx, sy: nsy});
  }

  render(){

    const sx      = this.state.sx;
    const sy      = this.state.sy;
    const caught  = this.props.caught ? "zoom" : "zoom-gray";

    return(
      <div
        onClick={this.handleChoose}
        className={caught + ' ' + 'animated bounce'} 
        style={{display: 'inline-block', textAlign: 'center'}}
      >
        <canvas ref="canvas" style={{width: sx * 10}}/>
      </div>
    );
  }
}

export default MatrixDescriptor;
