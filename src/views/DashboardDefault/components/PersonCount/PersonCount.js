import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, Typography, Avatar } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.white,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    height: 48,
    width: 48
  }
}));

const PersonCount = props => {
  const { className, teachers, students, ...rest } = props;
  const [personCount, setPersonCount] = React.useState(0);

  useEffect(() => {
    if (students.length === 0 || teachers.length === 0) return;
    setPersonCount(students.length + teachers.length);
  }, [students, teachers]);

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div>
        <Typography
          color="inherit"
          component="h3"
          gutterBottom
          variant="overline"
        >
          系统内总人数
        </Typography>
        <div className={classes.details}>
          <Typography
            color="inherit"
            variant="h3"
          >
            {personCount}
          </Typography>
        </div>
      </div>
      <Avatar
        className={classes.avatar}
        color="inherit"
      >
        <GroupIcon />
      </Avatar>
    </Card>
  );
};

PersonCount.propTypes = {
  className: PropTypes.string,
  students: PropTypes.array.isRequired,
  teachers: PropTypes.array.isRequired
};

export default PersonCount;
