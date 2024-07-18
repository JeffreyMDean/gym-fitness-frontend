import { useState, useEffect } from "react";
import axios from "axios"

export function ExercisesIndex() {
  const [exercises, setExercises] = useState([]);
  const [reps, setReps] = useState([]);

  const getExercises = () => {
    console.log("hello")
    axios.get("http://localhost:3000/exercises.json")
    .then((response) => {
      setExercises(response.data);
      console.log(response.data);
    }) 
  }

  const addExerciseToRoutine = (exerciseId) => {
    console.log(exerciseId)
    axios.post("http://localhost:3000/routines.json", {
      exercise_id: exerciseId,
      reps: reps[exerciseId]
    })
    .then((response) => {
    console.log("Exercise added to routine", response.data)
    })
    .catch((error) => {
    console.error("Error adding exercise to the routine", error) 
   });
  };

  const handleChange = (exerciseId, event) => {
    setReps({
      ...reps,
      [exerciseId]: event.target.value
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
            <input type="text" value={reps[exercise.id || ""]} onChange={(event) => handleChange(exercise.id, event)} />
            <button onClick={() => addExerciseToRoutine(exercise.id)}>Add Exercise to Routine</button>
          </div>
        ))}
      </div>
    </div>
  );
}
