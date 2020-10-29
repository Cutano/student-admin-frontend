import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import AddCourseDialog from '../AddCourseDialog/AddCourseDialog';
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

  const handleDialogClose = (studentId, courseId, courseName, teacherId, grade) => {
    if (studentId !== '' && courseId !== '' && grade !== '') {
      axios.get('http://rinne.top:16384/course/add?studentId=' + studentId + '&courseId=' + courseId + '&courseName=' + courseName + '&teacherId=' + teacherId + '&grade=' + grade).then(() => {
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
            选课信息表单
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            onClick={handleOnButtonClick}
            variant="contained"
          >
            添加新选课信息
          </Button>
        </Grid>
      </Grid>
      <AddCourseDialog
        onClose={handleDialogClose}
        open={dialogOpen}
      />
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  onCustomersChange: PropTypes.func
};

export default Header;
