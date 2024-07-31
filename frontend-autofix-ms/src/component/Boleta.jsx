import React, { useState } from 'react';
import historialService from "../services/historial.service.js";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Boleta() {
  const [patente, setPatente] = useState('');
  const [fechaI, setFechaI] = useState('');
  const [data, setData] = useState(null); // Cambiado a null para manejar como objeto único
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  //Estados para la actualizarSalida
  const [fechaS, setFechaS] = useState(''); 
  const [horaS, setHoraS] = useState('');

  async function fetchBoleta() {
    try {
      setLoading(true);
      const response = await historialService.mostrarBoleta(patente, fechaI);
      setData(response); // Cambiado a setData(response)
      setError(''); // Limpia cualquier error previo
    } catch (error) {
      setError('Error al obtener la boleta.'); // Maneja el error
      console.error('Error al obtener la boleta:', error); // Loguea el error en la consola
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  }

  async function actualizarMontos() {
    try {
      setLoading(true);
      // Llamar a la función de servicio para actualizar montos
      await historialService.actualizarMontos(patente, fechaI);
      // Volver a obtener la boleta actualizada
      await fetchBoleta();
    } catch (error) {
      setError('Error al actualizar montos.'); // Maneja el error
      console.error('Error al actualizar montos:', error); // Loguea el error en la consola
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  }

  async function aplicarConvenio() {
    try {
      setLoading(true);
      // Llamar a la función de servicio para actualizar montos
      await historialService.aplicarConvenio(patente, fechaI);
      // Volver a obtener la boleta actualizada
      await fetchBoleta();
    } catch (error) {
      setError('No se aplica el bono.'); // Maneja el error
      console.error('Error al aplicar bono:', error); // Loguea el error en la consola
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  }

  async function actualizarDespacho() {
    try {
      setLoading(true);
      // Llamar a la función de servicio para actualizar despacho
      await historialService.actualizarDes(patente, fechaI);
      // Volver a obtener la boleta actualizada
      await fetchBoleta();
    } catch (error) {
      setError('Error al actualizar despacho.'); // Maneja el error
      console.error('Error al actualizar despacho:', error); // Loguea el error en la consola
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  }

  async function actualizarSalida() {
    try {
      setLoading(true);
      // Llamar a la función de servicio para actualizar salida con los datos ingresados por el usuario
      await historialService.actualizarSalida(patente, fechaI, fechaS, horaS);
      setData((prevData) => ({
        ...prevData,
        fechaS,
        horaS,
      }));
      
      // Volver a obtener la boleta actualizada
      await fetchBoleta();
    } catch (error) {
      setError('Error al actualizar salida.'); // Maneja el error
      console.error('Error al actualizar salida:', error); // Loguea el error en la consola
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  }



  function handleSubmit(e) {
    e.preventDefault();
    fetchBoleta();
  }

  function handleOtroBoton() {
    // Aquí puedes implementar la lógica para el nuevo botón
    alert('¡Boleta pagada!');
  }

  return (
    <div className="container">
      <h1>Buscar Boleta</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group ">
          <label htmlFor="patente">Patente:</label>
          <input
            type="text"
            id="patente"
            className="form-control"
            value={patente}
            onChange={(e) => setPatente(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fechaI">Fecha:</label>
          <input
            type="date"
            id="fechaI"
            className="form-control"
            value={fechaI}
            onChange={(e) => setFechaI(e.target.value)}
            required
          />

        </div>
        <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>

      </form>
     
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && ( // Cambiado a data && para verificar que data no sea null o undefined
        <>
        <table className="table table-dark table-bordered mt-4">
          <thead>
            <tr>
              <th scope="col">Patente</th>
              <th scope="col">Fecha Ingreso</th>
              <th scope="col">Hora Ingreso</th>
              <th scope="col">Total Reparaciones</th>
              <th scope="col">Recargos</th>
              <th scope="col">Descuentos</th>
              <th scope="col">IVA</th>
              <th scope="col">Total</th>
              <th scope="col">Fecha Salida</th>
              <th scope="col">Hora Salida</th>
              <th scope="col">Fecha Despacho</th>
              <th scope="col">Hora Despacho</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.patente || '-'}</td>
              <td>{data.fechaI || '-'}</td>
              <td>{data.horaI || '-'}</td>
              <td>{data.totalR || '-'}</td>
              <td>{data.recargos || '-'}</td>
              <td>{data.descuentos || '-'}</td>
              <td>{data.iva || '-'}</td>
              <td>{data.total || '-'}</td>
              <td>{data.fechaS || '-'}</td>
              <td>{data.horaS || '-'}</td>
              <td>{data.fechaD || '-'}</td>
              <td>{data.horaD || '-'}</td>
            </tr>
          </tbody>
        </table>

        <div className="form-group">
            <label htmlFor="fechaS">Fecha Salida:</label>
            <input
              type="date"
              id="fechaS"
              className="form-control"
              value={fechaS}
              onChange={(e) => setFechaS(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="horaS">Hora Salida:</label>
            <input
              type="time"
              id="horaS"
              className="form-control"
              value={horaS}
              onChange={(e) => setHoraS(e.target.value)}
              required
            />
          </div>

        <div className="btn-group mt-4" role="group" aria-label="Actualizar">
            <button className="btn btn-info  " onClick={actualizarMontos}>Actualizar Montos</button>
            <button className="btn btn-info" style={{ marginLeft: '8px' }} onClick={actualizarDespacho}>Actualizar Despacho</button>
            <button className="btn btn-info "style={{ marginLeft: '8px' }} onClick={actualizarSalida}>Actualizar Salida</button>
            <button className="btn btn-info "style={{ marginLeft: '8px' }} onClick={aplicarConvenio}>Aplicar Bono TopCar</button>
        </div>
      </>
    )}

    <div className="text-center mt-4">
       <button type="button" className="btn btn-success" onClick={handleOtroBoton}>Pagar</button>
      </div>
    </div>
    
  );
}

