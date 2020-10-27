import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import axios from 'utils/axios';
import { Page, SearchBar } from 'components';
import { Header, Results } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

const TeacherManagementList = () => {
  const classes = useStyles();

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchCustomers = () => {
      axios.get('http://rinne.top:16384/teacher/list').then(response => {
        if (mounted) {
          setCustomers(response.data);
        }
      });
    };

    fetchCustomers();

    return () => {
      mounted = false;
    };
  }, []);

  const handleFilter = () => { };
  const handleSearch = () => { };
  const handleOnCustomersChange = () => {
    axios.get('http://rinne.top:16384/teacher/list').then(response => {
      setCustomers(response.data);
    });
  };

  return (
    <Page
      className={classes.root}
      title="教师管理表单"
    >
      <Header onCustomersChange={handleOnCustomersChange}/>
      <SearchBar
        onFilter={handleFilter}
        onSearch={handleSearch}
      />
      {customers && (
        <Results
          className={classes.results}
          customers={customers}
          onCustomersChange={handleOnCustomersChange}
        />
      )}
    </Page>
  );
};

export default TeacherManagementList;
