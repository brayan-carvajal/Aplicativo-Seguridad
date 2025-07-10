package com.sena.crud_basic.dto;

import com.sena.crud_basic.model.customer;
import com.sena.crud_basic.model.screening;

public class ticketDTO {
    
    private int idTicket;
    private customer idCustomer; // Objeto completo en lugar del ID
    private screening idScreening; // Objeto completo en lugar del ID
    private double price; // Precio del boleto

    // Constructor vacío
    public ticketDTO() {
    }

    // Constructor con parámetros
    public ticketDTO(int idTicket, customer idCustomer, screening idScreening, double price) {
        this.idTicket = idTicket;
        this.idCustomer = idCustomer;
        this.idScreening = idScreening;
        this.price = price;
    }

    // Getters y Setters

    public int getIdTicket() {
        return idTicket;
    }

    public void setIdTicket(int idTicket) {
        this.idTicket = idTicket;
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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
