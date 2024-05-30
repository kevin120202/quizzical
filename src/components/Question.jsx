import React from "react";

export default function Question(props) {
    const changeBackgroundColorOfSelectedAnswer = (isSelected) => {
        return isSelected ? { backgroundColor: "#4D5B9E", color: "white" } : {}
    }

    return (
        <div>
            <p>{props.question.question}</p>
            <div className="question-container">
                {props.question.choices.map((choice, index) => {
                    const isSelected = props.question.selectedAnswer === choice;
                    const isCorrect = props.question.correctAnswer === choice;
                    const showResults = props.showResults;

                    let style = changeBackgroundColorOfSelectedAnswer(isSelected);
                    if (showResults) {
                        if (isCorrect) {
                            style = { backgroundColor: "green" };
                        } else if (isSelected && !isCorrect) {
                            style = { backgroundColor: "red" };
                        }
                    }

                    return <div key={index} className="choices-container">
                        <input
                            type="radio"
                            name={props.question.id}
                            value={choice}
                            id={`${props.question.id}-${index}`}
                            checked={props.question.selectedAnswer === choice}
                            onChange={e => props.onChange(e.target.value, props.question.id)}
                            disabled={showResults}
                        />
                        <label htmlFor={`${props.question.id}-${index}`}
                            style={style}>
                            {choice}
                        </label>
                    </div>
                })}
            </div>
        </div>
    )
}


