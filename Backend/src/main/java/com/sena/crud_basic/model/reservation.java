package com.sena.crud_basic.model;

import jakarta.persistence.*;

@Entity(name = "reservation")
public class reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idReservation")
    private int idReservation;

    @ManyToOne
    @JoinColumn(name = "idCustomer", nullable = false)
    private customer idCustomer;

    @ManyToOne
    @JoinColumn(name = "idScreening", nullable = false)
    private screening idScreening;

    @Column(name = "ticketQuantity", nullable = false)
    private int ticketQuantity;

    @Column(name="status", nullable = false, columnDefinition = "boolean default true ")
    private boolean status;

    // Constructor vacío
    public reservation() {
    }

    // Constructor
    public reservation(int idReservation, customer idCustomer, screening idScreening, int ticketQuantity, boolean status) {
            this.idReservation = idReservation;
            this.idCustomer = idCustomer;
            this.idScreening = idScreening;
            this.ticketQuantity = ticketQuantity;
            this.status = status;
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

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    
}
