package com.example.reportes_service.service;

import com.example.reportes_service.Dtos.Runo;
import com.example.reportes_service.model.Hcuatro;
import com.example.reportes_service.model.detalle;
import com.example.reportes_service.model.historial;
import com.example.reportes_service.model.reparaciones;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class RunoService {
    @Autowired
    RestTemplate restTemplate;

    public List<Runo> listaReparaciones(){
        //List<reparaciones> listaRep = restTemplate.getForObject("http://reparaciones-service/reparaciones/listar"  , List.class);
        ResponseEntity<List<reparaciones>> response = restTemplate.exchange(
                "http://reparaciones-service/reparaciones/listar",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<reparaciones>>() {}
        );

        List<reparaciones> listaRep = response.getBody();

        List<Runo> reporteBase = new ArrayList<>();
        for (reparaciones rep : listaRep){
            Runo estructura = new Runo();
            String nombre = rep.getNombre();
            estructura.setNombreR(nombre);

            estructura.setHatchCantidad(0);
            estructura.setHatchTotal(0.0);

            estructura.setSedanCantidad(0);
            estructura.setSedanTotal(0.0);

            estructura.setFurgonetaCantidad(0);
            estructura.setFurgonetaTotal(0.0);

            estructura.setPickupCantidad(0);
            estructura.setPickupTotal(0.0);

            estructura.setSuvCantidad(0);
            estructura.setSuvTotal(0.0);

            reporteBase.add(estructura);

        }

        return reporteBase;
    }

    public List<Hcuatro> listaHistorial(Integer mes, Integer ano){
        //List<Hcuatro> listaHist = restTemplate.getForObject("http://historial-service/historial/vehiculoxhistorial"  , List.class);
        ResponseEntity<List<Hcuatro>> response = restTemplate.exchange(
                "http://historial-service/historial/vehiculoxhistorial",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Hcuatro>>() {}
        );

        List<Hcuatro> listaHist = response.getBody();


        List<Hcuatro> listaReducida = new ArrayList<>();
        for (Hcuatro elemento : listaHist) {
            LocalDate fechaIngreso = elemento.getFecha_ingreso();
            //Integer mesHistorial = fechaIngreso.getMonthValue();
            //Integer anoHistorial = fechaIngreso.getYear();
            if (fechaIngreso.getMonthValue() == mes && fechaIngreso.getYear() == ano) {
                listaReducida.add(elemento);
            }
        }
        return listaReducida;

    }

    public List<Runo> reporteuno (Integer mes, Integer ano){
        List<Runo> reporteUno = listaReparaciones();
        List<Hcuatro> historial = listaHistorial(mes,ano);

        for (Hcuatro elemento : historial){
            if (elemento.getDescuentos() == null){
                continue;
            }
            String patente = elemento.getPatente();
            LocalDate ingreso = elemento.getFecha_ingreso();
           // List<detalle> detalles = restTemplate.getForObject("http://historial-service/historial/detalle/listar/" +patente+"/"+ingreso, List.class);
            ResponseEntity<List<detalle>> response = restTemplate.exchange(
                    "http://historial-service/historial/detalle/listar/" +patente+"/"+ingreso,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<detalle>>() {}
            );

            List<detalle> detalles = response.getBody();

            System.out.println("lista de detalles" + detalles);
            for (detalle det : detalles){

                String reparacionDetalle = det.getReparacion(); //nombre de la reparacion del vehiculo

                for (Runo elementoR : reporteUno){

                    String nombre = elementoR.getNombreR();

                    if (reparacionDetalle.equals(nombre)){
                        if (elemento.getTipo().equalsIgnoreCase("SEDAN")){
                            elementoR.setSedanCantidad(elementoR.getSedanCantidad() + 1);
                            elementoR.setSedanTotal(elementoR.getSedanTotal()+ det.getMonto());
                        }
                        else if (elemento.getTipo().equalsIgnoreCase("HATCHBACK")){
                            elementoR.setHatchCantidad(elementoR.getHatchCantidad() + 1);
                            elementoR.setHatchTotal(elementoR.getHatchTotal()+ det.getMonto());
                        }
                        else if (elemento.getTipo().equalsIgnoreCase("PICKUP")) {
                            System.out.println("elseif del pickup");
                            elementoR.setPickupCantidad(elementoR.getPickupCantidad() + 1);
                            elementoR.setPickupTotal(elementoR.getPickupTotal() + det.getMonto());
                        }
                        else if (elemento.getTipo().equalsIgnoreCase("SUV")) {
                            elementoR.setSuvCantidad(elementoR.getSuvCantidad() + 1);
                            elementoR.setSuvTotal(elementoR.getSuvTotal() + det.getMonto());
                        }
                        else if (elemento.getTipo().equalsIgnoreCase("FURGONETA")) {
                            elementoR.setFurgonetaCantidad(elementoR.getFurgonetaCantidad() + 1);
                            elementoR.setFurgonetaTotal(elementoR.getFurgonetaTotal() + det.getMonto());
                        }
                    }
                }
            }

        }

        return reporteUno;
    }

}
