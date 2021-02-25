import React from "react";

function QuestionItem({ question, onQuestionDelete, onQuestionUpdate }) {
  const { id, prompt, answers, correctIndex } = question;
  
  function handleDeleteClick(){
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then(response => response.json() )
      .then( onQuestionDelete(id) )
  }

  function handleAnswerChange(event){
    const patchConfig = {
      method:"PATCH",
      headers: {
        "Content-type":"application/json"
      },
      body: JSON.stringify( {correctIndex: parseInt(event.target.value) })
    }

    return fetch(`http://localhost:4000/questions/${id}`, patchConfig)
      .then( response => response.json() )
      .then( updatedQuestion => onQuestionUpdate(updatedQuestion))
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswerChange}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
