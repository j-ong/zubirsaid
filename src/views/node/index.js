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

    // const [cards, setcards] = useState([]);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        getNodes(match.params.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(nodes);

    // const getcards = async () => {
    //     setLoading(true);
    //     const res = await axios.get('https://chriskhoo.net/ZS/0/Person');

    //     var data = res.data;
    //     var loopData = [];
    //     for (var i = 0; i < data.length; i++) {
    //         loopData.push(data[i]._fields[2].properties);
    //     }

    //     setCards(loopData);
    //     setLoading(false);
    // };

    return (
        <MainCard title={nodeSummary.label}>
            {console.log(nodeSummary)}
            <Grid container spacing={gridSpacing}>
                {nodes.map((node) => (
                    <Grid item xs={12} sm={12}>
                        <SubCard title={node.group} key={node.group}>
                            <Grid container spacing={gridSpacing}>
                                {node.properties.map((property) => (
                                    <Grid item lg={6} md={6} sm={6} xs={12}>
                                        <NodePropertyItem loading={loading} property={property} key={property.id} />
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
