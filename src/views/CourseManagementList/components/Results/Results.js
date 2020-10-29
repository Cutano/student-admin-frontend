import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';

import getInitials from 'utils/getInitials';
import { GenericMoreButton, TableEditBar } from 'components';
import axios from '../../../../utils/axios';
import EditStudentDialog from '../EditCourseDialog/EditCourseDialog';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 700
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'flex-end'
  }
}));

const Results = props => {
  const { className, customers, onCustomersChange, ...rest } = props;

  const classes = useStyles();

  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleSelectAll = event => {
    const selectedCustomers = event.target.checked
      ? customers.map(customer => customer.link_id)
      : [];

    setSelectedCustomers(selectedCustomers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomers.indexOf(id);
    let newSelectedCustomers = [];

    if (selectedIndex === -1) {
      newSelectedCustomers = newSelectedCustomers.concat(selectedCustomers, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomers = newSelectedCustomers.concat(
        selectedCustomers.slice(1)
      );
    } else if (selectedIndex === selectedCustomers.length - 1) {
      newSelectedCustomers = newSelectedCustomers.concat(
        selectedCustomers.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomers = newSelectedCustomers.concat(
        selectedCustomers.slice(0, selectedIndex),
        selectedCustomers.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomers(newSelectedCustomers);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const handleDelete = () => {
    for (const selected of selectedCustomers) {
      axios.get('http://rinne.top:16384/course/del?linkId=' + selected).then(() => {
        onCustomersChange();
      });
    }
    setSelectedCustomers([]);
  };

  const handleEdit = () => {
    setDialogOpen(true);
  }

  const handleEditClose = (studentId, courseId, courseName, teacherId, grade) => {
    if (studentId !== '' && courseId !== '' && grade !== '') {
      for (const selected of selectedCustomers) {
        axios.get('http://rinne.top:16384/course/update?linkId=' + selected + '&studentId=' + studentId + '&courseId=' + courseId + '&courseName=' + courseName + '&teacherId=' + teacherId + '&grade=' + grade).then(() => {
          onCustomersChange();
        });
      }
    }
    setDialogOpen(false);
  };

  const tableBody = () => {
    return (
      customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(customer => (
        <TableRow
          hover
          key={customer.link_id}
          selected={selectedCustomers.indexOf(customer.link_id) !== -1}
        >
          <TableCell padding="checkbox">
            <Checkbox
              checked={
                selectedCustomers.indexOf(customer.link_id) !== -1
              }
              color="primary"
              onChange={event =>
                handleSelectOne(event, customer.link_id)
              }
              value={selectedCustomers.indexOf(customer.link_id) !== -1}
            />
          </TableCell>
          <TableCell>
            <div className={classes.nameCell}>
              <Avatar
                className={classes.avatar}
                src={customer.avatar}
              >
                {getInitials(customer.course_name)}
              </Avatar>
              <div>
                <Link
                  color="inherit"
                  component={RouterLink}
                  to="/management/customers/1"
                  variant="h6"
                >
                  {customer.course_name}
                </Link>
                <div>{customer.email}</div>
              </div>
            </div>
          </TableCell>
          <TableCell>{customer.link_id}</TableCell>
          <TableCell>
            {customer.course_id}
          </TableCell>
          <TableCell>{customer.stu_id}</TableCell>
          <TableCell>{customer.teacher_id}</TableCell>
          <TableCell>
            {customer.grade}
          </TableCell>
          <TableCell align="right">
            <Button
              color="primary"
              component={RouterLink}
              size="small"
              to="/management/customers/1"
              variant="outlined"
            >
              View
            </Button>
          </TableCell>
        </TableRow>
      ))
    )
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography
        color="textSecondary"
        gutterBottom
        variant="body2"
      >
        {customers.length} Records found. Page {page + 1} of{' '}
        {Math.ceil(customers.length / rowsPerPage)}
      </Typography>
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title="全部选课信息"
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomers.length === customers.length}
                        color="primary"
                        indeterminate={
                          selectedCustomers.length > 0 &&
                          selectedCustomers.length < customers.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>课程名称</TableCell>
                    <TableCell>选课ID</TableCell>
                    <TableCell>课程ID</TableCell>
                    <TableCell>学生ID</TableCell>
                    <TableCell>教师ID</TableCell>
                    <TableCell>成绩</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableBody()}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={customers.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <TableEditBar
        onDelete={handleDelete}
        onMarkUnpaid={handleEdit}
        selected={selectedCustomers}
      />
      <EditStudentDialog
        onClose={handleEditClose}
        open={dialogOpen}
      />
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired,
  onCustomersChange: PropTypes.func
};

Results.defaultProps = {
  customers: []
};

export default Results;
