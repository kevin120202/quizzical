import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Question from "./Question";

export default function Quiz() {
    const [quizQuestionsData, setQuizQuestionsData] = useState([])
    const [score, setScore] = useState(0)
    const [isCheckedAnswers, setIsCheckedAnswers] = useState(false)

    useEffect(() => {
        fetchQuestions()
    }, [])

    const fetchQuestions = async () => {
        const res = await fetch("https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple")
        const data = await res.json()
        setQuizQuestionsData(data.results.map(result => ({
            question: result.question,
            correctAnswer: result.correct_answer,
            randomAnswers: getRandomAnswersArray([...result.incorrect_answers], result.correct_answer),
            id: uuidv4(),
            chosenAnswer: "none",
        })))
    }

    const getRandomAnswersArray = (array, item) => {
        const randomIndex = Math.floor(Math.random() * (array.length + 1))
        array.splice(randomIndex, 0, item)
        return array
    }

    console.log(quizQuestionsData);

    const handleAnswerChange = (id, answer) => {
        setQuizQuestionsData(prevQuestion => {
            return prevQuestion.map(question =>
                question.id === id ? { ...question, chosenAnswer: answer } : question
            )
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsCheckedAnswers(prev => !prev)
        let score = 0
        quizQuestionsData.map(question => {
            if (question.correctAnswer === question.chosenAnswer) {
                score++
            }
        })
        setScore(score)
    }

    const handlePlayAgain = () => {
        fetchQuestions();
        setIsCheckedAnswers(false)
        setScore(0);
    }

    const questionsComponents = quizQuestionsData.map(question => {
        return <Question question={question} key={question.id} handleAnswerChange={handleAnswerChange} isCheckedAnswers={isCheckedAnswers} />
    })

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {questionsComponents}
                {isCheckedAnswers && <p className="score-text">You scored {score}/5 answers</p>}
                {!isCheckedAnswers ? <button className="check-answers-btn" disabled={isCheckedAnswers}>Check Answers</button>
                    : <button type="button" onClick={handlePlayAgain}>Play again</button>}
            </form>
        </div>
    )
}