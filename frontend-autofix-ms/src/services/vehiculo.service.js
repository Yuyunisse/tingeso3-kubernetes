import httpClient from "../http-common";

function registrarVehiculo(vehiculo) {
  return httpClient.post(`/registro`,vehiculo);  
}

function todosLosVehiculos() {
  return httpClient.get(`/todo`)
}

function datosVehiculo(patente) {  
  return httpClient.get(`/${patente}`)
}


export default {registrarVehiculo, todosLosVehiculos , datosVehiculo}