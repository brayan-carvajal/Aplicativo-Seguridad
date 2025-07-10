package com.sena.crud_basic.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.dto.customerDTO;
import com.sena.crud_basic.dto.responseDTO;
import com.sena.crud_basic.model.customer;
import com.sena.crud_basic.repository.Icustomer;

@Service
public class customerService {

    /*
     * save
     * findAll
     * findById
     * delete
     * update
     */

    /* Establecer conexión con el repositorio */
    @Autowired
    private Icustomer data;

    // Registrar y actualizar
    public responseDTO save(customerDTO customerDTO) {

        if (customerDTO.getName().length() < 1 || customerDTO.getName().length() > 50) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "Los caracteres de nombre deben estar entre 1 y 50");
            return respuesta;
        }

        if (customerDTO.getEmail().length() < 1 || customerDTO.getEmail().length() > 100) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "Los caracteres de email deben estar entre 1 y 100");
            return respuesta;
        }

        if (customerDTO.getPassword().length() < 1 || customerDTO.getPassword().length() > 20) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "Los caracteres de password deben estar entre 1 y 20");
            return respuesta;
        }

        customer customerRegister = convertToModel(customerDTO);
        data.save(customerRegister);

        responseDTO respuesta = new responseDTO(
                HttpStatus.OK.toString(),
                "Se guardó correctamente");
        return respuesta;
    }

    // Encontrar todos los registros
    public List<customer> findAll() {
        return data.getActive();
    }

    public List<customer> searchByNameOrEmail(String filter) {
        return data.searchByNameOrEmail(filter);
    }

    /*
     * // Encontrar registros por nombre
     * public List<customer> getForName(String filter) {
     * // return data.findAll();
     * return data.getForName(filter);
     * }
     * 
     * // Encontrar registros por email
     * public List<customer> getForEmail(String filter) {
     * return data.getForEmail(filter);
     * }
     */

    // Encontrar registros por id// Encontrar registros por nombre
    public Optional<customer> findById(int idCustomer) {
        return data.findById(idCustomer);
    }

    // Eliminar registros por id
    public responseDTO deleteCustomer(int idCustomer) {
        Optional<customer> customer = findById(idCustomer);
        if (!customer.isPresent()) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.NOT_FOUND.toString(),
                    "El registro no existe");
            return respuesta;
        }
        customer.get().setStatus(false);
        data.save(customer.get());
        // data.deleteById(idCustomer);

        responseDTO respuesta = new responseDTO(
                HttpStatus.OK.toString(),
                "Se eliminó correctamente");
        return respuesta;
    }

    // Actualizar cliente
    public responseDTO updateCustomer(int idCustomer, customerDTO customerDTO) {
        Optional<customer> customerOptional = data.findById(idCustomer);

        if (!customerOptional.isPresent()) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.NOT_FOUND.toString(),
                    "El cliente con ID " + idCustomer + " no existe");
            return respuesta;
        }

        customer existingCustomer = customerOptional.get();

        // Validaciones
        if (customerDTO.getName().length() < 1 || customerDTO.getName().length() > 50) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "Los caracteres de nombre deben estar entre 1 y 50");
            return respuesta;
        }

        if (customerDTO.getEmail().length() < 1 || customerDTO.getEmail().length() > 100) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "Los caracteres de email deben estar entre 1 y 100");
            return respuesta;
        }

        if (customerDTO.getPassword().length() < 1 || customerDTO.getPassword().length() > 20) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "Los caracteres de password deben estar entre 1 y 20");
            return respuesta;
        }

        existingCustomer.setName(customerDTO.getName());
        existingCustomer.setEmail(customerDTO.getEmail());
        existingCustomer.setPassword(customerDTO.getPassword());

        data.save(existingCustomer);

        responseDTO respuesta = new responseDTO(
                HttpStatus.OK.toString(),
                "Cliente actualizado correctamente");
        return respuesta;
    }

    public customerDTO convertToDTO(customer customer) {
        return new customerDTO(
                customer.getIdCustomer(),
                customer.getName(),
                customer.getEmail(),
                customer.getPassword());
    }

    public customer convertToModel(customerDTO customerDTO) {
        return new customer(
                0, // ID autogenerado
                customerDTO.getName(),
                customerDTO.getEmail(),
                customerDTO.getPassword(),
                true);
    }
}
