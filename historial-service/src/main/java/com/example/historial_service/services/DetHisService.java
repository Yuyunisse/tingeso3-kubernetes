package com.example.historial_service.services;


import com.example.historial_service.entity.DetalleEntity;
import com.example.historial_service.entity.HistorialEntity;
import com.example.historial_service.model.reparaciones;
import com.example.historial_service.model.vehiculo;
import com.example.historial_service.repository.DetalleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class DetHisService {

    @Autowired
    HistorialService historialService;

    @Autowired
    DetalleRepository detalleRepository;

    @Autowired
    RestTemplate restTemplate;

    public DetalleEntity guardar(DetalleEntity detalle){
        String patente = detalle.getPatente();
        LocalDate ingreso = detalle.getFechaI();

        //settear el monto de la reparacion
        Integer monto = 0;
        String actual = detalle.getReparacion();
        vehiculo veh = restTemplate.getForObject("http://vehiculo-service/vehiculo/" + patente, vehiculo.class);
        String motor = veh.getMotor();
        ResponseEntity<List<reparaciones>> response = restTemplate.exchange(
                "http://reparaciones-service/reparaciones/listar",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<reparaciones>>() {}
        );

        List<reparaciones> rep = response.getBody();

        for (reparaciones reparacion : rep){
            String nombre = reparacion.getNombre();
            if (actual.equals(nombre)){
                if (motor.toUpperCase().equals("DIESEL")){
                    monto = reparacion.getDiesel();
                }
                else if (motor.toUpperCase().equals("GASOLINA")){
                    monto = reparacion.getGasolina();
                }
                else if (motor.toUpperCase().equals("HIBRIDO")) {
                    monto = reparacion.getHibrido();
                }
                else if (motor.toUpperCase().equals("ELECTRICO")) {
                    monto = reparacion.getElectrico();
                }
            }
        }

        if(historialService.encontrarPyF(patente,ingreso) == null) {
            HistorialEntity historial = historialService.guardar(patente);
            historial.setFechaI(ingreso);
            historial.setHoraI(LocalTime.now());
        }

        detalle.setMonto(Double.valueOf(monto));
        detalleRepository.save(detalle);
        return detalle;
    }
}
