import React, { useEffect, useContext } from 'react';

// get unique identifier
import uuid from 'react-uuid';

//import context
import MainlistContext from '../../contexts/mainlist/mainlistContext';

//import nodeItem components
import NodePropertyItem from './NodePropertyItem';

// material-ui
import { Grid, Tab, Box, Typography } from '@material-ui/core';

import {TabContext, TabPanel,TabList} from '@material-ui/lab';
// import { Typography } from '@material-ui/core';
// import MuiTypography from '@material-ui/core/Typography';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import SubCard from './../../ui-component/cards/SubCard';
import {List,ListItem,Divider} from '@material-ui/core';
import { gridSpacing } from './../../store/constant';

//Cytoscape components
import CytoscapeComponent from 'react-cytoscapejs/src/component';
import {CytoscapeObj} from './CytoscapeComponent';


//==============================|| SAMPLE PAGE ||==============================//

const Node = ({ match }) => {
    const mainlistContext = useContext(MainlistContext);
    const { nodes, cytoscape_nodes,cytoscape_edges, cytoscape_data, current_node_data, getNodes, nodeSummary, loading } = mainlistContext;
    const [value, setValue] = React.useState("0");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const list_of_properties_to_exclude = ["label","id","type","comment","accessURL"];
    const date_arr=["date","Date"];


    let current_node_type = '';

    try{
        current_node_type = ' ('+ current_node_data[0].properties["type"]  +')';
    }
    catch(err){

    }

    useEffect(() => {
        //supplies the nodeid to src/contexts/mainlist/MainlistState.js
        getNodes(match.params.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <MainCard title={
            nodeSummary.label + current_node_type
            }>
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
                    current_node_data && (Object.keys(current_node_data[0].properties).length > list_of_properties_to_exclude.length) &&
                    <Grid item xs={12} sm={12} key={"Main Information" }>
                        <SubCard title={'Main Information about ' + current_node_data[0].properties["label"] + current_node_type}>
                            <Grid container spacing={gridSpacing}>
                                {
                                    console.log(current_node_data[0].properties)
                                }
                                {
                                    current_node_data &&
                                    <List>
                                        {
                                            Object.keys(current_node_data[0].properties).sort().map(
                                                (key,index) => (
                                                    !list_of_properties_to_exclude.includes(key) &&
                                                    (
                                                        key.includes("date") &&
                                                        <ListItem>
                                                            <Grid container alignItems="flex-start" justifyContent="space-between" direction="row">
                                                                <Grid item lg={6} md={6} sm={6} xs={12} key={uuid()}>
                                                                    <Grid item>
                                                                        <Typography variant="subtitle1" color="inherit">
                                                                            {key[0].toUpperCase() + key.substring(1)}:
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Typography variant="subtitle2" color="inherit">
                                                                            {current_node_data[0].properties[key].day.low}/{current_node_data[0].properties[key].low}/
                                                                            {current_node_data[0].properties[key].year.low}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                                <Divider/>
                                                            </Grid>
                                                        </ListItem>
                                                        ||
                                                        key.includes("accessURL") &&
                                                        <ListItem>
                                                            <Grid container alignItems="flex-start" justifyContent="space-between" direction="row">
                                                            <Grid item lg={6} md={6} sm={6} xs={12} key={uuid()}>
                                                                <Grid item>
                                                                    <Typography variant="subtitle1" color="inherit">
                                                                        {key[0].toUpperCase() + key.substring(1)}:
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Typography variant="subtitle2" color="inherit">
                                                                        <a href={current_node_data[0].properties[key]} style={{ textDecoration: 'none' }}>
                                                                            {current_node_data[0].properties[key]}
                                                                        </a>
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                            <Divider/>
                                                            </Grid>
                                                        </ListItem>
                                                        ||
                                                        <ListItem>
                                                            <Grid container alignItems="flex-start" justifyContent="space-between" direction="row">
                                                            <Grid item lg={6} md={6} sm={6} xs={12} key={uuid()}>
                                                                <Grid item>
                                                                    <Typography variant="subtitle1" color="inherit">
                                                                        {key[0].toUpperCase() + key.substring(1)}:
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Typography variant="subtitle2" color="inherit">
                                                                        {current_node_data[0].properties[key]}
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                            <Divider/>
                                                            </Grid>
                                                        </ListItem>

                                                    )
                                                )
                                            )
                                        }
                                        {
                                            current_node_data[0].properties["comment"] && (current_node_data[0].properties["comment"].length > 0) &&
                                            <ListItem>
                                                <Grid container alignItems="flex-start" justifyContent="space-between" direction="row">
                                                    <Grid item lg={6} md={6} sm={6} xs={12} key={uuid()}>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            Comment
                                                        </Typography>
                                                        <Typography variant="subtitle2" color="inherit">
                                                            {current_node_data[0].properties["comment"]}
                                                        </Typography>
                                                    </Grid>
                                                    <Divider/>
                                                </Grid>
                                            </ListItem>
                                        }
                                        {
                                            current_node_data[0].properties["accessURL"]  &&
                                            <ListItem>
                                                <Grid container alignItems="flex-start" justifyContent="space-between" direction="row">
                                                    <Grid item lg={6} md={6} sm={6} xs={12} key={uuid()}>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            AccessURL:
                                                        </Typography>
                                                        <Typography variant="subtitle2" color="inherit">
                                                            <a href={current_node_data[0].properties["accessURL"]} style={{ textDecoration: 'none' }}>
                                                                {current_node_data[0].properties["accessURL"]}
                                                            </a>
                                                        </Typography>
                                                    </Grid>
                                                    <Divider/>
                                                </Grid>
                                            </ListItem>
                                        }

                                    </List>

                                }
                            </Grid>
                        </SubCard>
                    </Grid>
                }
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
