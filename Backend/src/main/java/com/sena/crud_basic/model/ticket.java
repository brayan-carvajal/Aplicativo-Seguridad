package com.sena.crud_basic.model;
import jakarta.persistence.*;

@Entity(name = "ticket")
public class ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idTicket")
    private int idTicket;

    @ManyToOne
    @JoinColumn(name = "idCustomer", nullable = false)
    private customer idCustomer;

    @ManyToOne
    @JoinColumn(name = "idScreening", nullable = false)
    private screening idScreening;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name="status", nullable = false, columnDefinition = "boolean default true ")
    private boolean status;

    // Constructor vacío
    public ticket() {
    }

    // Constructor con parámetros
    public ticket(int idTicket, customer idCustomer, screening idScreening, double price, boolean status) {
            this.idTicket = idTicket;
            this.idCustomer = idCustomer;
            this.idScreening = idScreening;
            this.price = price;
            this.status = status;
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

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

}
