import React, { useReducer } from 'react';
import axios from 'axios';
import MainlistContext from './mainlistContext';
import MainlistReducer from './mainlistReducer';
import { GET_CARDS, GET_NODES, SET_LOADING } from '../types';

const MainlistState = (props) => {
    const initialState = {
        sidebarSongList: {},
        cards: [],
        nodes: [],
        nodeSummary: [],
        loading: false
    };

    const [state, dispatch] = useReducer(MainlistReducer, initialState);

    //Get Sidebar List
    // const getSidebarSongList = async () => {
    //     const res = await axios.get('https://chriskhoo.net/ZS/0/MusicalWork');

    //     var data = res.data;
    //     var loopData = [];
    //     for (var i = 0; i < data.length; i++) {
    //         loopData.push(data[i]._fields[2].properties);
    //     }

    //     var subNavigationList = {};

    //     // setSongList(loopData);
    //     if (loopData) {
    //         for (const data in loopData) {
    //             subNavigationList.push({
    //                 id: data.id,
    //                 title: data.label,
    //                 type: 'item',
    //                 url: `/node/${data.id}`,
    //                 target: true
    //             });
    //         }
    //     }

    //     dispatch({
    //         type: SET_SIDEBAR_SONGLIST,
    //         payload: subNavigationList
    //     });
    // };

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
        var loopData = [];
        var groups = [];
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
        }

        //push grouped results into nodeArray based on i.e. realization
        var nodeArray = [];
        for (groupName in groups) {
            if (groupName !== 'Subclass of') {
                nodeArray.push({
                    group: groupName,
                    properties: groups[groupName]
                });
            }
        }

        var nodeSummary = data[0]._fields[0].properties;

        dispatch({
            type: GET_NODES,
            payload: nodeArray,
            summary: nodeSummary
        });
    };

    //Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    return (
        <MainlistContext.Provider
            value={{
                sidebarSongList: state.sidebarSongList,
                cards: state.cards,
                nodes: state.nodes,
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
