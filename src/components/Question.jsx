import React from "react";

export default function Question(props) {
    console.log(props);
    return (
        <div>
            <p>{props.question.question}</p>
        </div>
    )
}