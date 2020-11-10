import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography, colors
} from '@material-ui/core';

import { GenericMoreButton } from 'components';
import { Chart } from './components';
import uuid from 'uuid/v1';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0
    }
  },
  chartContainer: {
    padding: theme.spacing(3)
  },
  chart: {
    height: 281
  },
  statsContainer: {
    display: 'flex'
  },
  statsItem: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(3, 2),
    '&:not(:last-of-type)': {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  }
}));

const EarningsSegmentation = props => {
  const { className, students, ...rest } = props;

  const classes = useStyles();
  const [ratioData, setRatioData] = useState([]);

  useEffect(() => {
    let boyCnt = 0;
    let girlCnt = 0;
    for (const student of students) {
      if (student['sex'] === '男') boyCnt++;
      else girlCnt++;
    }

    const boyShare = (boyCnt * 100 / (boyCnt + girlCnt)).toFixed(2);
    const girlShare = 100 - boyShare;

    setRatioData([
      {
        id: uuid(),
        label: '男生',
        value: boyShare,
        color: colors.indigo[500]
      },
      {
        id: uuid(),
        label: '女生',
        value: girlShare,
        color: colors.indigo[200]
      }
    ])
  }, [students]);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={<GenericMoreButton />}
        title="学生男女比"
      />
      <Divider />
      <CardContent className={classes.content}>
        <div className={classes.chartContainer}>
          <Chart
            className={classes.chart}
            data={ratioData}
          />
        </div>
        <Divider />
        <div className={classes.statsContainer}>
          {ratioData.map(earning => (
            <div
              className={classes.statsItem}
              key={earning.id}
            >
              <Typography
                align="center"
                component="h6"
                gutterBottom
                variant="overline"
              >
                {earning.label}
              </Typography>
              <Typography
                align="center"
                variant="h4"
              >
                {earning.value}%
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

EarningsSegmentation.propTypes = {
  className: PropTypes.string,
  students: PropTypes.array.isRequired
};

export default EarningsSegmentation;
