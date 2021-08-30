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
            tempModal:false,
            modal_arrayInit:false,
            modal_array:[],
            modal_obj:{},
            cy:null,
            test:"",
        };

        width=400;

        constructor(props) {
            super(props);
            this.state.width = props.width;
            this.state.height = props.height;
            this.state.elements = props.elements;
            this.state.listenersInit = false;
        }

        componentDidMount =(width,height) => {
            this.setState({
                width:width,
                height:height,
            });
        };



        initListeners(home_object) {
            let test_debug=true;
            console.log(this.state.modal_array);
            this.state.modal_array=[this.cy.nodes()[0].id().replace("node_","popup_")];
            this.state.modal_obj={0:{}};

            this.cy.nodes().forEach( node =>{

                let popupId = node.id().replace("node_","popup_");

                popupId !== this.state.modal_array[0] && this.state.modal_array.push(popupId);

                this.state.modal_obj[popupId]= {itemID:popupId};
                this.state.modal_obj[popupId].showChild = false;
                node.showChild=true;
            });
            delete this.state.modal_obj[0];
            // test_debug && console.log("modalArray");
            // test_debug && console.log(this.state.modal_array);
            // test_debug && console.log("modalObj");
            // test_debug && console.log(this.state.modal_obj);

            this.cy.nodes().on('click',
                function(e){
                    // console.log(e);
                    let current_node_id = e.target.id();
                    test_debug && console.log("Elements");
                    test_debug && console.log(e.cy.nodes());
                    let current_node = e.cy.nodes().getElementById(current_node_id);
                    test_debug && console.log("Current Node");
                    test_debug && console.log(current_node.addClass("showChild"));
                    let popupId = current_node_id.replace("node_","popup_");
                    console.log(current_node);
                    current_node.showChild=true;

                    current_node.data().showChild=true;
                    // home_object.state.modal_obj[popupId].showChild=true;
                    //test_debug &&  console.log(home_object.state.modal_obj[popupId]);

                }
            );
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

        //
        // renderDraggable(){
        //
        //     return(
        //         <DraggableDialog
        //             itemID={"a"}
        //             showChild={true}
        //         />
        //     )
        // }



        render(){
            this.state.cyto = cytoscape.use(cola);
            return(
            <React.Fragment>
                <Grid container>
                    <Grid itemID={"CytoscapeBox"} sx={{ width: 1/2 }}>
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
                                            this.initListeners(this);
                                        }
                                        this.modal_array = this.state.modal_array;
                                        this.modal_obj = this.state.modal_obj;
                                        this.state.listenersInit = true;
                                    }}
                                />
                            )
                        }
                    </Grid>

                    <Grid itemID={"PopupBox"} bgcolor={"aliceblue"} sx={{ width: 1/2 }}>
                         <h2>Description:</h2>
                        <div itemID={"PopupDiv"}>
                            <span>Test</span>
                            {
                                console.log("State.cy")
                            }
                            {
                                console.log(this.state.cy.props.elements)
                            }
                            {/*{*/}
                            {/*    !this.state.modal_arrayInit &&*/}
                            {/*    this.state.cy.props.elements.forEach(element=>{*/}
                            {/*            if(element.className.includes("nodes")){*/}
                            {/*                let itemID = element.data.id.replace("node_","popup_");*/}
                            {/*                this.state.modal_array.push(itemID);*/}
                            {/*                this.state.modal_obj[itemID] = { itemID:itemID};*/}
                            {/*                //this.state.modal_obj[itemID].showChild=false;*/}
                            {/*                this.state.modal_arrayInit=true;*/}
                            {/*            }*/}
                            {/*        }*/}
                            {/*    )*/}
                            {/*}*/}
                            {/*{*/}
                            {/*    (this.state.modal_array.length>0) && this.state.cy.props.elements.map(element=>(*/}
                            {/*            console.log(element)*/}
                            {/*        )*/}
                            {/*    )*/}
                            {/*}*/}
                            {/*{*/}
                            {/*(this.state.modal_array.length>0) && this.state.cy.props.elements.map(element=>(*/}
                            {/*        console.log(`ShowChild:${element.data.showChild} Classes:${element.classes}`)*/}
                            {/*    )*/}
                            {/*)*/}
                            {/*}*/}
                            {/*{*/}
                            {/*    (this.state.modal_array.length>0) && this.state.cy.props.elements.map(element=>(*/}
                            {/*            element.classes.includes("showChild") &&*/}
                            {/*            <DraggableDialog*/}
                            {/*                itemID={element.data.id().replace("node_","popup_")}*/}
                            {/*                showChild={true}*/}
                            {/*            />*/}
                            {/*        )*/}
                            {/*    )*/}
                            {/*}*/}
                            {/*{*/}
                            {/*    (this.state.modal_array.length>0) && this.state.cy.props.elements.map(element=>(*/}
                            {/*            element.showChild &&*/}
                            {/*            <DraggableDialog*/}
                            {/*                itemID={element.data.id().replace("node_","popup_")}*/}
                            {/*                showChild={true}*/}
                            {/*            />*/}
                            {/*        )*/}
                            {/*    )*/}
                            {/*}*/}
                            {
                                (this.state.modal_array.length>0) && this.state.modal_array.map(item=>(
                                    <DraggableDialog
                                        itemID={this.state.modal_obj[item].itemID}
                                        showChild={this.state.modal_obj[item].showChild}
                                    />
                                    )
                                )
                            }
                            {
                                (this.state.modal_array.length>0) && this.state.modal_array.map(item=>(
                                        console.log(this.state.modal_obj[item])
                                    )
                                )
                            }
                        </div>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
        }
}



