package com.sena.crud_basic.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.dto.responseDTO;
import com.sena.crud_basic.dto.screeningDTO;
import com.sena.crud_basic.model.screening;
import com.sena.crud_basic.repository.Iscreening;

@Service
public class screeningService {

    @Autowired
    private Iscreening data;

    // Registrar y actualizar
    public responseDTO save(screeningDTO screeningDTO) {

        // Validaciones (Ejemplo: no permitir valores nulos)
        if (screeningDTO.getMovie() == null || screeningDTO.getRoom() == null || screeningDTO.getDateTime() == null) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "Todos los campos son obligatorios");
            return respuesta;
        }

        screening screeningRegister = convertToModel(screeningDTO);
        data.save(screeningRegister);

        responseDTO respuesta = new responseDTO(
                HttpStatus.OK.toString(),
                "Función guardada correctamente");
        return respuesta;
    }

    // Encontrar todos los registros
    public List<screening> findAll() {
        return data.getActive();
    }

    // En tu servicio
    public List<screening> searchByTitleOrRoomNumber(String filter) {
        List<screening> activeScreenings = data.findActiveScreenings();
        String filterLowerCase = filter.toLowerCase();

        return activeScreenings.stream()
                .filter(s -> {
                    // Filtrar por título de película
                    boolean matchesTitle = s.getMovie().getTitle().toLowerCase().contains(filterLowerCase);

                    // Filtrar por número de sala
                    boolean matchesRoomNumber = String.valueOf(s.getRoom().getRoomNumber()).contains(filter);

                    return matchesTitle || matchesRoomNumber;
                })
                .collect(Collectors.toList());
    }

    /*
     * // Encontrar registros por numero de sala y capacidad
     * public List<screening> searchByMovieOrRoom(String filter) {
     * return data.searchByMovieOrRoom(filter);
     * }
     */

    // Buscar proyección por ID
    public Optional<screening> findById(int idScreening) {
        return data.findById(idScreening);
    }

    // Eliminar una proyección
    public responseDTO deleteScreening(int idScreening) {
        Optional<screening> screening = findById(idScreening);
        if (!screening.isPresent()) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.NOT_FOUND.toString(),
                    "La proyección no existe");
            return respuesta;
        }
        screening.get().setStatus(false);
        data.save(screening.get());

        responseDTO respuesta = new responseDTO(
                HttpStatus.OK.toString(),
                "Proyección eliminada correctamente");
        return respuesta;
    }

    // Actualizar una proyección
    public responseDTO updateScreening(int idScreening, screeningDTO screeningDTO) {
        Optional<screening> screeningOptional = data.findById(idScreening);

        if (!screeningOptional.isPresent()) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.NOT_FOUND.toString(),
                    "La proyección con ID " + idScreening + " no existe");
            return respuesta;
        }

        screening existingScreening = screeningOptional.get();

        // Validaciones
        if (screeningDTO.getMovie() == null || screeningDTO.getRoom() == null || screeningDTO.getDateTime() == null) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "Todos los campos son obligatorios");
            return respuesta;
        }

        // Actualizar datos
        existingScreening.setMovie(screeningDTO.getMovie());
        existingScreening.setRoom(screeningDTO.getRoom());
        existingScreening.setDateTime(screeningDTO.getDateTime());

        // Guardar en la base de datos
        data.save(existingScreening);

        responseDTO respuesta = new responseDTO(
                HttpStatus.OK.toString(),
                "Proyección actualizada correctamente");
        return respuesta;
    }

    public screeningDTO convertToDTO(screening screening) {
        return new screeningDTO(
                screening.getIdScreening(),
                screening.getMovie(),
                screening.getRoom(),
                screening.getDateTime());
    }

    public screening convertToModel(screeningDTO screeningDTO) {
        return new screening(
                0, // ID autogenerado
                screeningDTO.getMovie(),
                screeningDTO.getRoom(),
                screeningDTO.getDateTime(),
                true);
    }
}
