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

  const addExerciseToRoutine = (exerciseId) => {
    axios.post("http://localhost:3000/routines", {
      user_id: user.id,
      exercise_id: exercise.id,
      reps: 12
    })
    .then((response) => {
    console.log("Exercise added to routine", response.data)
    })
    .catch((error) => {
    console.error("Error adding exercise to the routine", error) 
   });
  };
  
  return (
    <div>
      <button onClick={getExercises}>Get Exercises</button>
      <div>
        <h1>All Exercises</h1>
        {exercises.map((exercise) => (
          <div key={exercise.id}>
            <h2>{exercise.name}</h2>
            <p>Description: {exercise.description}</p>
            <img src={exercise.image_url} className="exercise-image" />
            <p>Video: <a href={exercise.video_url}>{exercise.video_url}</a></p>
            <button onClick={() => addExerciseToRoutine(exercise.id)}>Add Exercise to Routine</button>
          </div>
        ))}
      </div>
    </div>
  );
}
