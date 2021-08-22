import { retrieveInfo } from "../../connectionObject/connectionObject";
import cytoscape from "cytoscape"
import React from "react";
import ReactDOM from "react-dom";
import CytoscapeComponent from 'react-cytoscapejs';

export default class Cytoscape extends React.Component {

        state = {
            width:200,
            height:200,
            elements:[]
        }

        constructor(props) {
            super(props);
            this.state.width = props.width;
            this.state.height = props.height;
            this.state.elements = props.elements;
        }


        componentDidMount =(width,height) => {
            this.setState({
                width:width,
                height:height,
            });
        }

        setUpListeners = () => {
            this.cy.on('click','node',(event) => {
                console.log(event.target);
            });
        }

        render(){
            return(
                <React.Fragment>
                    <CytoscapeComponent
                        elements={this.state.elements}
                        style = {{
                            width: this.state.width,
                            height: this.state.height
                        }}
                        cy = {(cy)=>{this.cy = cy}}
                    />
                </React.Fragment>
            )
        }


}