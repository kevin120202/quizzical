import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Question from "./Question";

export default function Quiz() {
    const [quizQuestions, setQuizQuestions] = useState([])
    const [isSubmit, setIsSubmit] = useState(false)
    const [score, setScore] = useState(0)

    useEffect(() => {
        const fetchQuestions = async () => {
            const res = await fetch("https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple")
            const data = await res.json()
            setQuizQuestions(data.results.map(result => ({
                question: result.question,
                correctAnswer: result.correct_answer,
                randomAnswers: getRandomAnswersArray([...result.incorrect_answers], result.correct_answer),
                id: uuidv4(),
                chosenAnswer: "none",
            })))
        }
        fetchQuestions()
    }, [])

    const getRandomAnswersArray = (array, item) => {
        const randomIndex = Math.floor(Math.random() * (array.length + 1))
        array.splice(randomIndex, 0, item)
        return array
    }

    const handleAnswerChange = (id, answer) => {
        setQuizQuestions(prevQuestion => {
            return prevQuestion.map(question =>
                question.id === id ? { ...question, chosenAnswer: answer } : question
            )
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let newScore = 0
        quizQuestions.forEach(question => {
            if (question.correctAnswer === question.chosenAnswer) {
                newScore += 1
            }
        })
        setScore(newScore)
        setIsSubmit(prev => !prev)
    }

    const questionsComponents = quizQuestions.map(question => {
        return <Question question={question} key={question.id} handleAnswerChange={handleAnswerChange} />
    })

    console.log(quizQuestions);

    return (
        <div>
            <h1>Quiz</h1>
            <form onSubmit={handleSubmit}>
                {questionsComponents}
                {isSubmit && <p>You scored {score}/5 correct answers</p>}
                {isSubmit ? <button>Play again</button> : <button>Submit</button>}
            </form>
        </div>
    )
}