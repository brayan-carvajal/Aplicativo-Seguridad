package com.sena.crud_basic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/*
* Agregamos la anotacion bean Entity
* Para indicar que la clase es una entidad
* name="nombre que registra en la base de datos"
*/

@Entity(name = "customer")
public class customer {

    /*
     * Atributos o columnas de la entidad
     * 
     * @Id = es una llave primaria o PK
     * 
     * @Column = es la columna de la entidad
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idCustomer")
    private int idCustomer;

    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @Column(name = "email", length = 100, unique = true)
    private String email;

    @Column(name = "password", length = 20, nullable = false)
    private String password;

    @Column(name="status", nullable = false, columnDefinition = "boolean default true ")
   private boolean status;

    // Constructor vacio
    public customer() {
    }

    // Constructor
    public customer(int idCustomer, String name, String email, String password, boolean status) {
            this.idCustomer = idCustomer;
            this.name = name;
            this.email = email;
            this.password = password;
            this.status = status;
    }

    // Getters y Setters
    public int getIdCustomer() {
        return idCustomer;
    }

    public void setIdCustomer(int idCustomer) {
        this.idCustomer = idCustomer;
    }

    public String getName() {
        return name;
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

    public boolean getStatus() {
        return status;
     }
  
     public void setStatus(boolean status) {
        this.status = status;
     }

}
