package com.sena.crud_basic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sena.crud_basic.model.room;

public interface Iroom extends JpaRepository<room, Integer> {
    /*
     * C
     * R
     * U
     * D
     */

    @Query("SELECT u FROM room u WHERE u.status != false")
    List<room> getActive();

    @Query("SELECT f FROM room f WHERE f.status != false AND (CAST(f.roomNumber AS string) LIKE %?1% OR CAST(f.capacity AS string) LIKE %?1%)")
    List<room> searchByRoomNumberOrCapacity(String filter);

}
