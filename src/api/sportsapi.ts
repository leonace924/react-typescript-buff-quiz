

// TODO implement: https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple

export const getQuestions = () => { 
    return JSON.parse(`{"response_code":0,"results":[{"category":"Sports","type":"multiple","difficulty":"medium","question":"Which of these teams is a member of the NHL era?","correct_answer":"Philadelphia Flyers","incorrect_answers":["New York Rangers","Toronto Maple Leafs","Boston Bruins"]}]}`);
 }