package com.sena.crud_basic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sena.crud_basic.model.screening;

public interface Iscreening extends JpaRepository<screening, Integer> {
    /*
     * C
     * R
     * U
     * D
     */

    @Query("SELECT u FROM screening u WHERE u.status != false")
    List<screening> getActive();

    // En tu repositorio
    @Query("SELECT s FROM screening s WHERE s.status = true")
    List<screening> findActiveScreenings();
}
