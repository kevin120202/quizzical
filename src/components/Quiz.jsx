import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Question from "./Question";

export default function Quiz() {
    const [quizQuestions, setQuizQuestions] = useState([])

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple")
            .then(res => res.json())
            .then(data => {
                setQuizQuestions(data.results)
            })
    }, [])

    console.log(quizQuestions);

    const questionsComponents = quizQuestions.map(question => {
        return <Question question={question} key={uuidv4()} />
    })

    console.log(questionsComponents);


    return (
        <div>
            <h1>Quiz</h1>
            {questionsComponents}
        </div>
    )
}