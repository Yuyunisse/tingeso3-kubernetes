package com.example.historial_service.services;


import com.example.historial_service.entity.BonoEntity;
import com.example.historial_service.entity.Convenio;
import com.example.historial_service.entity.HistorialEntity;
import com.example.historial_service.model.vehiculo;
import com.example.historial_service.repository.BonoRepository;
import com.example.historial_service.repository.ConvenioRepository;
import com.example.historial_service.repository.HistorialRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class TopCarService {

    @Autowired
    ConvenioRepository convenioRepository;

    @Autowired
    BonoRepository bonoRepository;

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    HistorialRepository historialRepository;

    @Autowired
    HistorialService historialService;

    public Convenio agregar(Convenio nuevoRegistro){
        convenioRepository.save(nuevoRegistro);
        return nuevoRegistro;
    }

    //revisar si hay cupo de bono
    //si hay hace el descuento de la cantidad si no no hace nada
    //y retorna el monto correspondiente
    public Integer existeCupo(String marca, LocalDate fecha){
        List<Convenio> cupos = convenioRepository.findAllByAnioAndMes(fecha.getYear(),fecha.getMonthValue());
        Integer monto = 0;
        if (!(cupos.isEmpty())){
            for(Convenio cupo : cupos){
                if (cupo.getMarca().equalsIgnoreCase(marca)) {
                    if (cupo.getCantidad() > 0){
                        Integer cantidad  = cupo.getCantidad() - 1;
                        cupo.setCantidad(cantidad);
                        convenioRepository.save(cupo);
                        monto = cupo.getMonto();
                    }

                    else{
                        monto = 0;
                    }
                }
            }
        }
        return monto;
    }

    //Descuento por Bonos
    @Transactional
    public HistorialEntity descuentoBono(String patente, LocalDate ingreso) {
        Integer descuento = null;
        System.out.println(patente);
        System.out.println(ingreso);
        List<BonoEntity> listaPatente = bonoRepository.findAllByPatente(patente);
        System.out.println("listabonos: " + listaPatente);
        System.out.println(listaPatente.size());
        vehiculo auto = restTemplate.getForObject("http://vehiculo-service/vehiculo/" + patente, vehiculo.class);
        String marca = auto.getMarca();
        System.out.println("automarca: " + marca);
        BonoEntity bonoAux = new BonoEntity();
        HistorialEntity historial = historialRepository.findByPatenteAndFechaI(patente, ingreso);

        if (!listaPatente.isEmpty()) {
            System.out.println("entro if: ");
            Integer i = 0;
            while (i < listaPatente.size()) {
                System.out.println("entro while");
                BonoEntity bono = listaPatente.get(i);
                if ((bono.getFecha().getMonthValue() == ingreso.getMonthValue()) &&
                        (bono.getFecha().getYear() == ingreso.getYear())) {
                    i = i + 1;

                }
                if ((bono.getFecha().getMonthValue() != ingreso.getMonthValue()) &&
                        (bono.getFecha().getYear() != ingreso.getYear())) {
                    System.out.println("entro else");
                    descuento = existeCupo(marca, ingreso);
                    System.out.println("descuento:" + descuento);
                    bonoAux.setFecha(ingreso);
                    bonoAux.setPatente(patente);
                    bonoRepository.save(bonoAux);
                    historial.setDescuentos(historial.getDescuentos() + descuento);
                    i = listaPatente.size() + 1;
                }
            }
        } else {
            System.out.println("entro al ==null");
            descuento = existeCupo(marca, ingreso);
            System.out.println("descuento else if:" + descuento);
            bonoAux.setFecha(ingreso);
            bonoAux.setPatente(patente);
            bonoRepository.save(bonoAux);
            historial.setDescuentos(historial.getDescuentos() + descuento);
        }

        historialRepository.save(historial);
        System.out.println("salio");
        return historial;

    }

    public List<Convenio> listaConvenio(String mes, Integer anio){
        List<String> meses = new ArrayList<>();
        meses.add("ENERO");
        meses.add("FEBRERO");
        meses.add("MARZO");
        meses.add("ABRIL");
        meses.add("MAYO");
        meses.add("JUNIO");
        meses.add("JULIO");
        meses.add("AGOSTO");
        meses.add("SEPTIEMBRE");
        meses.add("OCTUBRE");
        meses.add("NOVIEMBRE");
        meses.add("DICIEMBRE");

        Integer numMes = 0;
        for (int i = 0; i< meses.size(); i++){
            if (mes.equals(meses.get(i))){
                numMes = i + 1;
            }
        }

        List<Convenio> lista = convenioRepository.findAllByAnioAndMes(anio,numMes);
        return lista;
    }


    public List<Convenio> listarTodo(){
        List<Convenio> lista = convenioRepository.findAll();
        return lista;
    }



}

