import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import { Field, Form, Formik, FieldArray } from "formik";
import { Checkbox, TextField } from "formik-material-ui";
import { Button, FormGroup, Grid, InputLabel, Paper } from "@material-ui/core";
import { connect } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Question } from "../../types/Question";
import {
  editQuestionRequest,
  updateQuestionRequest,
} from "../../redux/actions/questionwebservice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      padding: theme.spacing(2),
      paddingLeft: 0,
      textAlign: "left",
    },
    question: {
      paddingBottom: theme.spacing(2),
      textAlign: "left",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

// Specific: Validation Schema for update following requirement
const UpdateSchema = Yup.object().shape({
  checked: Yup.array()
    .required("Must have friends")
    .min(2, "At least two answer must be correct")
    .max(5, "Maximum answers are 5, not more"),
  answers: Yup.array().of(
    Yup.string().required("Answers can't be an empty string")
  ),
  question: Yup.string().required("The question can't be an empty string"),
});

function QuestionEditor({ dispatch, questions, selectedIndex }) {
  const classes = useStyles();
  const [question, setQuestion] = useState<Question>({
    category: "",
    type: "",
    difficulty: "",
    question: "",
    correct_answer: "",
    correct_answers: [],
    incorrect_answers: [],
  });
  const [allChecked, setAllChecked] = useState<string[]>([]);
  const [allAnswers, setAllAnswers] = useState<string[]>([]);

  useEffect(() => {
    setQuestion(questions[selectedIndex]);

    const answers: string[] = questions[selectedIndex]?.correct_answers
      .concat(questions[selectedIndex]?.incorrect_answers)
      .sort();
    setAllAnswers(answers);

    const checked: string[] = [];
    questions[selectedIndex]?.correct_answers.map((answer) => {
      checked.push(answers.indexOf(answer).toString());
    });
    setAllChecked(checked);
  }, [questions, selectedIndex]);

  const initialValues = {
    question: question?.question,
    answers: allAnswers,
    checked: allChecked,
  };

  const handleSubmit = (values) => {
    let wrongAnswers: string[] = values.answers;
    let correctAnswers: string[] = [];
    let newQuestion: Question = question;

    values.checked.map((check) =>
      correctAnswers.push(values.answers[parseInt(check)])
    );
    correctAnswers.map(
      (answer) => (wrongAnswers = wrongAnswers.filter((x) => x !== answer))
    );

    newQuestion.correct_answers = correctAnswers;
    newQuestion.incorrect_answers = wrongAnswers;
    console.log(newQuestion);

    dispatch(updateQuestionRequest(selectedIndex, newQuestion));
    dispatch(editQuestionRequest(-1));
  };

  const addAnswer = (values) => {
    setAllAnswers([...values.answers, ""]);
    setAllChecked([...values.checked]);
  };

  const removeAnswer = (index) => {
    const newArray: string[] = [
      ...allAnswers.slice(0, index),
      ...allAnswers.slice(index + 1),
    ];
    setAllAnswers(newArray);

    const checked: string[] = [];
    questions[selectedIndex]?.correct_answers.map((answer) =>
      checked.push(newArray.indexOf(answer).toString())
    );
    setAllChecked(checked);
  };

  return (
    <Grid xs={7}>
      <h1>Editor (TODO)</h1>
      {question && (
        <Grid container spacing={4} justify="center">
          <Grid item sm={8}>
            <Paper variant="outlined" className={classes.paper}>
              <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={UpdateSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    setSubmitting(false);
                    handleSubmit(values);
                  }, 500);
                }}
                validateOnChange
              >
                {({ errors, values, isSubmitting }) => (
                  <Form>
                    <Grid item sm={12}>
                      <FormGroup>
                        <InputLabel className={classes.label}>
                          {"Question"}
                        </InputLabel>
                        <Field
                          type="text"
                          component={TextField}
                          variant="outlined"
                          name="question"
                          fullWidth
                        />
                      </FormGroup>
                    </Grid>

                    <Grid item sm={12}>
                      <FormGroup>
                        <Grid container spacing={3}>
                          <Grid item sm={8}>
                            <InputLabel className={classes.label}>
                              {"Answers"}
                            </InputLabel>
                          </Grid>
                          <Grid item sm={2}>
                            <InputLabel className={classes.label}>
                              {"IsCorrect"}
                            </InputLabel>
                          </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                          <FieldArray
                            name="correct_answers"
                            render={() => (
                              <>
                                {values.answers &&
                                  values.answers.length > 0 &&
                                  values.answers.map((answer, index) => (
                                    <Grid
                                      alignItems="center"
                                      container
                                      item
                                      sm={12}
                                      key={index}
                                    >
                                      <Grid item sm={8}>
                                        <Field
                                          type="text"
                                          component={TextField}
                                          variant="outlined"
                                          name={`answers.${index}`}
                                          fullWidth
                                        />
                                      </Grid>
                                      <Grid item sm={2}>
                                        <Field
                                          color="primary"
                                          type="checkbox"
                                          name="checked"
                                          value={`${index}`}
                                          component={Checkbox}
                                        />
                                      </Grid>
                                      <Grid item sm={2}>
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          onClick={() => removeAnswer(index)}
                                        >
                                          Remove
                                        </Button>
                                      </Grid>
                                    </Grid>
                                  ))}
                                <Grid item sm={12}>
                                  {typeof errors.checked === "string" ? (
                                    <div>{errors.checked}</div>
                                  ) : null}
                                </Grid>
                              </>
                            )}
                          />

                          <Grid item container spacing={3}>
                            <Grid item sm={6}>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => addAnswer(values)}
                              >
                                Add Answer +
                              </Button>
                            </Grid>
                            <Grid item sm={6}>
                              <Button
                                variant="contained"
                                color="secondary"
                                type="submit"
                              >
                                Update Question
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </FormGroup>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

function mapStateToProps(state: any) {
  return {
    questions: state.quiz.questions,
    selectedIndex: state.quiz.selectedIndex,
  };
}

export default connect(mapStateToProps)(QuestionEditor);
