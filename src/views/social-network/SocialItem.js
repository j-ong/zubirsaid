import React, { Fragment } from 'react';

// material-ui
import { Grid } from '@material-ui/core';
import MuiTypography from '@material-ui/core/Typography';

// project imports

import SubCard from '../../ui-component/cards/SubCard';
import { gridSpacing } from '../../store/constant';

const SocialItem = ({ network }) => {
    return (
        <Fragment>
            <Grid item xs={12} sm={6}>
                <SubCard title={network.label}>
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                            <MuiTypography variant="subtitle1" gutterBottom>
                                Id: {network.id}
                            </MuiTypography>
                        </Grid>
                        <Grid item>
                            <MuiTypography variant="subtitle2" gutterBottom>
                                Label: {network.label}
                            </MuiTypography>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
        </Fragment>
    );
};

export default SocialItem;
