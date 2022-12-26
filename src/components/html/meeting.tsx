import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

const Meeting: React.FC = () => {

    const titleStyle: React.CSSProperties = {
        
    }

    return (
        <Box
            display='flex'
            width='100vw'
            height='50px'
            color='white'
            justifyContent= 'space-between'
            alignItems='center'
            style={{backgroundColor:'#343434'}}
        >
            <Grid style={{margin: "0px 20px"}}>
                <Typography style={{fontSize: 25}}>VMCS</Typography>
            </Grid>
            <Grid style={{margin: "0px 20px"}}>
                <Typography style={{fontSize: 15}}>Видеоконференция</Typography>
            </Grid>
            <Grid style={{margin: "0px 20px"}}>
                <Typography style={{fontSize: 15}}>Настройки</Typography>
            </Grid>
        </Box>
    )
}

export default Meeting;