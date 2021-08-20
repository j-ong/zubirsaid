import { retrieveInfo } from "../../connectionObject/connectionObject";
import Cytoscape from "cytoscape";
import React from "react";
import ReactDOM from "react-dom";
import CytoscapeComponent from 'react-cytoscapejs';
// import {ReactCytoscape} from 'react-cytoscape';
import cola from 'cytoscape-cola';


export const nodeStyle={
    shape:'rectangle',
    boundingBox:true,
}
export const edgeStyle={

}


export class CytoscapeObj extends React.Component {

        state = {
            width:200,
            height:200,
            elements:[],
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
        };


        //
        // initListeners()  {
        //     this.cy.on('tap', 'node', evt => {
        //         var node = evt.target;
        //         console.log('tapped ' + node.id());
        //     })
        // }
        //
        // componentWillUnmount() {
        //     console.log('remove listeners')
        //     if (this.cy) {
        //         this.cy.removeAllListeners()
        //     }
        // }
        //
        setUpListeners = () => {
            this.cy.on('click','node',(event) => {
                console.log(event.target);
                alert("HelloWorld!");
            });
        };



        render(){
            Cytoscape.use(cola);

                return(
                <React.Fragment>
                    <CytoscapeComponent
                        //stylesheet={this.state.cytoscape_style}
                        style={{
                            height:this.state.height,
                            width:this.state.width}}
                        elements={this.state.elements}
                        layout={{
                            name:"cola",
                            animate:true,
                            randomize:true,
                            avoidOverlap:true,
                            padding:20,
                            refresh: 1,
                        }}
                        cy = {(cy)=>{
                            this.cy = cy;
                        }}
                    />

                </React.Fragment>
            )
        }
}
