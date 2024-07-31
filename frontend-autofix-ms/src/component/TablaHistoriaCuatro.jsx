import { useEffect, useState } from "react"
import historialService from "../services/historial.service.js";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TablaHistoriUsuarioCuatro() {
  const [hucuatro, setHucuatro] = useState([]);

  

  async function fetchTablaHistoriUsuarioCuatro() {
    try{      
      const response = await historialService.historiaCuatro();  
      setHucuatro(response.data);
    }catch(error) {
      alert("Error al obtener la tabla.");
    }
  }
  
  useEffect(() => {
    fetchTablaHistoriUsuarioCuatro();
  }, [])


  return (
    <div className="container">
      <h1>Registro de Vehiculo x Historial</h1>

      <table className="table table-dark table-bordered mt-4">
        <thead>
          <tr>
            <th scope="col">Patente</th>
            <th scope="col">marca</th>
            <th scope="col">Modelo</th>
            <th scope="col">Tipo</th>
            <th scope="col">Año</th>
            <th scope="col">Motor</th>
            <th scope="col">F. Ingreso</th>
            <th scope="col">H. Ingreso</th>
            <th scope="col">Total</th>
            <th scope="col">Recargos</th>
            <th scope="col">Descuentos</th>
            <th scope="col">Subtotal</th>
            <th scope="col">IVA</th>
            <th scope="col">Costo total</th>
            <th scope="col">F. Salida</th>
            <th scope="col">H. Salida</th>
            <th scope="col">F. Despacho</th>
            <th scope="col">H. Despacho</th>

          </tr>
        </thead>
        <tbody>        
          {hucuatro.map((hucuatro, index) => ( 
            <tr key={index}>
              <td>{hucuatro.patente}</td>
              <td>{hucuatro.marca}</td>
              <td>{hucuatro.modelo}</td>
              <td>{hucuatro.tipo}</td>
              <td>{hucuatro.ano}</td>
              <td>{hucuatro.motor}</td>
              <td>{hucuatro.fecha_ingreso}</td>
              <td>{hucuatro.hora_ingreso}</td>
              <td>{hucuatro.total}</td>
              <td>{hucuatro.recargos}</td>
              <td>{hucuatro.descuentos}</td>
              <td>{hucuatro.subtotal}</td>
              <td>{hucuatro.iva}</td>
              <td>{hucuatro.costoTotal}</td>
              <td>{hucuatro.fecha_salida}</td>
              <td>{hucuatro.hora_salida}</td>
              <td>{hucuatro.fecha_despacho}</td>
              <td>{hucuatro.hora_despacho}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>   
  )
}
