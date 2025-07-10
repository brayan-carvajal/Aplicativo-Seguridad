package com.sena.crud_basic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sena.crud_basic.model.employeeshift;

public interface Iemployeeshift extends JpaRepository<employeeshift, Integer> {
    /*
     * C
     * R
     * U
     * D
     */

    @Query("SELECT u FROM employeeshift u WHERE u.status != false")
    List<employeeshift> getActive();

    // En tu repositorio
    @Query("SELECT fp FROM employeeshift fp WHERE fp.status = true")
    List<employeeshift> findActiveEmployee();

}
