import httpClient from "../http-common";

function reporteUno(mes,ano) {
  return httpClient.get(`/reporte1/${mes}/${ano}`);  
}

function reporteDos(mes,ano) {
    return httpClient.get(`/reporte2/${mes}/${ano}`);
}




export default {reporteUno , reporteDos}