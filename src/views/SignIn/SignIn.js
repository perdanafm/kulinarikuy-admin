import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  TextField,
  Typography
} from '@material-ui/core';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    margin: 'auto',
    textAlign: 'center',
    paddingLeft: 100,
    maxWidth: 800,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignIn = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSignIn = event => {
    event.preventDefault();
    history.push('/');
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <form
          className={classes.form}
          onSubmit={handleSignIn}
        >
          <Typography
            className={classes.title}
            variant="h2"
          >
            Sign in
          </Typography>
          <TextField
            className={classes.textField}
            error={hasError('email')}
            fullWidth
            helperText={
              hasError('email') ? formState.errors.email[0] : null
            }
            label="Email address"
            name="email"
            onChange={handleChange}
            type="text"
            value={formState.values.email || ''}
            variant="outlined"
          />
          <TextField
            className={classes.textField}
            error={hasError('password')}
            fullWidth
            helperText={
              hasError('password') ? formState.errors.password[0] : null
            }
            label="Password"
            name="password"
            onChange={handleChange}
            type="password"
            value={formState.values.password || ''}
            variant="outlined"
          />
          <Button
            className={classes.signInButton}
            color="primary"
            disabled={!formState.isValid}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Sign in now
          </Button>
        </form>
      </div>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
