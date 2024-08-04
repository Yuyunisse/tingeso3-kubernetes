package com.example.reparaciones_service.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name="reparaciones")
@NoArgsConstructor
@AllArgsConstructor
public class Reparaciones {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nombre;
    private String descripcion;
    private Integer gasolina;
    private Integer diesel;
    private Integer hibrido;
    private Integer electrico;

}
