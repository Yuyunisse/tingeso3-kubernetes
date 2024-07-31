import { useEffect, useState } from "react"
import reparacionesService from "../services/reparaciones.service.js";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TablaReparacionesExistentes() {
  const [reparaciones, setReparaciones] = useState([]);

  

  async function fetchReparacionesExistentes() {
    try{      
      const response = await reparacionesService.listarReparaciones();  
      setReparaciones(response.data);
    }catch(error) {
      alert("Error al obtener la tabla.");
    }
  }
  
  useEffect(() => {
    fetchReparacionesExistentes();
  }, [])


  return (
    <div className="container">
      <h1>Tabla Reparaciones Autofix</h1>
  
      <table class="table table-dark table-bordered">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">P. Gasolina</th>
            <th scope="col">P. Diesel</th>
            <th scope="col">P. Electrico</th>
            <th scope="col">P. Hibrido</th>
          </tr>
        </thead>
        <tbody>        
          {reparaciones.map((reparaciones, index) => ( 
            <tr key={index}>
              <td>{reparaciones.nombre}</td>
              <td>{reparaciones.descripcion}</td>
              <td>{reparaciones.gasolina}</td>
              <td>{reparaciones.diesel}</td>
              <td>{reparaciones.hibrido}</td>
              <td>{reparaciones.electrico}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>   
  )
}
