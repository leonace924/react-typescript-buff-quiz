import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './redux/appReducer';
import { Grid } from '@material-ui/core';
import QuestionsList from './components/QuestionList'
import QuestionEditor from './components/QuestionEditor';



function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Grid container spacing={1}>
          <QuestionEditor />
          <QuestionsList />
        </Grid>
      </div>


    </Provider>
  );
}

export default App;
