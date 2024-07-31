package com.example.reportes_service.service;

import com.example.reportes_service.Dtos.Rdos;
import com.example.reportes_service.Dtos.Runo;
import com.example.reportes_service.model.Hcuatro;
import com.example.reportes_service.model.detalle;
import com.example.reportes_service.model.reparaciones;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Locale;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.Month;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;

@Service
public class RdosService {

    @Autowired
    RestTemplate restTemplate;

    public List<Rdos> listaReparaciones(){
        //List<reparaciones> listaRep = restTemplate.getForObject("http://reparaciones-service/reparaciones/listar"  , List.class);
        ResponseEntity<List<reparaciones>> response = restTemplate.exchange(
                "http://reparaciones-service/reparaciones/listar",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<reparaciones>>() {}
        );

        List<reparaciones> listaRep = response.getBody();

        List<Rdos> reporteBase = new ArrayList<>();
        for (reparaciones rep : listaRep){
            Rdos estructura = new Rdos();
            String nombre = rep.getNombre();
            estructura.setNombreReparacion(nombre);

            estructura.setCantidad1(0.0);
            estructura.setMonto1(0.0);
            estructura.setVariacionCantidad1("");
            estructura.setVariacionMonto1("");

            estructura.setCantidad2(0.0);
            estructura.setMonto2(0.0);
            estructura.setVariacionCantidad2("");
            estructura.setVariacionMonto2("");

            estructura.setCantidad3(0.0);
            estructura.setMonto3(0.0);

            reporteBase.add(estructura);
        }
        return reporteBase;
    }

    public List<Hcuatro> listaHistorial(Integer mes, Integer ano){
        ResponseEntity<List<Hcuatro>> response = restTemplate.exchange(
                "http://historial-service/historial/vehiculoxhistorial",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Hcuatro>>() {}
        );

        List<Hcuatro> listaHist = response.getBody();

        List<Hcuatro> listaReducida = new ArrayList<>();
        LocalDate fecha1 = LocalDate.of(ano,mes,1);
        LocalDate fecha2 = fecha1.minusMonths(1);
        LocalDate fecha3 = fecha1.minusMonths(2);
        for (Hcuatro elemento : listaHist) {
            //Integer mesHistorial = elemento.getFecha_ingreso().getMonthValue();
            //Integer anoHistorial = elemento.getFecha_ingreso().getYear();
            LocalDate fecha = elemento.getFecha_ingreso();

            if ( (fecha.getMonthValue() == mes && fecha.getYear() == ano) ||
                    (fecha.getMonthValue() == fecha2.getMonthValue() && fecha.getYear() == fecha2.getYear()) ||
                    (fecha.getMonthValue() == fecha3.getMonthValue() && fecha.getYear() == fecha3.getYear()) ) {
                listaReducida.add(elemento);
            }
        }
        return listaReducida;
    }

    //calculo variacion
    public String variacionRelativa(Double valorI, Double valorF){
        if (valorI == 0){
            return "0%";
        }
        Double absoluta = valorF - valorI;
        Double relativa = (absoluta/valorI) * 100;
        String variacion = relativa + "%";
        return variacion;
    }

    //Usada para llenar los campos de cantidad y monto
    public List<Rdos> reportedosCantidad(Integer mes, Integer ano){
        List<Rdos> reporteDos = listaReparaciones();
        List<Hcuatro> historiales = listaHistorial(mes, ano);
        LocalDate actual = LocalDate.of(ano,mes,1);
        LocalDate fecha2 = LocalDate.of(ano,mes,1).minusMonths(1);
        LocalDate fecha3 = LocalDate.of(ano,mes,1).minusMonths(2);

        for(Hcuatro historial : historiales){
            String patente = historial.getPatente();
            LocalDate ingreso = historial.getFecha_ingreso();
           // List<detalle> detalles = restTemplate.getForObject("http://historial-service/historial/detalle/listar/" +patente+"/"+ingreso, List.class);
            ResponseEntity<List<detalle>> response = restTemplate.exchange(
                    "http://historial-service/historial/detalle/listar/" +patente+"/"+ingreso,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<detalle>>() {}
            );

            Locale locale = new Locale("es", "ES");
            List<detalle> detalles = response.getBody();
            for(detalle det : detalles){
                String reparacionDetalle = det.getReparacion();
                for(Rdos reporte : reporteDos){
                    reporte.setMes1(Month.from(actual).getDisplayName(TextStyle.FULL, locale).toUpperCase());
                    reporte.setMes2(Month.from(fecha2).getDisplayName(TextStyle.FULL, locale).toUpperCase());
                    reporte.setMes3(Month.from(fecha3).getDisplayName(TextStyle.FULL, locale).toUpperCase());
                    if (reporte.getNombreReparacion().equals(reparacionDetalle)){
                        if ((det.getFechaI().getMonthValue() == mes )
                                && (det.getFechaI().getYear() == ano)) {

                            reporte.setCantidad1(reporte.getCantidad1() + 1);
                            reporte.setMonto1(reporte.getMonto1() + det.getMonto());
                        }
                        else if ((det.getFechaI().getMonthValue() == fecha2.getMonthValue() )
                                && (det.getFechaI().getYear() == fecha2.getYear())) {

                            reporte.setCantidad2(reporte.getCantidad2() + 1);
                            reporte.setMonto2(reporte.getMonto2() + det.getMonto());
                        }
                        else if ((det.getFechaI().getMonthValue() == fecha3.getMonthValue() )
                                && (det.getFechaI().getYear() == fecha3.getYear())) {

                            reporte.setCantidad3(reporte.getCantidad3() + 1);
                            reporte.setMonto3(reporte.getMonto3() + det.getMonto());
                        }

                    }
                }
            }
        }
        return reporteDos;
    }

    //usado para llenar los campos de variacion desde un reporte con los montos y cantidades seteados
    public List<Rdos> reporteDos(List<Rdos> reporteCant){

        Double vInicial = 0.0;
        Double vFinal = 0.0;
        String variacionFinal = "";
        for( Rdos reporte : reporteCant){

            //entre mes3(i) y mes2(f)
            //***** cantidad
            vInicial = reporte.getCantidad3();
            vFinal = reporte.getCantidad2();
            variacionFinal = variacionRelativa(vInicial,vFinal);
            reporte.setVariacionCantidad2(variacionFinal);

            //***** monto
            vInicial = reporte.getMonto3();
            vFinal =reporte.getMonto2();
            variacionFinal = variacionRelativa(vInicial,vFinal);
            reporte.setVariacionMonto2(variacionFinal);


            //entre mes2(i) y mes1(f)
            //***** cantidad
            vInicial = reporte.getCantidad2();
            vFinal = reporte.getCantidad1();
            variacionFinal = variacionRelativa(vInicial,vFinal);
            reporte.setVariacionCantidad1(variacionFinal);

            //***** monto
            vInicial = reporte.getMonto2();
            vFinal =reporte.getMonto1();
            variacionFinal = variacionRelativa(vInicial,vFinal);
            reporte.setVariacionMonto1(variacionFinal);

        }
        return reporteCant;
    }



}
