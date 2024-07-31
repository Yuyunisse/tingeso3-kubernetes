package com.example.historial_service.controller;


import com.example.historial_service.Dtos.Hcuatro;
import com.example.historial_service.entity.Convenio;
import com.example.historial_service.entity.DetalleEntity;
import com.example.historial_service.entity.HistorialEntity;
import com.example.historial_service.model.vehiculo;
import com.example.historial_service.services.DetHisService;
import com.example.historial_service.services.DetalleService;
import com.example.historial_service.services.HistorialService;
import com.example.historial_service.services.TopCarService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/historial")
public class HistorialController {

    @Autowired
    HistorialService historialService;

    @Autowired
    DetalleService detalleService;

    @Autowired
    TopCarService topCarService;

    @Autowired
    DetHisService detHisService;

    @Autowired
    RestTemplate restTemplate;


//**********************+ controladores para HISTORIAL

    @PostMapping("/registrar")
    public ResponseEntity<String> registrarHistorial(@RequestBody String patente) {
        HistorialEntity nuevo = historialService.guardar(patente);
        return ResponseEntity.ok("Historial Registrado");
    }

    @GetMapping("/vehiculoxhistorial")
    public ResponseEntity<List<Hcuatro>> vehiculoxhistorial() {
        List<Hcuatro> lista = historialService.historiaCuatro();
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<HistorialEntity>> listarHistoriales() {
        List<HistorialEntity> listar = historialService.listarTodo();
        return ResponseEntity.ok(listar);
    }







//**********************+ controladores para DETALLE


    @PostMapping("/detalle/registrar")
    public ResponseEntity<String> registrarDetalle(@RequestBody DetalleEntity detalle) {
        vehiculo actual = restTemplate.getForObject("http://vehiculo-service/vehiculo/" + detalle.getPatente(), vehiculo.class);
        if (actual != null){
            DetalleEntity nuevo = detHisService.guardar(detalle);
            return ResponseEntity.ok("Detalle Reparacion Registrado");
        }

        return ResponseEntity.ok("Debe registrar el vehiculo");

    }

    @GetMapping("/detalle/todo")
    public ResponseEntity<List<DetalleEntity>> listarTodo() {
        List<DetalleEntity> listar = detalleService.listartodo();
        return ResponseEntity.ok(listar);
    }

    @GetMapping("/detalle/listar/{patente}/{fecha}")
    public ResponseEntity<List<DetalleEntity>> listarDetallesPatente(@PathVariable String patente, @PathVariable LocalDate fecha) {
        List<DetalleEntity> listar = detalleService.listarPatenteFecha(patente, fecha);
        return ResponseEntity.ok(listar);
    }


////**********************+ controladores para CONVENIO

    @PostMapping("/convenio/registrar")
    public ResponseEntity<String> registrarConvenio(@RequestBody Convenio convenio){
        Convenio nuevo = topCarService.agregar(convenio);
        return ResponseEntity.ok("Convenio registrado");
    }

    @GetMapping("/convenio/{mes}/{anio}")
    public ResponseEntity<List<Convenio>> verConvenios(@PathVariable String mes, Integer anio){
        List<Convenio> lista = topCarService.listaConvenio(mes, anio);
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/convenio/listar")
    public ResponseEntity<List<Convenio>> verTodosConv(){
        List<Convenio> lista = topCarService.listarTodo();
        return ResponseEntity.ok(lista);
    }

    //aplicar convenio
    @PutMapping("/convenio/aplicar")
    public ResponseEntity<String> aplicarConvenio(
            @RequestParam String patente,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate ingreso){
        try {
            topCarService.descuentoBono(patente, ingreso);
            return ResponseEntity.ok("Bono Aplicado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al aplicar bono");
        }
    }






////**********************+ controladores para BONO



////**********************+ controladores para Boleta

    @GetMapping("/boleta/ver/{patente}/{fecha}")
    public ResponseEntity<HistorialEntity> mostrarBoleta(@PathVariable String patente, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fecha){
        HistorialEntity boleta = historialService.encontrarPyF(patente,fecha);
        return ResponseEntity.ok(boleta);

    }

    @PutMapping("/boleta/actualizarMonto")
    public ResponseEntity<String> actualizarMonto(
            @RequestParam String patente,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate ingreso) {
        try {
            historialService.actualizarMontos(patente, ingreso);
            return ResponseEntity.ok("Montos actualizados");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar los montos");
        }
    }

    @PutMapping("/boleta/actualizarDespacho")
    public ResponseEntity<String> actualizarDespacho(
            @RequestParam String patente,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate ingreso) {
        try {
            HistorialEntity actualizar = historialService.actualizarDespacho(patente, ingreso);
            return ResponseEntity.ok("Despacho actualizado");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar el despacho");
        }


    }

    @PutMapping("/boleta/actualizarSalida")
    public ResponseEntity<String> actualizarSalida(@RequestBody Map<String, Object> requestBody) {
        try {
            String patente = (String) requestBody.get("patente");
            LocalDate ingreso = LocalDate.parse((String) requestBody.get("ingreso"));
            LocalDate fecha = LocalDate.parse((String) requestBody.get("fecha"));
            LocalTime hora = LocalTime.parse((String) requestBody.get("hora"));

            HistorialEntity actualizado = historialService.actualizarSalida(patente, ingreso, fecha, hora);
            return ResponseEntity.ok("Salida actualizada");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar la salida");
        }
    }



}
