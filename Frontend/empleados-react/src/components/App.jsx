import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Empleados from './EmpleadoForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta para login */}
        <Route path="/login" element={<Login />} />
        
        {/* Ruta para empleados */}
        <Route path="/empleados" element={<EmpleadoForm />} />
        
        {/* Redirige cualquier otra ruta a /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
