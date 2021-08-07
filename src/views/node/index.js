import React, { useEffect, useContext } from 'react';

//import axios
// import axios from 'axios';

//import context
import MainlistContext from '../../contexts/mainlist/mainlistContext';

//import nodeItem components
import NodePropertyItem from './NodePropertyItem';

// material-ui
import { Grid } from '@material-ui/core';
// import { Typography } from '@material-ui/core';
// import MuiTypography from '@material-ui/core/Typography';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import SubCard from './../../ui-component/cards/SubCard';
import { gridSpacing } from './../../store/constant';

//==============================|| SAMPLE PAGE ||==============================//

const Node = ({ match }) => {
    const mainlistContext = useContext(MainlistContext);
    const { nodes, getNodes, nodeSummary, loading } = mainlistContext;

    useEffect(() => {
        getNodes(match.params.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainCard title={nodeSummary.label}>
            <Grid container spacing={gridSpacing}>
                {nodes.map((node) => (
                    <Grid item xs={12} sm={12} key={node.group}>
                        <SubCard title={node.group}>
                            <Grid container spacing={gridSpacing}>
                                {node.properties.map((property) => (
                                    <Grid item lg={6} md={6} sm={6} xs={12} key={property.id}>
                                        <NodePropertyItem loading={loading} property={property} />
                                    </Grid>
                                ))}
                            </Grid>
                        </SubCard>
                    </Grid>
                ))}
            </Grid>
        </MainCard>
    );
};

export default Node;

// <NodeItem property={property} key={property.id} />
