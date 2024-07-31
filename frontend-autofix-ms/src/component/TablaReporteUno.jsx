import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import reportesService from "../services/reportes.service.js"; 

const TablaReporteUno = () => {
  const [mesInicial, setMesInicial] = useState(""); // Estado para almacenar el mes inicial
  const [anoInicial, setAnoInicial] = useState(""); // Estado para almacenar el año inicial
  const [reporte, setReporte] = useState(null); // Estado para almacenar el reporte, inicializado como null
  const [error, setError] = useState(null); // Estado para manejar errores

  // Función para manejar cambios en el input de mes
  const handleMesChange = (e) => {
    setMesInicial(e.target.value);
  };

  // Función para manejar cambios en el input de año
  const handleAnoChange = (e) => {
    setAnoInicial(e.target.value);
  };

  // Función para obtener y actualizar el reporte según mes y año seleccionados
  const fetchTablaReporteUno = async () => {
    try {
      // Verificar que mes y año no sean vacíos antes de hacer la solicitud
      if (mesInicial && anoInicial) {
        const response = await reportesService.reporteUno(mesInicial, anoInicial);
        setReporte(response.data); // Actualizar el estado con los datos obtenidos
      }
    } catch (error) {
      setError("Error al obtener la tabla.");
    }
  };

  // Función para manejar el evento de clic en el botón "Generar Tabla"
  const handleGenerarTablaClick = () => {
    fetchTablaReporteUno();
  };

  const handleDescargarReporteClick = () => {
    // Aquí puedes agregar la lógica para descargar el reporte, por ejemplo:
    // Simular una descarga o abrir una nueva ventana con el archivo descargable
    alert("Descargando reporte...");
  };

  useEffect(() => {
    // No realizar la solicitud automáticamente al montar el componente
    // Sino solo cuando se presione el botón "Generar Tabla"
  }, [mesInicial, anoInicial]);

  if (error) {
    return <div>Error: {error}</div>; // Mostrar un mensaje de error si ocurrió un problema al obtener los datos
  }

  return (
    <div className="container">
      <h1>Reporte Reparaciones v/s Tipo de Vehiculo</h1>

      {/* Formulario para ingresar mes y año */}
      <form className="row g-3 align-items-center">
        <div className="col-md-6">
          <label htmlFor="mes" className="form-label">Mes</label>
          <select id="mes" className="form-select" value={mesInicial} onChange={handleMesChange}>
            <option value="">Seleccionar mes</option>
            <option value="1">1-Enero</option>
            <option value="2">2-Febrero</option>
            <option value="3">3-Marzo</option>
            <option value="4">4-Abril</option>
            <option value="5">5-Mayo</option>
            <option value="6">6-Junio</option>
            <option value="7">7-Julio</option>
            <option value="8">8-Agosto</option>
            <option value="9">9-Sept</option>
            <option value="10">10-Oct</option>
            <option value="11">11-Nov</option>
            <option value="12">12-Dic</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="ano" className="form-label">Año</label>
          <input type="number" className="form-control" id="ano" value={anoInicial} onChange={handleAnoChange} />
        </div>
      </form>

      {/* Botón para generar la tabla */}
      <button className="btn btn-primary my-3" onClick={handleGenerarTablaClick}>
        Generar Reporte
      </button>

      {/* Mostrar la tabla solo si reporte tiene datos */}
      {reporte !== null && (
        <>
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Sedan</th>
              <th scope="col">Hatchback</th>
              <th scope="col">SUV</th>
              <th scope="col">Pickup</th>
              <th scope="col">Furgoneta</th>
            </tr>
          </thead>
          <tbody>
            {reporte.map((reporteItem, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td rowSpan="2">{reporteItem.nombreR}</td>
                  
                  <td>{reporteItem.sedanCantidad}</td>
                  <td>{reporteItem.hatchCantidad}</td>
                  <td>{reporteItem.suvCantidad}</td>
                  <td>{reporteItem.pickupCantidad}</td>
                  <td>{reporteItem.furgonetaCantidad}</td>
                </tr>
                <tr>
                  
                  <td>{reporteItem.sedanTotal}</td>
                  <td>{reporteItem.hatchTotal}</td>
                  <td>{reporteItem.suvTotal}</td>
                  <td>{reporteItem.pickupTotal}</td>
                  <td>{reporteItem.furgonetaTotal}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
        
        {/* Botón para descargar el reporte */}
        <button className="btn btn-success" onClick={handleDescargarReporteClick}>Descargar Reporte</button>
        </>
      )}
  
    </div>
  );
};

export default TablaReporteUno;

