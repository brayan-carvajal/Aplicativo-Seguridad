package com.sena.crud_basic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "room")
public class room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idRoom")
    private int idRoom;

    @Column(name = "roomNumber", unique = true, nullable = false)
    private int roomNumber;

    @Column(name = "capacity", nullable = false)
    private int capacity;

    @Column(name="status", nullable = false, columnDefinition = "boolean default true ")
    private boolean status;

    // Constructor vacio
    public room() {
    }

    // Constructor
    public room(int idRoom, int roomNumber, int capacity, boolean status) {
            this.idRoom = idRoom;
            this.roomNumber = roomNumber;
            this.capacity = capacity;
            this.status = status;
    }

    // Getters y Setters
    public int getIdRoom() {
        return idRoom;
    }

    public void setIdRoom(int idRoom) {
        this.idRoom = idRoom;
    }

    public int getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(int roomNumber) {
        this.roomNumber = roomNumber;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    
}
