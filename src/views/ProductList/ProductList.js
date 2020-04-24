import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { ProductsToolbar, ProductCard } from './components';

import {fire} from '../../fire';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const ProductList = () => {
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
      <ProductsToolbar />
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {dataProduk && dataProduk.map(product => (
            <Grid
              item
              key={product.id}
              lg={4}
              md={6}
              xs={12}
            >
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default ProductList;
