import httpClient from "../http-common";


function registrarDetalle(detalle) {
  return httpClient.post(`/detalle/registrar`,detalle);
}

function listarTodos(listar) {
    return httpClient.get(`/detalle/todo`)
}

function listarDetallePatente(patente, fecha) {
    return httpClient.get(`/detalle/lista/${patente}/${fecha}`);
}

function historiaCuatro() {
  return httpClient.get(`/vehiculoxhistorial`);
}

function registrarConvenio(convenio){
  return httpClient.post(`/convenio/registrar`,convenio);
}

function listarConvenio(mes, anio){
  return httpClient.get(`/convenio/${mes}/${anio}`);
}

function registrarHitorial(patente){
  return httpClient.post(`/registrar`,patente);
}

const mostrarBoleta = async (patente, fechaI) => {
  try {
    const response = await httpClient.get(`boleta/ver/${patente}/${fechaI}`);
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud HTTP:', error);
    throw error;
  }
};


function actualizarMontos(patente,ingreso){
  return httpClient.put(`/boleta/actualizarMonto`, null, {
    params: {
      patente: patente,
      ingreso: ingreso
    }
  });
}

function aplicarConvenio(patente,ingreso){
  return httpClient.put(`/convenio/aplicar`, null, {
    params: {
      patente: patente,
      ingreso: ingreso
    }
  });
}

function actualizarDes(patente, ingreso) {
  return httpClient.put(`/boleta/actualizarDespacho`, null, {
    params: {
      patente: patente,
      ingreso: ingreso
    }
  });
}

function actualizarSalida(patente, ingreso, fecha, hora) {
  return httpClient.put(`/boleta/actualizarSalida`, {
    patente: patente,
    ingreso: ingreso,
    fecha: fecha,
    hora: hora
  });
}

const actualizarSalidaApi = {
  actualizarSalida
};





export default {registrarDetalle , listarTodos, listarDetallePatente, historiaCuatro, registrarConvenio, registrarHitorial,listarConvenio,actualizarDes,actualizarMontos,actualizarSalida, mostrarBoleta, actualizarSalidaApi, aplicarConvenio}