import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");
    const navigate = useNavigate();

    // 🔹 Copia aquí la nueva función
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/login", { usuario, clave });

            console.log("Respuesta del backend:", res.data); // 🔍 Verifica qué llega
            
            if (res.data.mensaje.startsWith("¡Bienvenido")) {
                alert(res.data.mensaje); // Mostrar bienvenida
                navigate("/empleados"); // Redirigir a lista de empleados
            } else {
                alert(res.data.mensaje); // Mostrar mensaje de error
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Error del servidor.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
            <input
                type="text"
                name="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Usuario"
                required
            />
            <input
                type="password"
                name="clave"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                placeholder="Clave"
                required
            />
            <button type="submit">Ingresar</button>
        </form>
    );
}

export default Login;
