import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, Button, Grid, Typography } from '@material-ui/core';

// third-party
import Chart from 'react-apexcharts';

// project imports
import MainCard from './../../../ui-component/cards/MainCard';
import SkeletonTotalOrderCard from './../../../ui-component/cards/Skeleton/EarningCard';

import ChartDataMonth from './chart-data/total-order-month-line-chart';
import ChartDataYear from './chart-data/total-order-year-line-chart';

// assets
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

//Music Player
import ReactPlayer from "react-player";

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.primary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&>div': {
            position: 'relative',
            zIndex: 5
        },
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: theme.palette.primary[800],
            borderRadius: '50%',
            zIndex: 1,
            top: '-85px',
            right: '-95px',
            [theme.breakpoints.down('xs')]: {
                top: '-105px',
                right: '-140px'
            }
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            zIndex: 1,
            width: '210px',
            height: '210px',
            background: theme.palette.primary[800],
            borderRadius: '50%',
            top: '-125px',
            right: '-15px',
            opacity: 0.5,
            [theme.breakpoints.down('xs')]: {
                top: '-155px',
                right: '-70px'
            }
        }
    },
    content: {
        padding: '20px !important'
    },
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.primary[800],
        color: '#fff',
        marginTop: '8px'
    },
    cardHeading: {
        fontSize: '2.125rem',
        fontWeight: 500,
        marginRight: '8px',
        marginTop: '14px',
        marginBottom: '6px'
    },
    subHeading: {
        fontSize: '1rem',
        fontWeight: 500,
        color: theme.palette.primary[200]
    },
    avatarCircle: {
        ...theme.typography.smallAvatar,
        cursor: 'pointer',
        backgroundColor: theme.palette.primary[200],
        color: theme.palette.primary.dark
    },
    circleIcon: {
        transform: 'rotate3d(1, 1, 1, 45deg)'
    }
}));

//-----------------------|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||-----------------------//

const TotalOrderLineChartCard = ({ isLoading }) => {
    const classes = useStyles();

    const [timeValue, setTimeValue] = React.useState(false);
    const handleChangeTime = (event, newValue) => {
        setTimeValue(newValue);
    };

    return (
        <React.Fragment>
            {isLoading ? (
                <SkeletonTotalOrderCard />
            ) : (
                <MainCard border={false} className={classes.card} contentClass={classes.content}>
                    <Grid container direction="column">
                        
                        <Grid item sx={{ mb: 0.75 }}>
                            <Grid container alignItems="center">
                                <Grid item xs={6}>
                                    <Grid container alignItems="center">
                                        <Grid item xs={12}>
                                            <Typography className={classes.cardHeading}>Works of Zubir Said</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <ReactPlayer
                                        url={[
                                            'https://www.youtube.com/watch?v=yLubShIIekg',
                                            'https://www.youtube.com/watch?v=OLTlSVj9CmE',
                                            'https://www.youtube.com/watch?v=taeFJkpqxdo',
                                            'https://www.youtube.com/watch?v=9YQNxLuNfg0',
                                            'https://www.youtube.com/watch?v=A5MBehlZn1k',
                                            'https://www.youtube.com/watch?v=9FuFei0YiAc',
                                            'https://www.youtube.com/watch?v=nq5o_Ah2K4c',
                                            'https://www.youtube.com/watch?v=Cx7b2VPh-eM'
                                        ]}
                                        width="100%"
                                        height="310px"
                                        playing={false}
                                        controls={true}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </React.Fragment>
    );
};

TotalOrderLineChartCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalOrderLineChartCard;
