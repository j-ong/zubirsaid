import React, { useEffect, useContext } from 'react';

// get unique identifier
import uuid from 'react-uuid';

//import context
import MainlistContext from '../../contexts/mainlist/mainlistContext';

//import nodeItem components
import NodePropertyItem from './NodePropertyItem';

// material-ui
import { Grid, Tab, Box } from '@material-ui/core';

import {TabContext, TabPanel,TabList} from '@material-ui/lab';
// import { Typography } from '@material-ui/core';
// import MuiTypography from '@material-ui/core/Typography';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import SubCard from './../../ui-component/cards/SubCard';
import { gridSpacing } from './../../store/constant';

//Cytoscape components
import CytoscapeComponent from 'react-cytoscapejs/src/component';
import {CytoscapeObj} from './CytoscapeComponent';


//==============================|| SAMPLE PAGE ||==============================//

const Node = ({ match }) => {
    const mainlistContext = useContext(MainlistContext);
    const { nodes, cytoscape_nodes,cytoscape_edges, cytoscape_data, getNodes, nodeSummary, loading } = mainlistContext;
    const [value, setValue] = React.useState("0");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        //supplies the nodeid to src/contexts/mainlist/MainlistState.js
        getNodes(match.params.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <MainCard title={nodeSummary.label}>
            <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} position="static">
                <Tab label="Text View" value="0" />
                <Tab label="Graph View" value="1" />
            </TabList>
            </Box>
            <TabPanel value="0">
            <Grid container spacing={gridSpacing}>
                {
                    nodes.map((node) => (
                    <Grid item xs={12} sm={12} key={node.group}>
                        <SubCard title={node.group}>
                            <Grid container spacing={gridSpacing}>
                                {
                                    node.properties.map((property) => (
                                    <Grid item lg={6} md={6} sm={6} xs={12} key={uuid()}>
                                        <NodePropertyItem loading={loading} property={property} key={property.id} />
                                    </Grid>
                                ))
                                }
                            </Grid>
                        </SubCard>
                    </Grid>
                ))}
            </Grid>
            </TabPanel>
            <TabPanel value="1">
                <Grid id={"CytoscapePanelGrid"} itemID={"CytoscapePanelGrid"}>
                <CytoscapeObj
                    height={1000}
                    width={1000}
                    elements={
                        CytoscapeComponent.normalizeElements({
                        nodes:cytoscape_nodes,
                        edges:cytoscape_edges
                    })}
                    cytoscape_data = {cytoscape_data}
                />
                </Grid>
            </TabPanel>
            </TabContext>
        </MainCard>
    );
};

export default Node;

// <NodeItem property={property} key={property.id} />
