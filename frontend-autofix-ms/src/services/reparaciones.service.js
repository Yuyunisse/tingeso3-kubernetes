import httpClient from "../http-common";


function registrarReparacion(reparacion) {
  return httpClient.post(`/registro`,reparacion);  
}

function listarReparaciones(listar) {
    return httpClient.get(`/listar`);
}




export default {registrarReparacion , listarReparaciones}