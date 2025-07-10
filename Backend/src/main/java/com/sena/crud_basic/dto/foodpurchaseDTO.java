package com.sena.crud_basic.dto;

import com.sena.crud_basic.model.customer;
import com.sena.crud_basic.model.food;

public class foodpurchaseDTO {

    private int idPurchase;
    private customer idCustomer; // Objeto completo en lugar del ID
    private food idFood; // Objeto completo en lugar del ID
    private int quantity;

    // Constructor vacío
    public foodpurchaseDTO() {
    }

    // Constructor con parámetros
    public foodpurchaseDTO(int idPurchase, customer idCustomer, food idFood, int quantity) {
        this.idPurchase = idPurchase;
        this.idCustomer = idCustomer;
        this.idFood = idFood;
        this.quantity = quantity;
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

}
