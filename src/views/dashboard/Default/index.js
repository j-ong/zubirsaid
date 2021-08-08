import React, { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@material-ui/core';

// project imports
import TotalNodesCard from './TotalNodesCard';
import ProfileCard from './ProfileCard';

// import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from './../../../store/constant';

import axios from 'axios';

//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

const Dashboard = () => {
    const [counter, setCounter] = useState(0);

    const getSongsCount = async () => {
        const res = await axios.get('https://chriskhoo.net/ZS/0/MusicalWork');

        var data = res.data;
        var loopData = [];
        for (var i = 0; i < data.length; i++) {
            if ((data[i]._fields[2].properties.type = 'MusicalWork')) {
                loopData.push(data[i]._fields[2].properties);
            }
        }

        var count = loopData.length;
        setCounter(count);
    };

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
        getSongsCount();
    }, []);

    const section = {
        height: '100%'
        // paddingTop: 5
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing} direction="row">
                    <Grid item xs={12} md={6}>
                        <TotalNodesCard isLoading={isLoading} songsCount={counter} style={section} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <ProfileCard isLoading={isLoading} style={section} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={6}>
                        <TotalOrderLineChartCard isLoading={isLoading} style={section} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TotalGrowthBarChart isLoading={isLoading} style={section} />
                    </Grid>
                    {/* <Grid item xs={12} md={4}>
                        <TotalGrowthBarChart isLoading={isLoading} style={section} />
                    </Grid> */}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
