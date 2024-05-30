import React from "react";

export default function Question(props) {

    console.log(props.question);
    // const styles = {
    //     backgroundColor: 
    // }

    return (
        <div>
            <p>{props.question.question}</p>
            {props.question.choices.map((choice, index) => (
                <div key={index}>
                    <input
                        type="radio"
                        name={props.question.id}
                        value={choice}
                        id={`${props.question.id}-${index}`}
                        checked={props.question.selectedAnswer === choice}
                        onChange={e => props.onChange(e.target.value, props.question.id)}
                    />
                    <label htmlFor={`${props.question.id}-${index}`}>{choice}</label>
                </div>
            ))}
        </div>
    )
}

