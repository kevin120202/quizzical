import { useState } from 'react'
import './App.css'
import Quiz from './components/Quiz'

function App() {
    const [StartQuiz, setStartQuiz] = useState(false)

    function handleStartQuizBtn() {
        setStartQuiz(prev => !prev)
    }

    return (
        <main>
            {StartQuiz ? <Quiz /> :
                <div>
                    <h1>Quizzical</h1>
                    <button onClick={handleStartQuizBtn}>Start Quiz</button>
                </div>
            }
        </main>
    )
}

export default App
