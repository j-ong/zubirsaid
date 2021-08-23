import React, { useReducer } from 'react';
import axios from 'axios';
import MainlistContext from './mainlistContext';
import MainlistReducer from './mainlistReducer';
import { GET_CARDS, GET_NODES, SET_LOADING } from '../types';
import { nodeStyle, nodeMainStyle, edgeStyle, } from '../../views/node/CytoscapeStyle';

const MainlistState = (props) => {
    const initialState = {
        cards: [],
        nodes: [],
        nodeSummary: [],
        loading: false
    };

    const [state, dispatch] = useReducer(MainlistReducer, initialState);

    //Get Cards
    const getCards = async () => {
        setLoading();
        const res = await axios.get('https://chriskhoo.net/ZS/0/Person');

        var data = res.data;
        var loopData = [];
        for (var i = 0; i < data.length; i++) {
            loopData.push(data[i]._fields[2].properties);
        }

        dispatch({
            type: GET_CARDS,
            payload: loopData
        });
    };

    //Get Nodes
    const getNodes = async (nodeid) => {
        setLoading();

        const res = await axios.get(`https://chriskhoo.net/ZS/0/${nodeid}`);

        var data = res.data;

        /*For Testing Purposes*/
        console.log(res.data);

        var loopData = [];
        var groups = [];


        /*Cytoscape Portion (START)*/
        let cytoscape_main_node = 'node_' + data[0]._fields[0].properties.id
        let current_node_name = '';
        let cytoscape_nodes = [
            {
                data:     { id: cytoscape_main_node, label: data[0]._fields[0].properties.label},
                // position: { x: 50, y: 100 }
                style:nodeMainStyle(data[0]._fields[0].properties.label)
            },
        ];
        let cytoscape_edges = [];
        /*Cytoscape Portion (END)*/

        for (var i = 0; i < data.length; i++) {
            loopData.push(data[i]._fields);

            //group by type
            var groupName = data[i]._fields[1].properties.label; //e.g. score, can change to [1].type if want to show type instead

            //capitalise first letter of the group name
            groupName = groupName.charAt(0).toUpperCase() + groupName.slice(1);

            if (!groups[groupName]) {
                groups[groupName] = [];
            }
            groups[groupName].push(data[i]._fields[2].properties);


            /*Cytoscape Portion (START)*/
            current_node_name = "node_" + data[i]._fields[2].properties.id
            cytoscape_nodes.push(
                {
                    data:     {
                        id: current_node_name,
                        label: data[i]._fields[2].properties.label,

                    },
                    style:nodeStyle(data[i]._fields[2].properties.label)

                    // position: { x: 50, y: 100 }
                }
            );
            cytoscape_edges.push(
                {
                    data: {
                        id: "edge_" + cytoscape_main_node + "_" + current_node_name,
                        source: cytoscape_main_node,
                        target: current_node_name,
                        label:data[i]._fields[1].type,
                    },
                    style:edgeStyle(data[i]._fields[1].type)
                },
            );
            /*Cytoscape Portion (END)*/
        }

        //push grouped results into nodeArray based on i.e. realization
        var nodeArray = [];
        for (groupName in groups) {
            nodeArray.push({
                group: groupName,
                properties: groups[groupName]
            });

            //filter out any subclasses cards
            // if (groupName !== 'Subclass of') {
            //     nodeArray.push({
            //         group: groupName,
            //         properties: groups[groupName]
            //     });
            // }
        }


        var nodeSummary = data[0]._fields[0].properties;

        dispatch({
            type: GET_NODES,
            payload: nodeArray,
            payload_cytoscape_nodes:cytoscape_nodes,
            payload_cytoscape_edges:cytoscape_edges,
            summary: nodeSummary
        });
    };

    //Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    return (
        <MainlistContext.Provider
            value={{
                cards: state.cards,
                nodes: state.nodes,
                cytoscape_nodes: state.cytoscape_nodes,
                cytoscape_edges: state.cytoscape_edges,
                nodeSummary: state.nodeSummary,
                loading: state.loading,
                getCards,
                getNodes
            }}
        >
            {props.children}
        </MainlistContext.Provider>
    );
};

export default MainlistState;
