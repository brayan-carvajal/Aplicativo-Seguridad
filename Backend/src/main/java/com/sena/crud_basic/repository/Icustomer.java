package com.sena.crud_basic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sena.crud_basic.model.customer;

public interface Icustomer extends JpaRepository<customer, Integer> {

    /*
     * C
     * R
     * U
     * D
     */

    @Query("SELECT u FROM customer u WHERE u.status != false")
    List<customer> getActive();

    @Query("SELECT u FROM customer u WHERE u.status != false AND (u.name LIKE %?1% OR u.email LIKE %?1%)")
    List<customer> searchByNameOrEmail(String filter);

    /*
     * @Query("SELECT u FROM customer u WHERE u.name LIKE %?1%")
     * List<customer> getForName(String filter);
     * 
     * @Query("SELECT u FROM customer u WHERE u.email LIKE %?1%")
     * List<customer> getForEmail(String filter);
     */

}
