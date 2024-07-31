import { useEffect, useState } from "react"
import vehiculoService from "../services/vehiculo.service.js";

export default function RegistrarVehiculo() {
  const [vehiculo, setVehiculo] = useState({
    patente: "",
    marca: "",
    modelo: "",
    tipo: "",
    ano_fab: 0,
    motor: "",
    asientos: 0,
    kilometraje: 0,
  })


  async function registrarVehiculoHandler(event) {
    event.preventDefault();
    try{      
      const response = await vehiculoService.registrarVehiculo(vehiculo);

      //Reinicio los estados (reinicio los campos del formulario)
      setVehiculo({
        patente: "",
        marca: "",
        modelo: "",
        tipo: "",
        ano_fab: 0,
        motor: "",
        asientos: 0,
        kilometraje: 0,
    })

      alert("Vehiculo registrado con exito");
    }catch(error) {      
      alert("Error al registrar vehiculo.");
    }
  }

  function onChangeRegistroHandler(event) {
    setVehiculo({      
      ...vehiculo,
      [event.target.id]: event.target.value,
    })
  }


return (
    <div className="container">
      <h1 className="mb-4">Registrar Vehiculo</h1>
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
            value={vehiculo.patente} 
            onChange={onChangeRegistroHandler} 
          />          
        </div>

        <div className="col-md-6 mr-md-3">
          <label 
            htmlFor="marca" 
            className="form-label"
          >
            Marca
          </label>
          <input 
            id="marca" 
            type="text" 
            className="form-control" 
            value={vehiculo.marca} 
            onChange={onChangeRegistroHandler} 
          />
        </div>
    
        <div className="col-md-6">
          <label 
            htmlFor="modelo" 
            className="form-label"
          >
            Modelo
          </label>
          <input 
            id="modelo" 
            type="text" 
            className="form-control" 
            value={vehiculo.modelo} 
            onChange={onChangeRegistroHandler} 
          />
        </div>

        <div className="col-md-6">
            <label htmlFor="tipo" className="form-label">Tipo</label>
                <select id="tipo" className="form-select" value={vehiculo.tipo} onChange={onChangeRegistroHandler}>
                    <option value="">Seleccionar tipo</option>
                    <option value="Sedan">Sedán</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="SUV">SUV</option>
                    <option value="Pickup">Pickup</option>
                    <option value="Furgoneta">Furgoneta</option>
                </select>
        </div>
      
        
        <div className="col-md-6">
          <label 
            htmlFor="ano_fab" 
            className="form-label"
          >
            Año Fabricacion
          </label>
          <input 
            id="ano_fab" 
            type= "number" 
            className="form-control" 
            value={vehiculo.ano_fab} 
            onChange={onChangeRegistroHandler} 
          />
        </div>

        <div className="col-md-6">
            <label htmlFor="motor" className="form-label">Motor</label>
                <select id="motor" className="form-select" value={vehiculo.motor} onChange={onChangeRegistroHandler}>
                    <option value="">Seleccionar motor</option>
                    <option value="DIESEL">Diésel</option>
                    <option value="GASOLINA">Gasolina</option>
                    <option value="ELECTRICO">Eléctrico</option>
                    <option value="HIBRIDO">Híbrido</option>
                </select>
        </div>

        <div className="col-md-6">
          <label 
            htmlFor="asientos" 
            className="form-label"
          >
            Cantidad Asientos
          </label>
          <input 
            id="asientos" 
            type="number" 
            className="form-control" 
            value={vehiculo.asientos} 
            onChange={onChangeRegistroHandler} />
        </div>

        <div className="col-md-6">
          <label 
            htmlFor="kilometraje" 
            className="form-label"
          >
            Kilometraje
          </label>
          <input 
            id="kilometraje" 
            type="number" 
            className="form-control" 
            value={vehiculo.kilometraje} 
            onChange={onChangeRegistroHandler} />
        </div>

        <div className="col-12 mt-4 mb-4" >
          <button 
            type="submit" 
            className="btn btn-primary" 
            onClick={registrarVehiculoHandler}
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  )
}