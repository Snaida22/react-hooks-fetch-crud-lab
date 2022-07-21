import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";


function QuestionList() {
  const [ questions, setQuestions ] = useState([]);

useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
    .then((questions)=>setQuestions(questions))
}, [])
  
  //a function to handle the delete of questions

  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updatedQuestions = questions.filter((question) => question.id !== id);
        setQuestions(updatedQuestions);
      });
  }

  // a fucntion to handle the change of answers
  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((question) => {
          if (question.id === updatedQuestion.id) return updatedQuestion;
          return question;
        });
        setQuestions(updatedQuestions);
      });
  }

  //a variable to hold diplay of questions
  const questionsArray = questions.map((question) =>
  {
    return <QuestionItem
      key={question.id}
      question={question}
      onDeleteClick={handleDeleteClick}
      onAnswerChange={handleAnswerChange}
    />
  }
  )

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionsArray}</ul>
    </section>
  );
}

export default QuestionList;