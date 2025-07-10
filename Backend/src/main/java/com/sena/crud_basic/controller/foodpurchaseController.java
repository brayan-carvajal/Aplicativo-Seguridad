package com.sena.crud_basic.controller;

import com.sena.crud_basic.dto.foodpurchaseDTO;
import com.sena.crud_basic.dto.responseDTO;
import com.sena.crud_basic.service.foodpurchaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/foodpurchase")
@CrossOrigin(origins = "*")
public class foodpurchaseController {

    /*
     * POST
     * GET
     * GET:id
     * PUT
     * DELETE
     */

    @Autowired
    private foodpurchaseService foodpurchaseService;

    // POST - Registrar una compra de comida
    @PostMapping("/post")
    public ResponseEntity<Object> registerFoodPurchase(@RequestBody foodpurchaseDTO foodpurchase) {
        responseDTO respuesta = foodpurchaseService.save(foodpurchase);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    // GET - Obtener todas las compras de comida
    @GetMapping("/get")
    public ResponseEntity<Object> getAllFoodPurchases() {
        var listaFoodPurchases = foodpurchaseService.findAll();
        return new ResponseEntity<>(listaFoodPurchases, HttpStatus.OK);
    }

    // GET:id - Obtener una compra de comida por ID
    @GetMapping("/{idFoodPurchase}")
    public ResponseEntity<Object> getOneFoodPurchase(@PathVariable int idFoodPurchase) {
        var foodpurchase = foodpurchaseService.findById(idFoodPurchase);
        if (!foodpurchase.isPresent())
            return new ResponseEntity<>("Compra de comida no encontrada", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(foodpurchase, HttpStatus.OK);
    }

    // En tu controlador FoodPurchaseController
    @GetMapping("/filter/{filter}")
    public ResponseEntity<Object> searchFoodPurchases(@PathVariable String filter) {
        var foodPurchaseList = foodpurchaseService.searchByCustomerOrFoodOrQuantity(filter);
        return new ResponseEntity<>(foodPurchaseList, HttpStatus.OK);
    }

    // DELETE - Eliminar una comida
    @DeleteMapping("/{idFoodPurchase}")
    public ResponseEntity<Object> deleteFoodPurchase(@PathVariable int idFoodPurchase) {
        var message = foodpurchaseService.deleteFoodPurchase(idFoodPurchase);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // PUT - Actualizar una compra de comida
    @PutMapping("/{idFoodPurchase}")
    public ResponseEntity<Object> updateFoodPurchase(@PathVariable int idFoodPurchase,
            @RequestBody foodpurchaseDTO foodpurchase) {
        responseDTO respuesta = foodpurchaseService.updateFoodPurchase(idFoodPurchase, foodpurchase);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }
}
