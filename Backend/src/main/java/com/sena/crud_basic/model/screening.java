package com.sena.crud_basic.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity(name = "screening")
public class screening {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idScreening")
    private int idScreening;

    @ManyToOne
    @JoinColumn(name = "idMovie", nullable = false)
    private movie idMovie;

    @ManyToOne
    @JoinColumn(name = "idRoom", nullable = false)
    private room idRoom;

    @Column(name = "dateTime", nullable = false)
    private LocalDate dateTime;

    @Column(name = "status", nullable = false, columnDefinition = "boolean default true ")
    private boolean status;

    // Constructor vacío
    public screening() {
    }

    // Constructor con parámetros
    public screening(int idScreening, movie idMovie, room idRoom, LocalDate dateTime, boolean status) {
        this.idScreening = idScreening;
        this.idMovie = idMovie;
        this.idRoom = idRoom;
        this.dateTime = dateTime;
        this.status = status;
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

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

}
