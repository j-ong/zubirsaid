// import { retrieveInfo } from "../../connectionObject/connectionObject";
import cytoscape from "cytoscape";
import ReactDOM from 'react-dom';
import React from "react";
import CytoscapeComponent from 'react-cytoscapejs';
import cola from 'cytoscape-cola';
import Grid from '@material-ui/core/Grid';
import{ DraggableDialog} from './NodeDraggable'



export class CytoscapeObj extends React.Component {

        state = {
            width:300,
            height:300,
            elements:[],
            listenersInit:false,
            cytoscape_data:null,
            cy:null,
            test:"",
        };

        width=400;

        constructor(props) {
            super(props);
            this.state.width = props.width;
            this.state.height = props.height;
            this.state.elements = props.elements;
            this.state.cytoscape_data = props.cytoscape_data;
            this.state.listenersInit = false;
        }

        componentDidMount =(width,height) => {
            this.setState({
                width:width,
                height:height,
            });
        };

        initListeners(home_object, callback_func) {
            this.cy.nodes().forEach( node =>{
                node.showChild=false;
                node.cytoClass=["node"];
            });
            this.cy.edges().forEach( edge =>{
                edge.showChild=false;
                edge.cytoClass=["edge"];
            });

            this.cy.nodes().on('click',
                function(e){
                    let current_node_id = e.target.id();
                    let current_node = e.cy.nodes().getElementById(current_node_id);
                    current_node.showChild=true;
                    callback_func(e);
                }
            );
        }


        renderDraggable(e){
            let elements_array = e.cy.elements();
            let node_array = elements_array.filter(element=>
                element.cytoClass.includes("node")
            );
            function renderDraggableItem(input_array){
                let return_arr = [];

                input_array.forEach(node=>(
                    return_arr.push(
                        <DraggableDialog
                        itemID={node.data().id.replace("node_","popup_")}
                        showChild={node.showChild}
                        data={e.cy.cytoscape_data[node.data().id.replace("node_","")]}
                        // nodeClickPosition={{x:e.renderedPosition.x,y:e.renderedPosition.y}}
                        />
                    )
                ));
                return(
                    return_arr
                )
            }

            function renderDraggableItems(input_array){
                ReactDOM.render(
                    <React.Fragment>
                        {
                            renderDraggableItem(input_array)
                        }
                    </React.Fragment>,
                    document.getElementById("PopupDiv")
                )
            }

            renderDraggableItems(node_array);
        }

        layout =
            {
                    name:"cola",
                    height:this.state.height,
                    width: this.state.width,
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
            cytoscape.use(cola);
            return(
            <React.Fragment>
                <Grid container>
                    <Grid id={"CytoscapeBox"}  itemID={"CytoscapeBox"} sx={{ width: 1/2 }}>
                        <h2>Cytoscape:</h2>
                        {
                            this.state.cy =(
                                <CytoscapeComponent
                                    style={{
                                        height:this.state.height,
                                        width:this.state.width,
                                    }}
                                    elements={this.state.elements}
                                    layout={this.layout}
                                    cy = {(cy)=>{
                                        this.cy=cy;
                                        if(!this.state.listenersInit){
                                            this.initListeners(this,this.renderDraggable);
                                        }
                                        this.state.listenersInit = true;
                                        this.cy.cytoscape_data = this.state.cytoscape_data;
                                    }}

                                />
                            )
                        }
                    </Grid>
                    <Grid itemID={"PopupBox"} bgcolor={"aliceblue"} sx={{ width: 1/2 }}>
                        <h2>Description:</h2>
                        <div id={"PopupDiv"} itemID={"PopupDiv"}>
                        </div>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
        }
}



