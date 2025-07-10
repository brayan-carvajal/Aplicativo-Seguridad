package com.sena.crud_basic.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.dto.movieDTO;
import com.sena.crud_basic.dto.responseDTO;
import com.sena.crud_basic.model.movie;
import com.sena.crud_basic.repository.Imovie;

@Service
public class movieService {

    @Autowired
    private Imovie data;

    // Registrar y actualizar
    public responseDTO save(movieDTO movieDTO) {

        // Validaciones
        if (movieDTO.getTitle().length() < 1 || movieDTO.getTitle().length() > 100) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El título debe tener entre 1 y 100 caracteres");
            return respuesta;
        }

        if (movieDTO.getDescription().length() < 1 || movieDTO.getDescription().length() > 500) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "La descripción debe tener entre 1 y 500 caracteres");
            return respuesta;
        }

        if (movieDTO.getGender().length() < 1 || movieDTO.getGender().length() > 50) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El género debe tener entre 1 y 50 caracteres");
            return respuesta;
        }

        if (movieDTO.getDuration() <= 0) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "La duración debe ser mayor a 0 minutos");
            return respuesta;
        }

        movie movieRegister = convertToModel(movieDTO);
        data.save(movieRegister);

        responseDTO respuesta = new responseDTO(
                HttpStatus.OK.toString(),
                "Película registrada correctamente");
        return respuesta;
    }

    // Encontrar todos los registros
    public List<movie> findAll() {
        return data.getActive();
    }

    public List<movie> searchByTitleOrGender(String filter) {
        return data.searchByTitleOrGender(filter);
    }

    /*
     * // Encontrar registros por titulo
     * public List<movie> getForTitle(String filter) {
     * return data.getForTitle(filter);
     * }
     * 
     * // Encontrar registros por genero
     * public List<movie> getForGender(String filter) {
     * return data.getForGender(filter);
     * }
     */

    // Obtener una película por ID
    public Optional<movie> findById(int idMovie) {
        return data.findById(idMovie);
    }

    // Eliminar una película
    public responseDTO deleteMovie(int idMovie) {
        Optional<movie> movie = findById(idMovie);
        if (!movie.isPresent()) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.NOT_FOUND.toString(),
                    "La película no existe");
            return respuesta;
        }
        movie.get().setStatus(false);
        data.save(movie.get());

        responseDTO respuesta = new responseDTO(
                HttpStatus.OK.toString(),
                "Película eliminada correctamente");
        return respuesta;
    }

    // Actualizar película
    public responseDTO updateMovie(int idMovie, movieDTO movieDTO) {
        Optional<movie> movieOptional = data.findById(idMovie);

        if (!movieOptional.isPresent()) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.NOT_FOUND.toString(),
                    "La película con ID " + idMovie + " no existe");
            return respuesta;
        }

        movie existingMovie = movieOptional.get();

        // Validaciones
        if (movieDTO.getTitle().length() < 1 || movieDTO.getTitle().length() > 100) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El título debe tener entre 1 y 100 caracteres");
            return respuesta;
        }

        if (movieDTO.getDescription().length() < 1 || movieDTO.getDescription().length() > 500) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "La descripción debe tener entre 1 y 500 caracteres");
            return respuesta;
        }

        if (movieDTO.getGender().length() < 1 || movieDTO.getGender().length() > 50) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El género debe tener entre 1 y 50 caracteres");
            return respuesta;
        }

        if (movieDTO.getDuration() <= 0) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "La duración debe ser mayor a 0 minutos");
            return respuesta;
        }

        // Actualizar datos
        existingMovie.setTitle(movieDTO.getTitle());
        existingMovie.setDescription(movieDTO.getDescription());
        existingMovie.setGender(movieDTO.getGender());
        existingMovie.setDuration(movieDTO.getDuration());
        existingMovie.setImgUrl(movieDTO.getImgUrl());

        // Guardar en la base de datos
        data.save(existingMovie);

        responseDTO respuesta = new responseDTO(
                HttpStatus.OK.toString(),
                "Película actualizada correctamente");
        return respuesta;
    }

    // Conversión a DTO
    public movieDTO convertToDTO(movie movie) {
        return new movieDTO(
                movie.getIdMovie(),
                movie.getTitle(),
                movie.getDescription(),
                movie.getGender(),
                movie.getDuration(),
                movie.getImgUrl());
    }

    // Conversión a modelo
    public movie convertToModel(movieDTO movieDTO) {
        return new movie(
                0, // ID autogenerado
                movieDTO.getTitle(),
                movieDTO.getDescription(),
                movieDTO.getGender(),
                movieDTO.getDuration(),
                movieDTO.getImgUrl(),
                true);
    }
}
