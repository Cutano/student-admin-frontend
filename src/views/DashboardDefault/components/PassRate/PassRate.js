import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, Typography, Avatar, LinearProgress } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

import gradients from 'utils/gradients';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  content: {
    flexGrow: 1
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  progress: {
    margin: theme.spacing(0, 1),
    flexGrow: 1
  },
  avatar: {
    backgroundImage: gradients.orange,
    height: 48,
    width: 48
  }
}));

const PassRate = props => {
  const { className, courses, ...rest } = props;
  const [rate, setRate] = React.useState(0);

  useEffect(() => {
    let sum = 0;
    let cnt = 0;
    for (const course of courses) {
      if (course['grade'] >= 60) sum++;
      cnt++;
    }
    if (cnt === 0) return;
    setRate((sum * 100 / cnt).toFixed(2));
  }, [courses]);

  const classes = useStyles();


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.content}>
        <Typography
          component="h3"
          gutterBottom
          variant="overline"
        >
          课程及格率
        </Typography>
        <div className={classes.details}>
          <Typography variant="h3">{rate}%</Typography>
          <LinearProgress
            className={classes.progress}
            value={rate}
            variant="determinate"
          />
        </div>
      </div>
      <Avatar className={classes.avatar}>
        <DoneIcon />
      </Avatar>
    </Card>
  );
};

PassRate.propTypes = {
  className: PropTypes.string,
  courses: PropTypes.array.isRequired
};

export default PassRate;
