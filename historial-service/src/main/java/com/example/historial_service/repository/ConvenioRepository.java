package com.example.historial_service.repository;


import com.example.historial_service.entity.Convenio;
import org.springframework.cglib.core.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ConvenioRepository extends JpaRepository<Convenio, Integer> {

    List<Convenio> findAllByAnioAndMes(Integer anio, Integer mes);
}
