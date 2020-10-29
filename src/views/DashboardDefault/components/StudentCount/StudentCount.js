import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, Typography, Avatar } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';

import gradients from 'utils/gradients';

const useStyles = makeStyles(theme => ({
  root: {
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
  label: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    backgroundImage: gradients.blue,
    height: 48,
    width: 48
  }
}));

const StudentCount = props => {
  const { className, students, ...rest } = props;
  const [studentCount, setStudentCount] = React.useState(0);

  useEffect(() => {
    if (students.length === 0) return;
    setStudentCount(students.length);
  }, [students]);

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div>
        <Typography
          component="h3"
          gutterBottom
          variant="overline"
        >
          学生人数
        </Typography>
        <div className={classes.details}>
          <Typography variant="h3">{studentCount}</Typography>
        </div>
      </div>
      <Avatar className={classes.avatar}>
        <GroupIcon />
      </Avatar>
    </Card>
  );
};

StudentCount.propTypes = {
  className: PropTypes.string,
  students: PropTypes.array.isRequired
};

export default StudentCount;
