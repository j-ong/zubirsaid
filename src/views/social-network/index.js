import React, { useEffect, useContext } from 'react';

//import axios
// import axios from 'axios';

//import context
import MainlistContext from '../../contexts/mainlist/mainlistContext';

//import socialItem components
import SocialItem from './SocialItem';

// material-ui
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import MuiTypography from '@material-ui/core/Typography';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import SubCard from './../../ui-component/cards/SubCard';
import { gridSpacing } from './../../store/constant';

//==============================|| SAMPLE PAGE ||==============================//

const SocialNetwork = () => {
    const mainlistContext = useContext(MainlistContext);
    const { cards, getCards } = mainlistContext;

    // const [cards, setcards] = useState([]);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCards();
        // estlint-disable-next-line
    }, []);

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
        <MainCard title="Connected person">
            <Grid container spacing={gridSpacing}>
                {cards.map((network) => (
                    <SocialItem network={network} key={network.id} />
                ))}
            </Grid>
        </MainCard>
    );
};

export default SocialNetwork;
