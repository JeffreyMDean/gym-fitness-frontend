import { useState, useEffect } from "react";
import axios from "axios"

export function ExercisesIndex() {
  const [exercises, setExercises] = useState([]);

  const getExercises = () => {
    console.log("hello")
    axios.get("http://localhost:3000/exercises.json")
    .then((response) => {
      setExercises(response.data);
      console.log(response.data);
    })
  }
  
  return (
    <div>
      <button onClick={getExercises}>Get Exercises</button>
      <div>
        <h1>All Exercises</h1>
        {exercises.map((exercise) => (
          <div key={exercise.id}>
            <h2>{exercise.name}</h2>
            <p>Description: {exercise.description}</p>
            <img src={exercise.url} />
          </div>
        ))}
      </div>
    </div>
  );
}
