import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { fire, storage } from '../../../../fire';
import useInput from '../../../../helpers/useInput';

const useStyles = makeStyles(theme => ({
  root: {},
  buttonFile: {
    float: 'left'
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  formControl: {
    float: 'left',
    inlineSize: '-webkit-fill-available',
    minWidth: 120,
  },
}));

const ProductsToolbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [ isSubmitted, setSubmit ] = useState(false);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [ title, bindTitle, resetTitle ] = useInput('');
  const [ desc, bindDesc, resetDesc ] = useInput('');
  const [ price, bindPrice, resetPrice ] = useInput('');
  const [ category, bindCategory, resetCategory ] = useInput('')

  function resetAll() {
    resetCategory()
    resetDesc()
    resetTitle()
    resetPrice()
  }

  const handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImage(image)
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    resetAll()
  };
  
  const addProduct = (e) =>{
    e.preventDefault();
    setSubmit(true)
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progressX = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setProgress(progressX);
      },
      error => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            console.log(url)
            let newProduk = {
              title,
              desc,
              price,
              category,
              url
            }
            fire.database().ref('products/products').push(newProduk)
            setSubmit(false)
            setOpen(false)
            resetAll()
            setProgress(0)
          })
      }
    )
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button
          color="primary"
          onClick={handleClickOpen}
          variant="contained"
        >
          Tambah Produk
        </Button>
        <Dialog 
          aria-labelledby="form-dialog-title" 
          onClose={handleClose} 
          open={open}
        >
          <form onSubmit={addProduct}>
            <DialogTitle id="form-dialog-title">Tambah Produk</DialogTitle>
            <DialogContent>
              <DialogContentText>
              Masukan detail produk baru dengan lengkap
              </DialogContentText>
              <TextField
                autoFocus
                fullWidth
                id="title"
                label="Nama Makanan"
                margin="dense"
                type="text"
                {...bindTitle}
              />
              <TextField
                autoFocus
                fullWidth
                id="description"
                label="Deskripsi"
                margin="dense"
                type="text"
                {...bindDesc}
              />
              <TextField
                autoFocus
                fullWidth
                id="price"
                label="Harga"
                margin="dense"
                type="number"
                {...bindPrice}
              />
              <span style={{ inlineSize: '-webkit-fill-available', float:'left' }}>File</span>
              <input 
                onChange={handleChange} 
                style={{ float: 'left' }} 
                type="file"
              />
              <progress
                className={classes.progress}
                max="100"
                value={progress}
              />
              <FormControl className={classes.formControl}>
                <InputLabel id="kategori-label">Kategori</InputLabel>
                <Select
                  id="kategori"
                  labelId="demo-simple-select-label"
                  {...bindCategory}
                >
                  <MenuItem value="new">Baru Minggu Ini</MenuItem>
                  <MenuItem value="sehat">Menu Sehat</MenuItem>
                  <MenuItem value="promosi">Promosi</MenuItem>
                  <MenuItem value="favorit">Terfavorit</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button 
                color="secondary"
                disabled={isSubmitted}
                onClick={handleClose}
              >
                BATAL
              </Button>
              <Button 
                color="primary"
                disabled={isSubmitted}
                type="submit"
              >
                INPUT
              </Button>
            </DialogActions>
          </form>

        </Dialog>
      </div>
    </div>
  );
};

ProductsToolbar.propTypes = {
  className: PropTypes.string
};

export default ProductsToolbar;
