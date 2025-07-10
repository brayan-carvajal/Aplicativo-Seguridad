package com.sena.crud_basic.controller;

import com.sena.crud_basic.dto.employeeDTO;
import com.sena.crud_basic.dto.responseDTO;
import com.sena.crud_basic.service.employeeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/employee")
@CrossOrigin(origins = "*")
public class employeeController {

    /*
     * GET
     * POST(REGISTER)
     * PUT
     * DELETE
     */
    @Autowired
    private employeeService employeeService;

    // POST - Registrar empleado
    @PostMapping("/post")
    public ResponseEntity<Object> registerEmployee(@RequestBody employeeDTO employee) {
        responseDTO respuesta = employeeService.save(employee);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    // GET - Obtener todos los empleados
    @GetMapping("/get")
    public ResponseEntity<Object> getAllEmployees() {
        var employees = employeeService.findAll();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    // GET:id - Obtener empleado por ID
    @GetMapping("/{idEmployee}")
    public ResponseEntity<Object> getOneEmployee(@PathVariable int idEmployee) {
        var employee = employeeService.findById(idEmployee);
        if (!employee.isPresent())
            return new ResponseEntity<>("Empleado no encontrado", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    // GET: Filtro por nombre
    @GetMapping("/filter/{filter}")
    public ResponseEntity<Object> searchEmployee(@PathVariable String filter) {
        var employeeList = employeeService.searchByNameOrPosition(filter);
        return new ResponseEntity<>(employeeList, HttpStatus.OK);
    }
    
    // DELETE - Eliminar empleado por ID
    @DeleteMapping("/{idEmployee}")
    public ResponseEntity<Object> deleteEmployee(@PathVariable int idEmployee) {
        var message = employeeService.deleteEmployee(idEmployee);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // PUT - Actualizar empleado por ID
    @PutMapping("/{idEmployee}")
    public ResponseEntity<Object> updateEmployee(@PathVariable int idEmployee, @RequestBody employeeDTO employee) {
        responseDTO respuesta = employeeService.updateEmployee(idEmployee, employee);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }
}
