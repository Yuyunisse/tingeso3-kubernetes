import { useEffect, useState } from "react"
import historialService from "../services/historial.service.js";

export default function RegistrarConvenio() {
  const [convenio, setConvenio] = useState({
    mes: "",
    anio: "",
    marca: "",
    cantidad: 0,
    monto: 0,

  })


  async function registrarConvenioHandler(event) {
    event.preventDefault();
    try{      
      const response = await historialService.registrarConvenio(convenio);

      //Reinicio los estados (reinicio los campos del formulario)
      setConvenio({
        mes: "",
        anio: "",
        marca: "",
        cantidad: 0,
        monto: 0,
    })

      alert("Convenio  registrado con exito");
    }catch(error) {      
      alert("Error al registrar convenio.");
    }
  }

  function onChangeConvenioHandler(event) {
    setConvenio({      
      ...convenio,
      [event.target.id]: event.target.value,
    })
  }


return (
    <div className="container">
      <h1 className="mb-4">Registrar Convenio</h1>
      <form className="border row g-3 px-4">
        <div className="col-12">
        <label htmlFor="mes" className="form-label">Mes</label>
                <select id="mes" className="form-select" value={convenio.mes} onChange={onChangeConvenioHandler}>
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

        <div className="col-md-6 mr-md-3">
          <label 
            htmlFor="anio" 
            className="form-label"
          >
            Año Actual
          </label>
          <input 
            id="anio" 
            type="number" 
            className="form-control" 
            value={convenio.anio} 
            onChange={onChangeConvenioHandler} 
          />
        </div>
    
        <div className="col-md-6">
          <label 
            htmlFor="marca" 
            className="form-label"
          >
            Marca
          </label>
          <select id="marca" className="form-select" value={convenio.marca} onChange={onChangeConvenioHandler}>
            <option value="">Seleccionar Marca</option>
            <option value="Toyota">Toyota</option>
            <option value="FORD">Ford</option>
            <option value=" Hyundai"> Hyundai</option>
            <option value="Honda">Honda</option>
            </select>
        </div> 
         
    
        <div className="col-md-6">
          <label 
            htmlFor="cantidad" 
            className="form-label"
          >
            Cupos
          </label>
          <input 
            id="cantidad" 
            type= "number" 
            className="form-control" 
            value={convenio.cantidad} 
            onChange={onChangeConvenioHandler} 
          />
        </div>

        <div className="col-md-6">
          <label 
            htmlFor="monto" 
            className="form-label"
          >
            Monto del Bono
          </label>
          <input 
            id="monto" 
            type="number" 
            className="form-control" 
            value={convenio.monto} 
            onChange={onChangeConvenioHandler} />
        </div>

        <div className="col-12 mt-4 mb-4" >
          <button 
            type="submit" 
            className="btn btn-primary" 
            onClick={registrarConvenioHandler}
          >
            Registrar Convenio
          </button>
        </div>
      </form>
    </div>
  )
}