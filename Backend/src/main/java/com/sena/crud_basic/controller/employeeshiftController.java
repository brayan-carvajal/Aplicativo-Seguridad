package com.sena.crud_basic.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.crud_basic.dto.employeeshiftDTO;
import com.sena.crud_basic.dto.responseDTO;
import com.sena.crud_basic.service.employeeshiftService;

@RestController
@RequestMapping("/api/v1/employeeshift")
@CrossOrigin(origins = "*")
public class employeeshiftController {

    /*
     * POST
     * GET
     * PUT
     * DELETE
     */

    @Autowired
    private employeeshiftService employeeshiftService;

    // POST
    @PostMapping("/post")
    public ResponseEntity<Object> registerEmployeeShift(@RequestBody employeeshiftDTO employeeshift) {
        responseDTO respuesta = employeeshiftService.save(employeeshift);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    // GET
    @GetMapping("/get")
    public ResponseEntity<Object> getAllEmployeeShifts() {
        var listaEmployeeShifts = employeeshiftService.findAll();
        return new ResponseEntity<>(listaEmployeeShifts, HttpStatus.OK);
    }

    // GET:id
    @GetMapping("/{idEmployeeShift}")
    public ResponseEntity<Object> getOneEmployeeShift(@PathVariable int idEmployeeShift) {
        var employeeshift = employeeshiftService.findById(idEmployeeShift);
        if (!employeeshift.isPresent())
            return new ResponseEntity<>("", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(employeeshift, HttpStatus.OK);
    }

    // En tu controlador FoodPurchaseController
    @GetMapping("/filter/{filter}")
    public ResponseEntity<Object> searchFoodPurchases(@PathVariable String filter) {
        var foodPurchaseList = employeeshiftService.searchByEmployee(filter);
        return new ResponseEntity<>(foodPurchaseList, HttpStatus.OK);
    }

    // DELETE
    @DeleteMapping("/{idEmployeeShift}")
    public ResponseEntity<Object> deleteEmployeeShift(@PathVariable int idEmployeeShift) {
        var message = employeeshiftService.deleteEmployeeshift(idEmployeeShift);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // PUT
    @PutMapping("/{idEmployeeShift}")
    public ResponseEntity<Object> updateEmployeeShift(@PathVariable int idEmployeeShift,
            @RequestBody employeeshiftDTO employeeshift) {
        responseDTO respuesta = employeeshiftService.updateEmployeeshift(idEmployeeShift, employeeshift);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }
}
