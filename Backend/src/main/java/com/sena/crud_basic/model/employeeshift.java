package com.sena.crud_basic.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity(name = "employeeshift")
public class employeeshift {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idShift  ")
    private int idShift;

    @ManyToOne
    @JoinColumn(name = "idEmployee", nullable = false)
    private employee idEmployee;

    @Column(name = "dateTime", nullable = false)
    private LocalDate dateTime;

    @Column(name = "status", nullable = false, columnDefinition = "boolean default true ")
    private boolean status;

    // Constructor vacío
    public employeeshift() {
    }

    // Constructor con parámetros
    public employeeshift(int idShift, employee idEmployee, LocalDate dateTime, boolean status) {
        this.idShift = idShift;
        this.idEmployee = idEmployee;
        this.dateTime = dateTime;
        this.status = status;
    }

    // Getters y Setters
    public int getIdShift() {
        return idShift;
    }

    public void setIdShift(int idShift) {
        this.idShift = idShift;
    }

    public employee getEmployee() {
        return idEmployee;
    }

    public void setEmployee(employee idEmployee) {
        this.idEmployee = idEmployee;
    }

    public LocalDate getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDate dateTime) {
        this.dateTime = dateTime;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

}
