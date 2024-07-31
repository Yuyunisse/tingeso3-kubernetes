import { useEffect, useState } from "react"
import historialService from "../services/historial.service.js";
import reparacionesService from "../services/reparaciones.service.js";

export default function RegistrarDetalle() {
  const [detalle, setDetalle] = useState({
    patente: "",
    reparacion: "",
    fechaI: "",
    horaI: "",
    
  });

  const [opcionesReparacion, setOpcionesReparacion] = useState([]);

  useEffect(() => {
    async function fetchReparaciones() {
      try {
        const response = await reparacionesService.listarReparaciones();
        setOpcionesReparacion(response.data);
      } catch (error) {
        alert("Error al obtener reparaciones.");
      }
    }

    fetchReparaciones();
  }, []);


  async function registrarDetallenHandler(event) {
    event.preventDefault();
    try{      
      const response = await historialService.registrarDetalle(detalle);

      //Reinicio los estados (reinicio los campos del formulario)
      setDetalle({
        patente: "",
        reparacion: "",
        fechaI: "",
        horaI: "",
        
       
    })

      alert("Detalle Reparacion registrado con exito");
    }catch(error) {      
      alert("Error al registrar.");
    }
  }

  function onChangeDetalleHandler(event) {
    setDetalle({      
      ...detalle,
      [event.target.id]: event.target.value,
    })
  }


return (
    <div className="container">
      <h1 className="mb-4">Registrar Reparacion</h1>
      <form className="border row g-3 px-4">
        <div className="col-12">
          <label 
            htmlFor="patente" 
            className="form-label"
          >
            Patente
          </label>
          <input 
            id="patente" 
            type="text" 
            className="form-control" 
            value={detalle.patente} 
            onChange={onChangeDetalleHandler} 
          />          
        </div>

        <div className="col-md-6">
          <label htmlFor="reparacion" className="form-label">
            Reparacion
          </label>
          <select
            id="reparacion"
            className="form-select"
            value={detalle.reparacion}
            onChange={onChangeDetalleHandler}
          >
            <option value="">Seleccionar tipo Reparacion</option>
            {opcionesReparacion.map((opcion) => (
              <option key={opcion.id} value={opcion.nombre}>
                {opcion.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label 
            htmlFor="fechaI" 
            className="form-label"
          >
            Fecha Ingreso
          </label>
          <input 
            id="fechaI" 
            type= "date" 
            className="form-control" 
            value={detalle.fechaI} 
            onChange={onChangeDetalleHandler} 
          />
        </div>

        <div className="col-md-6">
          <label 
            htmlFor="horaI" 
            className="form-label"
          >
            Hora Ingreso
          </label>
          <input 
            id="horaI" 
            type= "time" 
            className="form-control" 
            value={detalle.horaI} 
            onChange={onChangeDetalleHandler} 
          />
        </div>

        <div className="col-12 mt-4 mb-4" >
          <button 
            type="submit" 
            className="btn btn-primary" 
            onClick={registrarDetallenHandler}
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  )
}