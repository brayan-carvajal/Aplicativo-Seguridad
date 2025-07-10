package com.sena.crud_basic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sena.crud_basic.model.reservation;

public interface Ireservation extends JpaRepository<reservation, Integer> {
    /*
     * C
     * R
     * U
     * D
     */

    @Query("SELECT u FROM reservation u WHERE u.status != false")
    List<reservation> getActive();

    // En tu repositorio
    @Query("SELECT r FROM reservation r WHERE r.status = true")
    List<reservation> findActiveReservations();
}
