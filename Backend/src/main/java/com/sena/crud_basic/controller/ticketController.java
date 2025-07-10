package com.sena.crud_basic.controller;

import com.sena.crud_basic.dto.responseDTO;
import com.sena.crud_basic.dto.ticketDTO;
import com.sena.crud_basic.service.ticketService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ticket")
@CrossOrigin(origins = "*")
public class ticketController {

    /*
     * POST
     * GET
     * PUT
     * DELETE
     */

    @Autowired
    private ticketService ticketService;

    // POST
    @PostMapping("/post")
    public ResponseEntity<Object> registerTicket(@RequestBody ticketDTO ticket) {
        responseDTO respuesta = ticketService.save(ticket);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    // GET
    @GetMapping("/get")
    public ResponseEntity<Object> getAllTickets() {
        var listaTickets = ticketService.findAll();
        return new ResponseEntity<>(listaTickets, HttpStatus.OK);
    }

    // GET:id
    @GetMapping("/{idTicket}")
    public ResponseEntity<Object> getOneTicket(@PathVariable int idTicket) {
        var ticket = ticketService.findById(idTicket);
        if (!ticket.isPresent())
            return new ResponseEntity<>("", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(ticket, HttpStatus.OK);
    }

    // En tu controlador TicketController
    @GetMapping("/filter/{filter}")
    public ResponseEntity<Object> searchTickets(@PathVariable String filter) {
        var ticketList = ticketService.searchByCustomerOrTitleOrRoomNumberOrPrice(filter);
        return new ResponseEntity<>(ticketList, HttpStatus.OK);
    }

    // DELETE
    @DeleteMapping("/{idTicket}")
    public ResponseEntity<Object> deleteTicket(@PathVariable int idTicket) {
        var message = ticketService.deleteTicket(idTicket);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // PUT
    @PutMapping("/{idTicket}")
    public ResponseEntity<Object> updateTicket(@PathVariable int idTicket, @RequestBody ticketDTO ticket) {
        responseDTO respuesta = ticketService.updateTicket(idTicket, ticket);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }
}
