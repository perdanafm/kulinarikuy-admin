import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';


const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  content: {
    padding: 0
  },
  image: {
    height: 48,
    width: 48
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestProducts = props => {
  const { className, dataProduk, ...rest } = props;
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        subtitle={`${dataProduk.length} in total`}
        title="Latest products"
      />
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {dataProduk && dataProduk.slice(0,5).map((product, i) => (
            <ListItem
              divider={i < dataProduk.length - 1}
              key={product.id}
            >
              <ListItemAvatar>
                <img
                  alt="Product"
                  className={classes.image}
                  src={'https://firebasestorage.googleapis.com/v0/b/sisfo-24e52.appspot.com/o/brocoly.jpg?alt=media&token=a8c2c0ad-e455-470b-b448-fb957494ee55'}
                />
              </ListItemAvatar>
              <ListItemText
                primary={product.title}
                secondary={`Rp ${product.price}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string,
  dataProduk: PropTypes.array
};

export default LatestProducts;
