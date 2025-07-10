package com.sena.crud_basic.dto;

import java.time.LocalDate;

import com.sena.crud_basic.model.movie;
import com.sena.crud_basic.model.room;

public class screeningDTO {

    private int idScreening;
    private movie idMovie; // Objeto completo en lugar del ID
    private room idRoom; // Objeto completo en lugar del ID
    private LocalDate dateTime; // Fecha y hora de la función

    // Constructor vacío
    public screeningDTO() {
    }

    // Constructor con parámetros
    public screeningDTO(int idScreening, movie idMovie, room idRoom, LocalDate dateTime) {
        this.idScreening = idScreening;
        this.idMovie = idMovie;
        this.idRoom = idRoom;
        this.dateTime = dateTime;
    }

    // Getters y Setters
    public int getIdScreening() {
        return idScreening;
    }

    public void setIdScreening(int idScreening) {
        this.idScreening = idScreening;
    }
    
    public movie getMovie() {
        return idMovie;
    }

    public void setMovie(movie idMovie) {
        this.idMovie = idMovie;
    }

    public room getRoom() {
        return idRoom;
    }

    public void setRoom(room idRoom) {
        this.idRoom = idRoom;
    }

    public LocalDate getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDate dateTime) {
        this.dateTime = dateTime;
    }

}
