package com.sena.crud_basic.dto;

public class roomDTO {

    private int idRoom;
    private int roomNumber;
    private int capacity;

    public roomDTO() {
    }

    public roomDTO(int idRoom, int roomNumber, int capacity) {
        this.idRoom = idRoom;
        this.roomNumber = roomNumber;
        this.capacity = capacity;
    }


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

}
