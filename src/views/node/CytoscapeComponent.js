import { retrieveInfo } from "../../connectionObject/connectionObject";
import Cytoscape from "cytoscape";
import React from "react";
import ReactDOM from "react-dom";
import CytoscapeComponent from 'react-cytoscapejs';
// import {ReactCytoscape} from 'react-cytoscape';
import cola from 'cytoscape-cola';


export const nodeStyle=(label=null)=>{
    return(
        {
            shape:'round-rectangle',
            boundingBox:true,
            "text-max-width":20,
            "font-size":10,
            "compound-sizing-wrt-labels":"include",
            "text-wrap":"wrap",
            "text-overflow-wrap":"whitespace",
            "text-halign":"center",
            "text-valign":"center",
        }
    )
}

export const nodeMainStyle=(label=null)=>{
    return(
        {
            label:label,
            shape:'circle',
            boundingBox:true,
            "text-max-width":20,
            "background-color":"#add8e6",
            "font-size":10,
            "compound-sizing-wrt-labels":"include",
            "text-wrap":"wrap",
            "text-overflow-wrap":"whitespace",
            "text-halign":"center",
            "text-valign":"center",
        }
    )
}


export const edgeStyle=(label=null)=>{
    return(
        {
            label:label,
            "text-rotation":"autorotate",
            "font-size":10,
            "text-wrap":"wrap",
            "text-max-width":100,
            "text-overflow-wrap":"whitespace",
            "text-halign":"center",
            "text-valign":"top",
        }
    )
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
