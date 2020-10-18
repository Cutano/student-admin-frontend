import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Page } from 'components';
import {
  Header,
  LatestProjects,
  StudentCount,
  RealTime,
  PersonCount,
  TeamTasks,
  AverageScore,
  PassRate,
  PerformanceOverTime
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  container: {
    marginTop: theme.spacing(3)
  }
}));

const DashboardDefault = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Default Dashboard"
    >
      <Header />
      <Grid
        className={classes.container}
        container
        spacing={3}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xs={12}
        >
          <AverageScore />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xs={12}
        >
          <StudentCount />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xs={12}
        >
          <PassRate />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xs={12}
        >
          <PersonCount />
        </Grid>
        <Grid
          item
          lg={3}
          xs={12}
        >
          <RealTime />
        </Grid>
        <Grid
          item
          lg={9}
          xs={12}
        >
          <PerformanceOverTime />
        </Grid>
        <Grid
          item
          lg={5}
          xl={4}
          xs={12}
        >
          <TeamTasks />
        </Grid>
        <Grid
          item
          lg={7}
          xl={8}
          xs={12}
        >
          <LatestProjects />
        </Grid>
      </Grid>
    </Page>
  );
};

export default DashboardDefault;
