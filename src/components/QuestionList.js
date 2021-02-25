import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questionData, onQuestionDelete, onQuestionUpdate }) {

  const questionComponents = questionData.map( question => {
    return (
      <QuestionItem 
        key={question.id} 
        question={question} 
        onQuestionDelete={onQuestionDelete}
        onQuestionUpdate={onQuestionUpdate}
      /> 
    )
  })
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionComponents}</ul>
    </section>
  );
}

export default QuestionList;
