import { useState } from 'react'
import './App.css'
import Quiz from './components/Quiz'

function StartQuiz(props) {
    return (
        <div>
            <h1>Quizzical</h1>
            <p>How many can you get right?</p>
            <button onClick={props.handleShouldShowGame} className='btn'>Start Quiz</button>
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
