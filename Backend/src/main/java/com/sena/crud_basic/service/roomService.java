package com.sena.crud_basic.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.dto.responseDTO;
import com.sena.crud_basic.dto.roomDTO;
import com.sena.crud_basic.model.room;
import com.sena.crud_basic.repository.Iroom;

@Service
public class roomService {

    @Autowired
    private Iroom data;

    // Registrar y actualizar
    public responseDTO save(roomDTO roomDTO) {

        // Validaciones
        if (roomDTO.getRoomNumber() <= 0) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El número de la sala debe ser mayor a 0");
            return respuesta;
        }

        if (roomDTO.getCapacity() < 1 || roomDTO.getCapacity() > 500) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "La capacidad debe estar entre 1 y 500");
            return respuesta;
        }

        room roomRegister = convertToModel(roomDTO);
        data.save(roomRegister);

        responseDTO respuesta = new responseDTO(
                HttpStatus.OK.toString(),
                "Sala registrada correctamente");
        return respuesta;
    }

    // Encontrar todos los registros
    public List<room> findAll() {
        return data.getActive();
    }


     // Encontrar registros por numero de sala y capacidad
    public List<room> searchByRoomNumberOrCapacity(String filter) {
        return data.searchByRoomNumberOrCapacity(filter);
    }

    // Obtener una sala por ID
    public Optional<room> findById(int id) {
        return data.findById(id);
    }

    // Eliminar una sala por ID
    public responseDTO deleteRoom(int idRoom) {
        Optional<room> room = findById(idRoom);
        if (!data.existsById(idRoom)) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.NOT_FOUND.toString(),
                    "Sala no encontrada");
            return respuesta;
        }
        room.get().setStatus(false);
        data.save(room.get());

        responseDTO respuesta = new responseDTO(
                HttpStatus.OK.toString(),
                "Sala eliminada correctamente");
        return respuesta;
    }

    // Actualizar una sala
    public responseDTO updateRoom(int id, roomDTO roomDTO) {
        Optional<room> roomOptional = data.findById(id);

        if (!roomOptional.isPresent()) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.NOT_FOUND.toString(),
                    "La sala con ID " + id + " no existe");
            return respuesta;
        }

        room existingRoom = roomOptional.get();

        // Validaciones
        if (roomDTO.getRoomNumber() <= 0) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El número de la sala debe ser mayor a 0");
            return respuesta;
        }

        if (roomDTO.getCapacity() < 1 || roomDTO.getCapacity() > 500) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "La capacidad debe estar entre 1 y 500");
            return respuesta;
        }

        // Actualizar datos
        existingRoom.setRoomNumber(roomDTO.getRoomNumber());
        existingRoom.setCapacity(roomDTO.getCapacity());

        // Guardar en la base de datos
        data.save(existingRoom);

        responseDTO respuesta = new responseDTO(
                HttpStatus.OK.toString(),
                "Sala actualizada correctamente");
        return respuesta;
    }

    public roomDTO convertToDTO(room room) {
        return new roomDTO(
                room.getIdRoom(),
                room.getRoomNumber(),
                room.getCapacity());
    }

    public room convertToModel(roomDTO roomDTO) {
        return new room(
                0, // ID autogenerado
                roomDTO.getRoomNumber(),
                roomDTO.getCapacity(),
                true);
    }
}
