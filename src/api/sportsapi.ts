import Axios from "axios";
import { QuestionResponse } from "../types/Question";

// TODO implement: https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple

export const getQuestions = () => {
  const url =
    "https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple";

  return Axios.get(url)
    .then((response) => response.data)
    // .then((data: QuestionResponse) => data)
    .catch((err) => console.log(`fetching the quiz failed ${err}`));
};
