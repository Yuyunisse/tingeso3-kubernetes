package com.example.historial_service.services;


import com.example.historial_service.entity.DetalleEntity;
import com.example.historial_service.model.vehiculo;
import com.example.historial_service.repository.DetalleRepository;
import com.example.historial_service.repository.HistorialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;

@Service
public class DetalleService {

    @Autowired
    DetalleRepository detalleRepository;

    @Autowired
    RestTemplate restTemplate;

    //Crear una reparacion
    //Como el historial se tiene que crear con la reparacion hice un service aparte para eso;

    //listar todas las reparaciones de una patente
    public List<DetalleEntity> listarPatente(String patente){
        List<DetalleEntity> listaPatente = detalleRepository.findAllByPatente(patente);
        return listaPatente;
    }

    //Listar reparaciones de un historial
    public List<DetalleEntity> listarPatenteFecha(String patente, LocalDate fechaI){
        List<DetalleEntity> listaPyF = detalleRepository.findAllByPatenteAndFechaI(patente,fechaI);
        return listaPyF;
    }

    public List<DetalleEntity> listartodo(){
        List<DetalleEntity> listar = detalleRepository.findAll();
        return listar;
    }



    //Monto total de las reparaciones
    public Double montoTotal(String patente, LocalDate ingreso){
        List<DetalleEntity> totalReparaciones = detalleRepository.findAllByPatenteAndFechaI(patente,ingreso);
        Double total = 0.0;
        for (DetalleEntity elemento : totalReparaciones) {
            total = total + elemento.getMonto();
        }
        return total;
    }

}
