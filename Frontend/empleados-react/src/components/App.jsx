import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import EmpleadoForm from "./EmpleadoForm";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/empleados" element={<EmpleadoForm />} />
    </Routes>
  );
}

export default App;
