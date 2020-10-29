import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, Typography, Avatar } from '@material-ui/core';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';

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
    backgroundImage: gradients.green,
    height: 48,
    width: 48
  }
}));

const AverageScore = props => {
  const { className, courses, ...rest } = props;
  const [score, setScore] = React.useState(0);

  const classes = useStyles();

  useEffect(() => {
    let sum = 0;
    let cnt = 0;
    for (const course of courses) {
      sum += course['grade'];
      cnt++;
    }
    if (cnt === 0) return;
    setScore((sum / cnt).toFixed(2));
  }, [courses]);

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
          学生平均分
        </Typography>
        <div className={classes.details}>
          <Typography variant="h3">
            {score}
          </Typography>
        </div>
      </div>
      <Avatar className={classes.avatar}>
        <LocalLibraryIcon />
      </Avatar>
    </Card>
  );
};

AverageScore.propTypes = {
  className: PropTypes.string,
  courses: PropTypes.array.isRequired
};

export default AverageScore;
