package com.sena.crud_basic.dto;

public class foodDTO {

    private int idFood;
    private String name;
    private Double price;
    private String imgUrl;

    public foodDTO(){
    }

    public foodDTO(int idFood, String name, Double price, String imgUrl) {
        this.idFood = idFood;
        this.name = name;
        this.price = price;
        this.imgUrl = imgUrl;
    }

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

}
