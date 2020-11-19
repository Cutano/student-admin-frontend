import React, { useEffect } from 'react';
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
import axios from '../../utils/axios';
import EarningsSegmentation from './components/EarningsSegmentation';

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

  const [courses, setCourses] = React.useState([]);
  const [students, setStudents] = React.useState([]);
  const [teachers, setTeachers] = React.useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchCourses = () => {
      axios.get('http://rinne.top:16384/course/list').then(response => {
        if (mounted) {
          setCourses(response.data);
        }
      });
    };
    const fetchStudents = () => {
      axios.get('http://rinne.top:16384/student/list').then(response => {
        if (mounted) {
          setStudents(response.data);
        }
      });
    };
    const fetchTeachers = () => {
      axios.get('http://rinne.top:16384/teacher/list').then(response => {
        if (mounted) {
          setTeachers(response.data);
        }
      });
    };

    fetchCourses();
    fetchStudents();
    fetchTeachers();

    return () => {
      mounted = false;
    };
  }, []);

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
          <AverageScore courses={courses}/>
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xs={12}
        >
          <StudentCount students={students}/>
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xs={12}
        >
          <PassRate courses={courses}/>
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xs={12}
        >
          <PersonCount
            students={students}
            teachers={teachers}
          />
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
          <EarningsSegmentation students={students}/>
        </Grid>
        <Grid
          item
          lg={7}
          xl={8}
          xs={12}
        >
        </Grid>
      </Grid>
    </Page>
  );
};

export default DashboardDefault;
