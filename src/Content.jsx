import { Signup } from './Signup';
import { Login } from './Login';
import { LogoutLink } from './LogoutLink';
import { Routes, Route } from "react-router-dom";
import { ExercisesIndex } from './ExercisesIndex';

export function Content() {

  return (
    <main>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Login />} /> 
        <Route path="/exercises" element={<ExercisesIndex />} />
      </Routes>
    </main>
  )
}

