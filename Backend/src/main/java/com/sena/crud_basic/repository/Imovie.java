package com.sena.crud_basic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sena.crud_basic.model.movie;

public interface Imovie extends JpaRepository<movie, Integer> {
    /*
     * C
     * R
     * U
     * D
     */

    @Query("SELECT u FROM movie u WHERE u.status != false")
    List<movie> getActive();

    @Query("SELECT u FROM movie u WHERE u.status != false AND (u.title LIKE %?1% OR u.gender LIKE %?1%)")
    List<movie> searchByTitleOrGender(String filter);

    /*
     @Query("SELECT u FROM movie u WHERE u.title LIKE %?1%")
     List<movie> getForTitle(String filter);
     
     @Query("SELECT u FROM movie u WHERE u.gender LIKE %?1%")
     List<movie> getForGender(String filter);
    */

}
