package com.example.historial_service.services;

import com.example.historial_service.Dtos.Hcuatro;
import com.example.historial_service.config.RestTemplateConfig;
import com.example.historial_service.entity.DetalleEntity;
import com.example.historial_service.entity.HistorialEntity;
import com.example.historial_service.model.vehiculo;
import com.example.historial_service.repository.DetalleRepository;
import com.example.historial_service.repository.HistorialRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.function.DoubleConsumer;


@Service
public class HistorialService {

    @Autowired
    HistorialRepository historialRepository;

    @Autowired
    DetalleRepository detalleRepository;

    @Autowired
    DetalleService detalleService;

    @Autowired
    Recargos recargos;

    @Autowired
    Descuentos descuentos;

    //@Autowired
    //TopCarService topCarService;

    @Autowired
    RestTemplate restTemplate;

    //crear-guardar historial
    public HistorialEntity guardar(String patente){
        HistorialEntity nuevoHistorial = new HistorialEntity();
        nuevoHistorial.setPatente(patente);
        historialRepository.save(nuevoHistorial);
        return nuevoHistorial;
    }


    //Listar los historiales de una patente
    public List<HistorialEntity> listarPatente(String patente){
        List<HistorialEntity> listaHistorial = historialRepository.findAllByPatente(patente);
        return listaHistorial;
    }



    public HistorialEntity encontrarPyF(String patente, LocalDate ingreso){
        HistorialEntity lista = historialRepository.findByPatenteAndFechaI(patente, ingreso);
        return lista;
    }

    //Listar todos los historiales
    public List<HistorialEntity> listarTodo(){
        List<HistorialEntity> todo = historialRepository.findAll();
        return todo;
    }



    //Costo total con los descuentos y recargos
 /*   public Double costoFinal(String patente, LocalDate ingreso){

        //calculo descuento de bonos
        Integer bono = topCarService.descuentoBono(patente,ingreso);

        Double recargo = recargos.recargoAntiguedad(patente, ingreso)+
                recargos.recargoDespacho(patente, ingreso) +
                recargos.recargoDespacho(patente, ingreso);


        Double descuento = descuentos.descuentoDia(patente, ingreso) +
                descuentos.descuentoCantReparaciones(patente, ingreso) + bono;

        HistorialEntity historialActual = historialRepository.findByPatenteAndFechaI(patente, ingreso);
        historialActual.setDescuentos(descuento);
        historialActual.setRecargos(recargo);

        Double totalRep = detalleService.montoTotal(patente, ingreso);
        historialActual.setTotalR(totalRep);

        Double iva = totalRep * 0.19;
        historialActual.setIva(iva);

        Double costo = (totalRep + recargo - descuento) + iva ;
        historialActual.setTotal(costo);

        return costo;

    }*/

    //actualicacion de historial

    //actualizar montos (totalR,recargos,descuentos,iva,total)
    @Transactional
    public HistorialEntity actualizarMontos(String patente, LocalDate ingreso){
        HistorialEntity historial = historialRepository.findByPatenteAndFechaI(patente, ingreso);

        Double act_totalR = detalleService.montoTotal(patente,ingreso);
        Double act_recargos = recargos.recargoAntiguedad(patente, ingreso) +
                recargos.recargoDespacho(patente, ingreso) +
                recargos.recargoKilometraje(patente, ingreso);
        Double act_descuento = descuentos.descuentoDia(patente,ingreso) +
                descuentos.descuentoCantReparaciones(patente, ingreso) ;
        Double act_iva = act_totalR * 0.19;
        Double act_total = (act_totalR + act_recargos - act_descuento) + act_iva;

        historial.setIva(act_iva);
        historial.setTotal(act_total);
        historial.setRecargos(act_recargos);
        historial.setDescuentos(act_descuento);
        historial.setTotalR(act_totalR);

        historialRepository.save(historial);

        return  historial;
    }



    //actualizar fecha de despacho
    @Transactional
    public HistorialEntity actualizarDespacho(String patente, LocalDate ingreso) {
        HistorialEntity historial = historialRepository.findByPatenteAndFechaI(patente, ingreso);
        historial.setFechaD(LocalDate.now());
        historial.setHoraD(LocalTime.now());

        historialRepository.save(historial);
        return historial;

    }

    @Transactional
    public HistorialEntity actualizarSalida(String patente, LocalDate ingreso, LocalDate fecha, LocalTime hora) {
        HistorialEntity historial = historialRepository.findByPatenteAndFechaI(patente, ingreso);
        historial.setFechaS(fecha);
        historial.setHoraS(hora);
        historialRepository.save(historial);
        return historial;
    }



    //HU4 Listado de la informacion del vehiculo x historial
    public List<Hcuatro> historiaCuatro(){
        List<HistorialEntity> historiales = listarTodo();
        List<Hcuatro> informacion = new ArrayList<>();
        for (HistorialEntity elemento : historiales) {
            if (elemento.getDescuentos() == null){
                continue;
            }
            vehiculo actual = restTemplate.getForObject("http://vehiculo-service/vehiculo/" + elemento.getPatente(), vehiculo.class);
            Hcuatro estructura = new Hcuatro();
            estructura.setPatente(elemento.getPatente());
            estructura.setMarca(actual.getMarca());
            estructura.setModelo(actual.getModelo());
            estructura.setTipo(actual.getTipo());
            estructura.setAno(actual.getAno_fab());
            estructura.setMotor(actual.getMotor());
            estructura.setFecha_ingreso(elemento.getFechaI());
            estructura.setHora_ingreso(elemento.getHoraI());
            estructura.setTotal(elemento.getTotalR());
            estructura.setDescuentos(elemento.getDescuentos());
            estructura.setRecargos(elemento.getRecargos());
            estructura.setSubtotal(elemento.getTotalR() + elemento.getRecargos() - elemento.getDescuentos() );
            estructura.setIva(elemento.getIva());
            estructura.setCostoTotal(elemento.getTotal());
            estructura.setFecha_salida(elemento.getFechaS());
            estructura.setHora_salida(elemento.getHoraS());
            estructura.setFecha_despacho(elemento.getFechaD());
            estructura.setHora_despacho(elemento.getHoraD());
            informacion.add(estructura);
        }
        return informacion;
    }



    //Relacionados con la boleta final












}
