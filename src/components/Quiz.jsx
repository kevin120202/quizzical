import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import he from 'he';
import Question from "./Question";

export default function Quiz() {
    const [quizData, setQuizData] = useState([])
    const [score, setScore] = useState(0)
    const [showResults, setShowResults] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async () => {
        setIsLoading(true)
        const res = await fetch("https://opentdb.com/api.php?amount=5&difficulty=easy")
        const data = await res.json()
        setQuizData(data.results.map(result => ({
            question: he.decode(result.question),
            correctAnswer: result.correct_answer,
            choices: shuffleArray([...result.incorrect_answers.map(ans => he.decode(ans)), he.decode(result.correct_answer)]),
            selectedAnswer: "none",
            id: uuidv4()
        })))
        setIsLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const getTotalScore = () => {
        let newScore = 0
        quizData.map(question => {
            if (question.correctAnswer === question.selectedAnswer) {
                newScore++
            }
        })
        setScore(newScore)
    }

    const handleOnChangeAnswer = (value, id) => {
        setQuizData(prev => (
            prev.map(question => question.id === id ? { ...question, selectedAnswer: value } : question)
        ))
    }

    const handleOnCheckAnswers = (e) => {
        e.preventDefault()
        if (quizData.every(question => question.selectedAnswer !== "none")) {
            setShowResults(true)
            getTotalScore()
        }
    }

    const newGame = () => {
        setScore(0)
        setShowResults(false)
        setQuizData([])
        fetchData()
    }

    const questionsComponents = quizData.map((question) => (<Question question={question} key={question.id} onChange={handleOnChangeAnswer} showResults={showResults} />))

    return (
        <div className='container'>
            {isLoading ? <p>Loading...</p> :
                <form onSubmit={handleOnCheckAnswers}>
                    {questionsComponents}
                    {showResults && <div className="result-display">
                        <p className="score-display">You got {score}/5 correct</p>
                        <button type="button" onClick={newGame}>Play again</button>
                    </div>}
                    {!showResults && <button className="check-answers-btn">Check Answers</button>}
                </form>
            }
        </div>
    )
}


