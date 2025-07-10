package com.sena.crud_basic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sena.crud_basic.model.food;

public interface Ifood extends JpaRepository<food, Integer> {
    /*
     * C
     * R
     * U
     * D
     */

    @Query("SELECT u FROM food u WHERE u.status != false")
    List<food> getActive();

    @Query("SELECT f FROM food f WHERE f.status != false AND (LOWER(f.name) LIKE LOWER(CONCAT('%', ?1, '%')) OR STR(f.price) LIKE %?1%)")
    List<food> searchByNameOrPrice(String filter);
    
    /*
     * @Query("SELECT u FROM food u WHERE u.status != false AND")
     * List<food> getForName(String filter);
     * 
     * @Query("SELECT u FROM food u WHERE u.price = ?1")
     * List<food> getForPrice(Double filter);
     */

}
