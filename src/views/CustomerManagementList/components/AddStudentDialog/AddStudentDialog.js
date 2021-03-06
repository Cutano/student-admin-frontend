import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button, colors
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 700,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%'
  },
  field: {
    margin: theme.spacing(3)
  },
  cancelButton: {
    marginLeft: 'auto'
  },
  confirmButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

export default function AddStudentDialog(props) {
  const { onClose, open } = props;
  const [name, setName] = React.useState('');
  const [sex, setSex] = React.useState('');

  const classes = useStyles();

  const handleClose = () => {
    onClose(name, sex);
    setName('');
    setSex('');
  };
  const handleCancel = () => {
    onClose('', '');
    setName('');
    setSex('');
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleSexChange = (event) => {
    setSex(event.target.value);
  };

  return (
    <Dialog
      aria-labelledby="form-dialog-title"
      onClose={handleClose}
      open={open}
    >
      <DialogTitle id="form-dialog-title">添加新学生</DialogTitle>
      <DialogContent>
        <DialogContentText>
          请在下方输入学生信息
        </DialogContentText>
        <TextField
          autoFocus
          className={classes.field}
          label="姓名"
          name="name"
          onChange={handleNameChange}
          variant="outlined"
        />
        <TextField
          className={classes.field}
          label="性别"
          name="sex"
          onChange={handleSexChange}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          取消
        </Button>
        <Button onClick={handleClose} color="primary">
          添加
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddStudentDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};
