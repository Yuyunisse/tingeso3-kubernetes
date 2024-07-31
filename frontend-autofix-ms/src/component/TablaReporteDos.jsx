import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import reportesService from "../services/reportes.service.js"; 

const TablaReporteDos = () => {
  const [mesInicial, setMesInicial] = useState(""); // Estado para almacenar el mes inicial
  const [anoInicial, setAnoInicial] = useState(""); // Estado para almacenar el año inicial
  const [reporte, setReporte] = useState([]);
  const [error, setError] = useState(null);
  const [mes1, setMes1] = useState("");
  const [mes2, setMes2] = useState("");
  const [mes3, setMes3] = useState("");

  // Función para manejar cambios en el input de mes
  const handleMesChange = (e) => {
    setMesInicial(e.target.value);
  };

  // Función para manejar cambios en el input de año
  const handleAnoChange = (e) => {
    setAnoInicial(e.target.value);
  };

  // Función para obtener y actualizar el reporte según mes y año seleccionados
  const fetchTablaReporteDos = async () => {
    try {
      // Verificar que mes y año no sean vacíos antes de hacer la solicitud
      if (mesInicial && anoInicial) {
        const response = await reportesService.reporteDos(mesInicial, anoInicial);
        setReporte(response.data); // Actualizar el estado con los datos obtenidos
        if (response.data.length > 0) {
          const primerReporte = response.data[0];
          setMes1(primerReporte.mes1);
          setMes2(primerReporte.mes2);
          setMes3(primerReporte.mes3);
        }
      }
    } catch (error) {
      setError("Error al obtener la tabla.");
    }
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

  // Función para manejar el evento de clic en el botón "Generar Tabla"
  const handleGenerarTablaClick = () => {
    fetchTablaReporteDos();
  };

   

  return (
    <div className="container">
      <h1>Reporte Reparaciones v/s Meses</h1>
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
      {}
      {reporte.length > 0 && (
        <>
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th scope="col">Reparacion</th>
              <th scope="col">{mes1}</th>
              <th scope="col">Variacion</th>
              <th scope="col">{mes2}</th>
              <th scope="col">Variacion</th>
              <th scope="col">{mes3}</th>
           
            </tr>
          </thead>
          <tbody>
            {reporte.map((reporteItem, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td rowSpan="2">{reporteItem.nombreReparacion}</td> 
                  <td>{reporteItem.cantidad1}</td>
                  <td>{reporteItem.variacionCantidad1}</td>
                  <td>{reporteItem.cantidad2}</td>
                  <td>{reporteItem.variacionCantidad2}</td>
                  <td>{reporteItem.cantidad3}</td>
                </tr>
                <tr>
                
                  <td>{reporteItem.monto1}</td>
                  <td>{reporteItem.variacionMonto1}</td>
                  <td>{reporteItem.monto2}</td>
                  <td>{reporteItem.variacionMonto2}</td>
                  <td>{reporteItem.monto3}</td>
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

export default TablaReporteDos;