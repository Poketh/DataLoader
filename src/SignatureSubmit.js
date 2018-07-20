import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';


class SignatureSubmit extends React.Component {
  render() {
    return(
      <div className="input-group input-group-sm mono">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">Hex Signature</span>
        </div>
        <TextField
          type="text"
          name="signature"
          className="form-control" placeholder="ef68d9d38ce151f13a6c8fad101b4d300e5e93155b4026378449ab455f2f9c4c127b21cf1ebdbf72e5cb49bc115f49003270e88358bf65f4c79b416af76f57311b"
          aria-label="Signature"
          aria-describedby="basic-addon1"
          onChange={(e) => {console.log(e.target.value)}}
        />
      </div>
    );
  }
}

export default SignatureSubmit;