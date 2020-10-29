import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button, colors
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 700,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%'
  },
  field: {
    margin: theme.spacing(2)
  },
  cancelButton: {
    marginLeft: 'auto'
  },
  confirmButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

export default function EditCourseDialog(props) {
  const { onClose, open } = props;
  const [studentId, setStudentId] = React.useState('');
  const [courseName, setCourseName] = React.useState('');
  const [courseId, setCourseId] = React.useState('');
  const [teacherId, setTeacherId] = React.useState('');
  const [grade, setGrade] = React.useState('');

  const classes = useStyles();

  const handleClose = () => {
    onClose(studentId, courseId, courseName, teacherId, grade);
    setCourseName('');
    setCourseId('');
    setGrade('');
    setStudentId('');
    setTeacherId('');
  };
  const handleCancel = () => {
    onClose('', '', '', '', '');
    setCourseName('');
    setCourseId('');
    setGrade('');
    setStudentId('');
    setTeacherId('');
  };
  const handleStudentIdChange = (event) => {
    setStudentId(event.target.value);
  };
  const handleTeacherIdChange = (event) => {
    setTeacherId(event.target.value);
  };
  const handleCourseNameChange = (event) => {
    setCourseName(event.target.value);
  };
  const handleCourseIdChange = (event) => {
    setCourseId(event.target.value);
  };
  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };

  return (
    <Dialog
      aria-labelledby="form-dialog-title"
      onClose={handleClose}
      open={open}
    >
      <DialogTitle id="form-dialog-title">编辑选课信息</DialogTitle>
      <DialogContent>
        <DialogContentText>
          请在下方输入选课信息
        </DialogContentText>
        <TextField
          autoFocus
          className={classes.field}
          label="学号"
          name="studentId"
          onChange={handleStudentIdChange}
          variant="outlined"
        />
        <TextField
          className={classes.field}
          label="课程ID"
          name="courseId"
          onChange={handleCourseIdChange}
          variant="outlined"
        />
        <TextField
          className={classes.field}
          label="课程名"
          name="courseName"
          onChange={handleCourseNameChange}
          variant="outlined"
        />
        <TextField
          className={classes.field}
          label="任课教师ID"
          name="teacherID"
          onChange={handleTeacherIdChange}
          variant="outlined"
        />
        <TextField
          className={classes.field}
          label="成绩"
          name="grade"
          onChange={handleGradeChange}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={handleCancel}
        >
          取消
        </Button>
        <Button
          color="primary"
          onClick={handleClose}
        >
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EditCourseDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
