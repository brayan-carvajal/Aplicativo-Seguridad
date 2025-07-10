package com.sena.crud_basic.dto;

public class customerDTO {

    private int idCustomer;
    private String name;
    private String email;
    private String password;

    public customerDTO(){
    }

    public customerDTO(int idCustomer, String name, String email, String password) {
        this.idCustomer = idCustomer;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public int getIdCustomer() {
        return idCustomer;
    }

    public void setIdCustomer(int idCustomer) {
        this.idCustomer = idCustomer;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
