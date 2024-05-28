import React from "react";
import { decode } from 'html-entities';

export default function Question(props) {

    return (
        <div>
            <p>{decode(props.question.question, { level: 'html5' })}</p>
            {props.question.randomAnswers.map((answer, index) => (
                <div key={index}>
                    <input
                        type="radio"
                        id={`${props.question.id}-${index}`}
                        name={props.question.id}
                        value={answer}
                        checked={props.question.chosenAnswer === answer}
                        onChange={() => props.handleAnswerChange(props.question.id, answer)}
                    />
                    <label htmlFor={`${props.question.id}-${index}`}>{answer}</label>
                </div>
            ))}
        </div>
    )
}
