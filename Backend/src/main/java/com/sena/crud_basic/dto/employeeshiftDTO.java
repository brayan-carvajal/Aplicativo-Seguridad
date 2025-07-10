package com.sena.crud_basic.dto;

import java.time.LocalDate;
import com.sena.crud_basic.model.employee;

public class employeeshiftDTO {

    private int idShift;
    private employee idEmployee;
    private LocalDate dateTime;

    // Constructor vacío
    public employeeshiftDTO() {
    }

    // Constructor con parámetros
    public employeeshiftDTO(int idShift, employee idEmployee, LocalDate dateTime) {
        this.idShift = idShift;
        this.idEmployee = idEmployee;
        this.dateTime = dateTime;
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
    
}
