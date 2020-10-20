import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import AddStudentDialog from '../AddStudentDialog/AddStudentDialog';
import axios from '../../../../utils/axios';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = props => {
  const { className, onCustomersChange, ...rest } = props;
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const classes = useStyles();

  const handleOnButtonClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = (name, sex) => {
    if (name !== '' && sex !== '') {
      axios.get('http://rinne.top:16384/student/add?name=' + name + '&sex=' + sex).then(response => {
        onCustomersChange();
      });
    }
    setDialogOpen(false);
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        alignItems="flex-end"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid item>
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
          >
            Management
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            学生表单
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            onClick={handleOnButtonClick}
            variant="contained"
          >
            添加新学生
          </Button>
        </Grid>
      </Grid>
      <AddStudentDialog
        open={dialogOpen}
        onClose={handleDialogClose}
      />
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  onCustomersChange: PropTypes.func
};

export default Header;
