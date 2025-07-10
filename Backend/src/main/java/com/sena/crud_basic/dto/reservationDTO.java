package com.sena.crud_basic.dto;

import com.sena.crud_basic.model.customer;
import com.sena.crud_basic.model.screening;

public class reservationDTO {

    private int idReservation;
    private customer idCustomer; // Objeto completo en lugar del ID
    private screening idScreening; // Objeto completo en lugar del ID
    private int ticketQuantity;

    // Constructor vacío
    public reservationDTO() {
    }

    // Constructor con parámetros
    public reservationDTO(int idReservation, customer idCustomer, screening idScreening, int ticketQuantity) {
        this.idReservation = idReservation;
        this.idCustomer = idCustomer;
        this.idScreening = idScreening;
        this.ticketQuantity = ticketQuantity;
    }


    
    // Getters y Setters

    public int getIdReservation() {
        return idReservation;
    }

    public void setIdReservation(int idReservation) {
        this.idReservation = idReservation;
    }

    public customer getCustomer() {
        return idCustomer;
    }

    public void setCustomer(customer idCustomer) {
        this.idCustomer = idCustomer;
    }

    public screening getScreening() {
        return idScreening;
    }

    public void setScreening(screening idScreening) {
        this.idScreening = idScreening;
    }

    public int getTicketQuantity() {
        return ticketQuantity;
    }

    public void setTicketQuantity(int ticketQuantity) {
        this.ticketQuantity = ticketQuantity;
    }

}