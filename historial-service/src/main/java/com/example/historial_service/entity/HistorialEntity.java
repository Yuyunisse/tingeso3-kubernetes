package com.example.historial_service.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.nio.DoubleBuffer;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@Table(name="historial")
@NoArgsConstructor
@AllArgsConstructor
public class HistorialEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String patente;
    private LocalDate fechaI;
    private LocalTime horaI;
    private Double totalR;
    private Double recargos;
    private Double descuentos;
    private Double iva;
    private Double total;
    private LocalDate fechaS;
    private LocalTime horaS;
    private LocalDate fechaD;
    private LocalTime horaD;


}
