import React, { Component } from 'react';
// assets
import Zubirold from './../../../assets/images/zs/zubirscore.jpeg';
import Zubirpres from './../../../assets/images/zs/zubirpres.jpeg';
import Zubirscore from './../../../assets/images/zs/zubircompose.jpeg';

import {
    Button
} from '@material-ui/core';

class PicGallery extends Component {   

    state = {
        index: 0, 
        picList: [Zubirold, Zubirpres, Zubirscore]
      }

      onClickNext= () => {
          if (this.state.index + 1 === this.state.picList.length ){
              this.setState({ 
                  index: 0 
                })
            } else {
                this.setState({
                    index: this.state.index + 1
                })
            }

          }
          onClickPrevious= () => {
            if (this.state.index - 1 === -1 ){
                this.setState({ 
                    index: this.state.picList.length - 1
                  })
              } else {
                  this.setState({
                      index: this.state.index - 1
                  })
              }
            }
      
      render() {
        return (
          <div>
            <img src={this.state.picList[this.state.index]} width="600px"/> <br/>
            <Button variant="contained" disableElevation onClick={this.onClickPrevious}> Previous </Button>
            <Button variant="contained" disableElevation onClick={this.onClickNext} style={{"margin-left":"5px", }}> Next </Button>
          </div>
        );
      }

}


export default PicGallery;