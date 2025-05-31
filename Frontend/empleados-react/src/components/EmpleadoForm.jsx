import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";

export default function EmpleadoForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [empleados, setEmpleados] = useState([]);  

    const onSubmit = async (data) => {
        try {
            await axios.post('${apiUrl}/empleados', data);
            alert("Empleado guardado satisfactoriamente");
            reset();
        } catch (error) {
            alert("Error al guardar el empleado");
        }
    };

    // Cargar los empleados
    useEffect(() => {
        axios.get("`${apiUrl}/empleados")
            .then(response => setEmpleados(response.data))
            .catch(error => console.error("Error al obtener empleados", error));
    }, []);

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="card">
                <div className="card-content">
                    <div className="input-field">
                        <input id="Name" type="text" {...register("Name", { required: true })} />
                        <label htmlFor="name">Nombre</label>
                        {errors.Name && <span className="red-text">Este campo es requerido</span>}
                    </div>
                    <div className="input-field">
                        <input id="Position" type="text" {...register("Position", { required: true })} />
                        <label htmlFor="position">Cargo</label>
                        {errors.Position && <span className="red-text">Este campo es requerido</span>}
                    </div>
                    <div className="input-field">
                        <input id="Office" type="text" {...register("Office", { required: true })} />
                        <label htmlFor="office">Lugar de trabajo</label>
                        {errors.Office && <span className="red-text">Este campo es requerido</span>}
                    </div>
                    <div className="input-field">
                        <input id="Salary" type="number" {...register("Salary", { required: true, min: 0 })} />
                        <label htmlFor="salary">Salario</label>
                        {errors.Salary && <span className="red-text">Este campo es requerido y debe ser positivo</span>}
                    </div>
                </div>
                <div className="card-action">
                    <button type="button" className="btn grey" onClick={() => reset()}>Limpiar</button>
                    <button type="submit" className="btn">Guardar</button>
                </div>
            </form>


        </div>
    );
}
