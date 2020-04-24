import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import {fire} from '../../fire';

import {
  LatestProducts,
  LatestOrders
} from './components';



const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

function Dashboard(){
  const classes = useStyles();
  const [dataProduk, setDataProduk] = useState('');
  useEffect(() => {
    let dataRef = fire.database().ref('products').orderByKey().limitToLast(5);
    dataRef.on('child_added', snapshot => {
      let data = snapshot.val();
      setDataProduk(data)
    })
  }, [])
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <LatestProducts dataProduk = {dataProduk} />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestOrders />
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
