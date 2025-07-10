package com.sena.crud_basic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "food")
public class food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idFood")
    private int idFood;

    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "imgUrl", length = 255, nullable = false)
    private String imgUrl;

    @Column(name = "status", nullable = false, columnDefinition = "boolean default true ")
    private boolean status;

    // Constructor vacio
    public food() {
    }

    // Constructor
    public food(int idFood, String name, Double price, String imgUrl, boolean status) {
        this.idFood = idFood;
        this.name = name;
        this.price = price;
        this.imgUrl = imgUrl;
        this.status = status;
    }

    // Getters y Setters
    public int getIdFood() {
        return idFood;
    }

    public void setIdFood(int idFood) {
        this.idFood = idFood;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

}
