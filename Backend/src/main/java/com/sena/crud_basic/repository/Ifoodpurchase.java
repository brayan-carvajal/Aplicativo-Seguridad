package com.sena.crud_basic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sena.crud_basic.model.foodpurchase;

public interface Ifoodpurchase extends JpaRepository<foodpurchase, Integer> {
    /*
     * C
     * R
     * U
     * D
     */

    @Query("SELECT u FROM foodpurchase u WHERE u.status != false")
    List<foodpurchase> getActive();

    // En tu repositorio
    @Query("SELECT fp FROM foodpurchase fp WHERE fp.status = true")
    List<foodpurchase> findActiveFoodPurchases();
}
