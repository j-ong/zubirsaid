import { retrieveInfo } from "../../connectionObject/connectionObject";
import Cytoscape from "cytoscape";
import React from "react";
import ReactDOM from "react-dom";
import CytoscapeComponent from 'react-cytoscapejs';
// import {ReactCytoscape} from 'react-cytoscape';
import cola from 'cytoscape-cola';
import popper from 'cytoscape-popper';


const makePopper = (ele) =>{
    // create a basic popper on the first node
    let popper1 = ele.popper({
        content: () => {
            let div = document.createElement("div");
            div.innerHTML = "Popper content";
            document.body.appendChild(div);
            return div;
        },
        popper: {} // my popper options here
    });
}

const touchInteraction = (evt,interaction_nature) =>{
    // console.log(interaction_nature+ e.target.id());
    console.log(evt.target);
    console.log(`Target.id() =  ${evt.target.id()}`);
    //makePopper(evt.target.id());

};

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




        initListeners() {
            this.cy.nodes().on('tap',
                function(evt){
                    touchInteraction(evt, 'tap');
                }
            );

            this.cy.nodes().on('click',
                function(evt){
                    touchInteraction(evt, 'click');
                }
            );


            // this.cy.animate(
            //     {
            //         pan: { x: 100, y: 100 },
            //         zoom: 2
            //     },
            //     {
            //         duration: 1000
            //     }
            // );

            // let popper1 = this.cy.nodes()[0].popper({
            //     content: () => {
            //         let div = document.createElement('div');
            //
            //         div.innerHTML = 'Popper content';
            //
            //         document.body.appendChild(div);
            //
            //         return div;
            //     },
            //     popper: {} // my popper options here
            // });


        }

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

        layout =
            {
                    name:"cola",
                    animate: true, // whether to show the layout as it's running
                    refresh: 1, // number of ticks per frame; higher is faster but more jerky
                    animationDuration:99999,
                    maxSimulationTime: 20000, // max length in ms to run the layout
                    ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
                    fit: true, // on every layout reposition of nodes, fit the viewport
                    padding: 30, // padding around the simulation
                    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
                    nodeDimensionsIncludeLabels: true, // whether labels should be included in determining the space used by a node

                    // layout event callbacks
                    ready: function(){}, // on layoutready
                    stop: function(){}, // on layoutstop

                    // positioning options
                    randomize: true, // use random node positions at beginning of layout
                    avoidOverlap: true, // if true, prevents overlap of node bounding boxes
                    handleDisconnected: true, // if true, avoids disconnected components from overlapping
                    convergenceThreshold: 0.01, // when the alpha value (system energy) falls below this value, the layout stops
                    nodeSpacing: function( node ){ return 10; }, // extra spacing around nodes
                    flow: undefined, // use DAG/tree flow layout if specified, e.g. { axis: 'y', minSeparation: 30 }
                    alignment: undefined, // relative alignment constraints on nodes, e.g. {vertical: [[{node: node1, offset: 0}, {node: node2, offset: 5}]], horizontal: [[{node: node3}, {node: node4}], [{node: node5}, {node: node6}]]}
                    gapInequalities: undefined, // list of inequality constraints for the gap between the nodes, e.g. [{"axis":"y", "left":node1, "right":node2, "gap":25}]

                    // different methods of specifying edge length
                    // each can be a constant numerical value or a function like `function( edge ){ return 2; }`
                    edgeLength: undefined, // sets edge length directly in simulation
                    edgeSymDiffLength: undefined, // symmetric diff edge length in simulation
                    edgeJaccardLength: undefined, // jaccard edge length in simulation

                    // iterations of cola algorithm; uses default values on undefined
                    unconstrIter: undefined, // unconstrained initial layout iterations
                    userConstIter: undefined, // initial layout iterations with user-specified constraints
                    allConstIter: undefined, // initial layout iterations with all constraints including non-overlap
            }


        render(){

            Cytoscape.use(cola);
            console.log(Cytoscape.prototype);
            try{
                Cytoscape.use(popper);
            }
            catch(err){
                console.log(err);
            }
                return(
                <React.Fragment>
                    <CytoscapeComponent
                        style={{
                            height:this.state.height,
                            width:this.state.width}}
                        elements={this.state.elements}
                        layout={this.layout}
                        cy = {(cy)=>{
                            this.cy = cy;
                            console.log(this.cy.prototype);
                            this.initListeners();
                            this.cy.nodes().forEach( element =>{
                                console.log(element);
                                    // makePopper(element);
                                }
                            )

                        }}

                    />

                </React.Fragment>
            )
        }
}
