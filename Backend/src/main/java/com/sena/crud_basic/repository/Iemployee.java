package com.sena.crud_basic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sena.crud_basic.model.employee;

public interface Iemployee extends JpaRepository<employee, Integer> {
    /*
     * C
     * R
     * U
     * D
     */

    @Query("SELECT u FROM employee u WHERE u.status != false")
    List<employee> getActive();

    @Query("SELECT u FROM employee u WHERE u.status != false AND (u.name LIKE %?1% OR u.position LIKE %?1%)")
    List<employee> searchByNameOrPosition(String filter);

}
