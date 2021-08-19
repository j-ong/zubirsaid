import { GET_CARDS, GET_NODES, SET_LOADING } from '../types';

const MainlistReducer = (state, action) => {
    switch (action.type) {
        case GET_CARDS:
            return {
                ...state,
                cards: action.payload,
                loading: false
            };
        case GET_NODES:
            return {
                ...state,
                nodes: action.payload,
                cytoscape_nodes:action.payload_cytoscape_nodes,
                cytoscape_edges:action.payload_cytoscape_edges,
                nodeSummary: action.summary,
                loading: false
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
};

export default MainlistReducer;
