import { useEffect, useState } from "react"
import reparacionesService from "../services/reparaciones.service.js";

export default function RegistrarReparacion() {
  const [reparacion, setReparacion] = useState({
    nombre: "",
    descripcion: "",
    gasolina: 0,
    diesel: 0,
    hibrido: 0,
    electrico: 0,
    
    
  })


  async function registrarReparacionHandler(event) {
    event.preventDefault();
    try{      
      const response = await reparacionesService.registrarReparacion(reparacion);

      //Reinicio los estados (reinicio los campos del formulario)
      setReparacion({
        nombre: "",
        descripcion: "",
        gasolina: 0,
        diesel: 0,
        hibrido: 0,
        electrico: 0,
       
    })

      alert("Reparacion agregada con exito");
    }catch(error) {      
      alert("Error al registrar.");
    }
  }

  function onChangeReparacionHandler(event) {
    setReparacion({      
      ...reparacion,
      [event.target.id]: event.target.value,
    })
  }


return (
    <div className="container">
      <h1 className="mb-4">Agregar nueva Reparacion</h1>
      <form className="border row g-3 px-4">
        <div className="col-12">
          <label 
            htmlFor="nombre" 
            className="form-label"
          >
            Nombre de la reparacion
          </label>
          <input 
            id="nombre" 
            type="text" 
            className="form-control" 
            value={reparacion.nombre} 
            onChange={onChangeReparacionHandler} 
          />          
        </div>

        <div className="col-md-6 mr-md-3">
          <label 
            htmlFor="descripcion" 
            className="form-label"
          >
            Descripción
          </label>
          <input 
            id="descripcion" 
            type="text" 
            className="form-control" 
            value={reparacion.descripcion} 
            onChange={onChangeReparacionHandler} 
          />
        </div>

        <div className="col-md-6">
            <label 
              htmlFor="gasolina" 
              className="form-label"
              >
                Precio motor gasolina
            </label>
            <input 
            id="gasolina" 
            type="number" 
            className="form-control" 
            value={reparacion.gasolina} 
            onChange={onChangeReparacionHandler} 
          />
        </div>

        <div className="col-md-6">
            <label 
              htmlFor="diesel" 
              className="form-label"
              >
                Precio motor diesel
            </label>
            <input 
            id="diesel" 
            type="number" 
            className="form-control" 
            value={reparacion.diesel} 
            onChange={onChangeReparacionHandler} 
          />
        </div>

        <div className="col-md-6">
            <label 
              htmlFor="hibrido" 
              className="form-label"
              >
                Precio motor hibrido
            </label>
            <input 
            id="hibrido" 
            type="number" 
            className="form-control" 
            value={reparacion.hibrido} 
            onChange={onChangeReparacionHandler} 
          />
        </div>

        <div className="col-md-6">
            <label 
              htmlFor="electrico" 
              className="form-label"
              >
                Precio motor electrico
            </label>
            <input 
            id="electrico" 
            type="number" 
            className="form-control" 
            value={reparacion.electrico} 
            onChange={onChangeReparacionHandler} 
          />
        </div>

        <div className="col-12 mt-4 mb-4" >
          <button 
            type="submit" 
            className="btn btn-primary" 
            onClick={registrarReparacionHandler}
          >
            Agregar
          </button>
        </div>
      </form>
    </div>
  )
}