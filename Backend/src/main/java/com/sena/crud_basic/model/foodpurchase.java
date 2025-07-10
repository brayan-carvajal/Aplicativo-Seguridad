package com.sena.crud_basic.model;

import jakarta.persistence.*;

@Entity(name = "foodpurchase")
public class foodpurchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idPurchase")
    private int idPurchase;

    @ManyToOne
    @JoinColumn(name = "idCustomer", nullable = false)
    private customer idCustomer;

    @ManyToOne
    @JoinColumn(name = "idFood", nullable = false)
    private food idFood;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @Column(name="status", nullable = false, columnDefinition = "boolean default true ")
    private boolean status;

    // Constructor vacío
    public foodpurchase() {
    }

    // Constructor con parámetros
    public foodpurchase(int idPurchase, customer idCustomer, food idFood, int quantity, boolean status) {
            this.idPurchase = idPurchase;
            this.idCustomer = idCustomer;
            this.idFood = idFood;
            this.quantity = quantity;
            this.status = status;
    }

    // Getters y Setters
    public int getIdPurchase() {
        return idPurchase;
    }

    public void setIdPurchase(int idPurchase) {
        this.idPurchase = idPurchase;
    }

    public customer getCustomer() {
        return idCustomer;
    }

    public void setCustomer(customer idCustomer) {
        this.idCustomer = idCustomer;
    }

    public food getFood() {
        return idFood;
    }

    public void setFood(food idFood) {
        this.idFood = idFood;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    
}
