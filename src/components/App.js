import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questionData, setQuestionData] = useState([])
  const questionsUrl = "http://localhost:4000/questions"

  useEffect(() => {
    fetchQuestions().then(questionData => setQuestionData(questionData))
    // return () => {
    //   cleanup
    // }
  }, [])

  function fetchQuestions() {
    return fetch(questionsUrl)
      .then( response => response.json() )
  }

  function postQuestion(formData){
    const postConfig = {
      method: "POST",
      headers: {
        "Content-type":"application/json"
      },
      body: JSON.stringify( formData )
    }
    return fetch(questionsUrl, postConfig)
      .then( response => response.json() )
  }

  function handleFormSubmit({ prompt, answer1, answer2, answer3, answer4, correctIndex}){
    const formData = {
      prompt,
      answers: [answer1, answer2, answer3, answer4 ],
      correctIndex
    }
    postQuestion(formData).then( newQuestion => setQuestionData([...questionData, newQuestion]))
  }

  function handleQuestionDelete(deletedId){
    const newQuestionData = questionData.filter( question => question.id !== deletedId )
    setQuestionData(newQuestionData)
  }

  function handleQuestionUpdate(updatedQuestion){
    const newQuestionData = questionData.map( question => {
      return question.id === updatedQuestion.id ? updatedQuestion : question
    })
    setQuestionData(newQuestionData)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
        <QuestionForm onFormSubmit={handleFormSubmit}/> : 
        <QuestionList 
          questionData={questionData} 
          onQuestionDelete={handleQuestionDelete} 
          onQuestionUpdate={handleQuestionUpdate}
        />
      }
    </main>
  );
}

export default App;
