import { useState } from 'react'
import './App.css'
import Quiz from './components/Quiz'

function StartQuiz(props) {
    return (
        <div className='start-quiz-container'>
            <h1>Quizzical</h1>
            <p>How many can you get right?</p>
            <button onClick={props.handleShouldShowGame} className='start-quiz-btn'>Start Quiz</button>
        </div>
    )
}

function App() {
    const [shouldShowGame, setShouldShowGame] = useState(false)

    function handleShouldShowGame() {
        setShouldShowGame(true)
    }

    return (
        <main>
            {shouldShowGame
                ? <Quiz />
                : <StartQuiz handleShouldShowGame={handleShouldShowGame} />
            }
        </main>
    )
}

export default App
