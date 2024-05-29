import { useState } from 'react'
import './App.css'
import Quiz from './components/Quiz'

function App() {
    const [startQuiz, setStartQuiz] = useState(false)

    function handleStartQuizBtn() {
        setStartQuiz(prev => !prev)
    }

    return (
        <main>
            {startQuiz ? <Quiz /> :
                <div className='first-page-content'>
                    <h1>Quizzical</h1>
                    <h2>Test your general knowledge here</h2>
                    <button onClick={handleStartQuizBtn} className='start-quiz-btn'>Start Quiz</button>
                </div>
            }
        </main>
    )
}

export default App
