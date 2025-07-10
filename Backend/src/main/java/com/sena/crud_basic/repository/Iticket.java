package com.sena.crud_basic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sena.crud_basic.model.ticket;

public interface Iticket extends JpaRepository<ticket, Integer> {
    /*
     * C
     * R
     * U
     * D
     */

    @Query("SELECT u FROM ticket u WHERE u.status != false")
    List<ticket> getActive();

    // En tu repositorio
    @Query("SELECT t FROM ticket t WHERE t.status = true")
    List<ticket> findActiveTickets();

}
