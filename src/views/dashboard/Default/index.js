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

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalNodesCard isLoading={isLoading} songsCount={counter} />
                    </Grid>

                    <Grid item lg={8} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={4}>
                        <ProfileCard isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
