package com.sena.crud_basic.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.dto.employeeshiftDTO;
import com.sena.crud_basic.dto.responseDTO;
import com.sena.crud_basic.model.employeeshift;
import com.sena.crud_basic.repository.Iemployeeshift;

@Service
public class employeeshiftService {

    @Autowired
    private Iemployeeshift data;

    // Registrar y actualizar
    public responseDTO save(employeeshiftDTO employeeshiftDTO) {
        // Validaciones
        if (employeeshiftDTO.getEmployee() == null) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El empleado es obligatorio");
            return respuesta;
        }
        if (employeeshiftDTO.getDateTime() == null) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "La fecha es obligatoria");
            return respuesta;
        }

        employeeshift employeeshiftRegister = convertToModel(employeeshiftDTO);
        data.save(employeeshiftRegister);

        responseDTO respuesta = new responseDTO(
                HttpStatus.OK.toString(),
                "Se guardó correctamente");
        return respuesta;
    }

    // Encontrar todos los registros
    public List<employeeshift> findAll() {
        return data.getActive();
    }

    // En tu servicio 
    public List<employeeshift> searchByEmployee(String filter) {
        List<employeeshift> activeEmployee = data.findActiveEmployee();
        String filterLowerCase = filter.toLowerCase();

        return activeEmployee.stream()
                .filter(fp -> {
                    // Filtrar por nombre de cliente
                    boolean matchesEmployeeName = fp.getEmployee().getName().toLowerCase().contains(filterLowerCase);

                    return matchesEmployeeName;
                })
                .collect(Collectors.toList());
    }

    // Encontrar registros por id
    public Optional<employeeshift> findById(int idEmployeeshift) {
        return data.findById(idEmployeeshift);
    }

    // Eliminar registros por id
    public responseDTO deleteEmployeeshift(int idEmployeeshift) {
        Optional<employeeshift> employeeshift = findById(idEmployeeshift);
        if (!employeeshift.isPresent()) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.NOT_FOUND.toString(),
                    "El turno no existe");
            return respuesta;
        }
        employeeshift.get().setStatus(false);
        data.save(employeeshift.get());

        responseDTO respuesta = new responseDTO(
                HttpStatus.OK.toString(),
                "Se eliminó correctamente");
        return respuesta;
    }

    // Actualizar un turno
    public responseDTO updateEmployeeshift(int idEmployeeshift, employeeshiftDTO employeeshiftDTO) {
        Optional<employeeshift> employeeshiftOptional = data.findById(idEmployeeshift);
        if (!employeeshiftOptional.isPresent()) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.NOT_FOUND.toString(),
                    "El turno con ID " + idEmployeeshift + " no existe");
            return respuesta;
        }

        employeeshift existingShift = employeeshiftOptional.get();

        // Validaciones
        if (employeeshiftDTO.getEmployee() == null) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El empleado es obligatorio");
            return respuesta;
        }
        if (employeeshiftDTO.getDateTime() == null) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "La fecha es obligatoria");
            return respuesta;
        }

        // Actualizar datos
        existingShift.setEmployee(employeeshiftDTO.getEmployee());
        existingShift.setDateTime(employeeshiftDTO.getDateTime());

        // Guardar en la base de datos
        data.save(existingShift);

        responseDTO respuesta = new responseDTO(
                HttpStatus.OK.toString(),
                "Turno actualizado correctamente");
        return respuesta;
    }

    public employeeshiftDTO convertToDTO(employeeshift employeeshift) {
        return new employeeshiftDTO(
                employeeshift.getIdShift(),
                employeeshift.getEmployee(),
                employeeshift.getDateTime());
    }

    public employeeshift convertToModel(employeeshiftDTO employeeshiftDTO) {
        return new employeeshift(
                0, // ID autogenerado
                employeeshiftDTO.getEmployee(),
                employeeshiftDTO.getDateTime(),
                true);
    }
}
