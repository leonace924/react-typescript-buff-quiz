import { Box, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  deleteQuestionRequest,
  editQuestionRequest,
  getQuestionsRequest,
} from "../../redux/actions/questionwebservice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      display: 'flex',
      justifyContent: 'space-evenly',
    },
    questionDetails: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      flexGrow: 1
    },
    buttons: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    },
  }),
);

function QuestionListView({dispatch, questions}) {

  const classes = useStyles();

  useEffect(() => {
  }, []);

  const getMoreQuestions = () => {
    dispatch(getQuestionsRequest());
  }

  const deleteQuestion =  (index) => {
    dispatch(deleteQuestionRequest(index));
  }

  const editQuestion = (index) => {
    dispatch(editQuestionRequest(index));
  }

  return (
    <Grid xs={5}>
      <h1>Questions</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => getMoreQuestions()}
      >
        Fetch More Questions
      </Button>
      <Grid container spacing={3}>
        {questions.map((question, index) => (
          <Grid item={true} xs={12} key={index}>
            <Paper className={classes.paper}>
              <Box className={classes.questionDetails}>
                {/* <Box>
                  {question.question}
                </Box> */}
                <Box>
                  <div
                    dangerouslySetInnerHTML={{ __html: `${question.question}` }}
                  />
                </Box>
                <Box>{question.category}</Box>
                <Box>{question.difficulty}</Box>
              </Box>
              <Box className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => editQuestion(index)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => deleteQuestion(index)}
                >
                  Delete{" "}
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

function mapStateToProps(state: any) {
  return { questions: state.quiz.questions };
}


export default connect(mapStateToProps)(QuestionListView)