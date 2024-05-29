import React from "react";
import { decode } from 'html-entities';

export default function Question(props) {
    return (
        <div className="question-container">
            <p>{decode(props.question.question)}</p>
            {props.question.randomAnswers.map((answer, i) => (
                <div key={i} className="answers-container">
                    <input
                        className="radio-input"
                        type="radio"
                        id={`${props.question.id}-${i}`}
                        name={props.question.id}
                        value={answer}
                        checked={props.question.chosenAnswer === answer}
                        onChange={() => props.handleAnswerChange(props.question.id, answer)}
                        disabled={props.isCheckedAnswers}
                    />
                    <label
                        className="radio-label"
                        htmlFor={`${props.question.id}-${i}`}
                        style={{
                            backgroundColor: props.isCheckedAnswers
                                ? answer === props.question.correctAnswer
                                    ? props.question.chosenAnswer === props.question.correctAnswer
                                        ? "#94D7A2" // Green if correct answer was chosen
                                        : "#D6DBF5" // Highlight correct answer if chosen answer was wrong
                                    : props.question.chosenAnswer === answer
                                        ? "#F8D7DA" // Red if wrong answer was chosen
                                        : "none"
                                : "none"
                        }}>
                        {decode(answer)}
                    </label>
                </div>
            ))}
        </div>
    )
}
