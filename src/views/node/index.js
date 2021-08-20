import React, { useEffect, useContext } from 'react';

// get unique identifier
import uuid from 'react-uuid';

//import context
import MainlistContext from '../../contexts/mainlist/mainlistContext';

//import nodeItem components
import NodePropertyItem from './NodePropertyItem';

// material-ui
import { Grid, AppBar, Tabs, Tab, Box } from '@material-ui/core';
import {} from '@material-ui/core/styles';

import {TabContext, TabPanel,TabList} from '@material-ui/lab';
// import { Typography } from '@material-ui/core';
// import MuiTypography from '@material-ui/core/Typography';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import SubCard from './../../ui-component/cards/SubCard';
import { gridSpacing } from './../../store/constant';

//Cytoscape components
import retrieveInfo from '../../connectionObject/connectionObject';
import cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs/src/component';
import {CytoscapeObj, ReactCytoscapeCola} from './CytoscapeComponent';
import {ReactCytoscape} from 'react-cytoscape';


//==============================|| SAMPLE PAGE ||==============================//

const Node = ({ match }) => {
    const mainlistContext = useContext(MainlistContext);
    const { nodes, cytoscape_nodes,cytoscape_edges, getNodes, nodeSummary, loading } = mainlistContext;
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        //supplies the nodeid to src/contexts/mainlist/MainlistState.js
        getNodes(match.params.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const funcCytoscapeCola = () =>{
        console.log("Callback function");
    }

    console.log(match);
    return (
        <MainCard title={nodeSummary.label}>
            <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} position="static">
                <Tab label="Main Information" value="0" />
                <Tab label="Graphic Visualization" value="1" />
            </TabList>
            </Box>
            <TabPanel value="0">
            <Grid container spacing={gridSpacing}>

                {
                    nodes.map((node) => (
                    <Grid item xs={12} sm={12} key={node.group}>
                        <SubCard title={node.group}>
                            <Grid container spacing={gridSpacing}>
                                {node.properties.map((property) => (
                                    <Grid item lg={6} md={6} sm={6} xs={12} key={uuid()}>
                                        <NodePropertyItem loading={loading} property={property} key={property.id} />
                                    </Grid>
                                ))}
                            </Grid>
                        </SubCard>
                    </Grid>
                ))}
            </Grid>
            </TabPanel>
            <TabPanel value="1">
                <h2>Cytoscape:</h2>
                <CytoscapeObj
                    height={600}
                    width={600}
                    elements={
                        CytoscapeComponent.normalizeElements({
                        nodes:cytoscape_nodes,
                        edges:cytoscape_edges
                    })}
                />
            </TabPanel>
            </TabContext>
        </MainCard>
    );
};

export default Node;

// <NodeItem property={property} key={property.id} />
