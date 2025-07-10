package com.sena.crud_basic.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.dto.reservationDTO;
import com.sena.crud_basic.dto.responseDTO;
import com.sena.crud_basic.model.reservation;
import com.sena.crud_basic.repository.Ireservation;

@Service
public class reservationService {

    @Autowired
    private Ireservation data;

    // Registrar y actualizar
    public responseDTO save(reservationDTO reservationDTO) {
        reservation reservationRegister = convertToModel(reservationDTO);
        data.save(reservationRegister);

        responseDTO respuesta = new responseDTO(
                HttpStatus.OK.toString(),
                "Reservación registrada correctamente");
        return respuesta;
    }

    // Encontrar todos los registros
    public List<reservation> findAll() {
        return data.getActive();
    }

    // En tu servicio ReservationService
    public List<reservation> searchByCustomerOrTitleOrRoomNumberOrTicket(String filter) {
        List<reservation> activeReservations = data.findActiveReservations();
        String filterLowerCase = filter.toLowerCase();

        return activeReservations.stream()
                .filter(r -> {
                    // Filtrar por nombre de cliente
                    boolean matchesCustomerName = r.getCustomer().getName().toLowerCase().contains(filterLowerCase);

                    // Filtrar por título de película
                    boolean matchesMovieTitle = r.getScreening().getMovie().getTitle().toLowerCase()
                            .contains(filterLowerCase);

                    // Filtrar por número de sala
                    boolean matchesRoomNumber = String.valueOf(r.getScreening().getRoom().getRoomNumber())
                            .contains(filter);

                    // Filtrar por cantidad de tickets
                    boolean matchesTicketCount = String.valueOf(r.getTicketQuantity()).contains(filter);

                    return matchesCustomerName || matchesMovieTitle || matchesRoomNumber || matchesTicketCount;
                })
                .collect(Collectors.toList());
    }

    // Obtener reservación por ID
    public Optional<reservation> findById(int idReservation) {
        return data.findById(idReservation);
    }

    // Eliminar reservación
    public responseDTO deleteReservation(int idReservation) {
        Optional<reservation> reservation = findById(idReservation);
        if (!reservation.isPresent()) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.NOT_FOUND.toString(),
                    "La reservación no existe");
            return respuesta;
        }
        reservation.get().setStatus(false);
        data.save(reservation.get());

        responseDTO respuesta = new responseDTO(
                HttpStatus.OK.toString(),
                "Reservación eliminada correctamente");
        return respuesta;
    }

    // Actualizar reservación
    public responseDTO updateReservation(int idReservation, reservationDTO reservationDTO) {
        Optional<reservation> reservationOptional = data.findById(idReservation);

        if (!reservationOptional.isPresent()) {
            responseDTO respuesta = new responseDTO(
                    HttpStatus.NOT_FOUND.toString(),
                    "La reservación con ID " + idReservation + " no existe");
            return respuesta;
        }

        reservation existingReservation = reservationOptional.get();
        existingReservation.setCustomer(reservationDTO.getCustomer());
        existingReservation.setScreening(reservationDTO.getScreening());
        existingReservation.setTicketQuantity(reservationDTO.getTicketQuantity());

        data.save(existingReservation);

        responseDTO respuesta = new responseDTO(
                HttpStatus.OK.toString(),
                "Reservación actualizada correctamente");
        return respuesta;
    }

    // Conversión a DTO
    public reservationDTO convertToDTO(reservation reservation) {
        return new reservationDTO(
                reservation.getIdReservation(),
                reservation.getCustomer(),
                reservation.getScreening(),
                reservation.getTicketQuantity());
    }

    // Conversión a modelo
    public reservation convertToModel(reservationDTO reservationDTO) {
        return new reservation(
                0, // ID autogenerado
                reservationDTO.getCustomer(),
                reservationDTO.getScreening(),
                reservationDTO.getTicketQuantity(),
                true);
    }
}
