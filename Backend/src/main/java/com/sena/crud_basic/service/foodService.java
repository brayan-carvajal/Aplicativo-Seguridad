package com.sena.crud_basic.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.dto.foodDTO;
import com.sena.crud_basic.dto.responseDTO;

import com.sena.crud_basic.model.food;
import com.sena.crud_basic.repository.Ifood;

@Service
public class foodService {

    /* Establecer conexión con el repositorio */
    @Autowired
    private Ifood data;

    // Registrar y actualizar
    public responseDTO save(foodDTO foodDTO) {

        // Validaciones
        if (foodDTO.getName().length() < 1 || foodDTO.getName().length() > 50) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "Los caracteres del nombre deben estar entre 1 y 50");
            return respuesta;
        }

        if (foodDTO.getPrice() <= 0) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El precio debe ser mayor que 0");
            return respuesta;
        }

        food foodRegister = convertToModel(foodDTO);
        data.save(foodRegister);

        responseDTO respuesta = new responseDTO(
                HttpStatus.OK.toString(),
                "Se guardó correctamente");
        return respuesta;
    }

    // Encontrar todos los registros
    public List<food> findAll() {
        return data.getActive();
    }

    // Encontrar registros por nombre y precio
    public List<food> searchByNameOrPrice(String filter) {
        return data.searchByNameOrPrice(filter);
    }

    /*
    // Encontrar registros por nombre
    public List<food> getForName(String filter) {
        // return data.findAll();
        return data.getForName(filter);
    }

     * // Encontrar registros por precio
     * public List<food> getForPrice(Double filter) {
     * return data.getForPrice(filter);
     * }
     */

    // Encontrar registros por id
    public Optional<food> findById(int idFood) {
        return data.findById(idFood);
    }

    // Eliminar registros por id
    public responseDTO deleteFood(int idFood) {
        Optional<food> food = findById(idFood);
        if (!food.isPresent()) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.NOT_FOUND.toString(),
                    "El registro no existe");
            return respuesta;
        }
        food.get().setStatus(false);
        data.save(food.get());

        responseDTO respuesta = new responseDTO(
                HttpStatus.OK.toString(),
                "Se eliminó correctamente");
        return respuesta;
    }

    // Actualizar comida
    public responseDTO updateFood(int idFood, foodDTO foodDTO) {
        Optional<food> foodOptional = data.findById(idFood);

        if (!foodOptional.isPresent()) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.NOT_FOUND.toString(),
                    "La comida con ID " + idFood + " no existe");
            return respuesta;
        }

        food existingFood = foodOptional.get();

        // Validaciones
        if (foodDTO.getName().length() < 1 || foodDTO.getName().length() > 50) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "Los caracteres del nombre deben estar entre 1 y 50");
            return respuesta;
        }

        if (foodDTO.getPrice() <= 0) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El precio debe ser mayor que 0");
            return respuesta;
        }

        // Actualizar datos
        existingFood.setName(foodDTO.getName());
        existingFood.setPrice(foodDTO.getPrice());
        existingFood.setImgUrl(foodDTO.getImgUrl());

        // Guardar en la base de datos
        data.save(existingFood);

        responseDTO respuesta = new responseDTO(
                HttpStatus.OK.toString(),
                "Comida actualizada correctamente");
        return respuesta;
    }

    public foodDTO convertToDTO(food food) {
        return new foodDTO(
                food.getIdFood(),
                food.getName(),
                food.getPrice(),
                food.getImgUrl());
    }

    public food convertToModel(foodDTO foodDTO) {
        return new food(
                0, // ID autogenerado
                foodDTO.getName(),
                foodDTO.getPrice(),
                foodDTO.getImgUrl(),
                true);
    }
}
