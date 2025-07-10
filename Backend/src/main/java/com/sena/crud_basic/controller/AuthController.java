package com.sena.crud_basic.controller;

import com.sena.crud_basic.dto.*;
import com.sena.crud_basic.model.User;
import com.sena.crud_basic.service.JwtService;
import com.sena.crud_basic.service.TokenBlacklistService;
import com.sena.crud_basic.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private TokenBlacklistService tokenBlacklistService;
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            // Verificar si el usuario ya existe
            if (userService.existsByUsername(request.getUsername())) {
                return ResponseEntity.badRequest()
                    .body("Error: El nombre de usuario ya existe");
            }
            
            if (userService.existsByEmail(request.getEmail())) {
                return ResponseEntity.badRequest()
                    .body("Error: El email ya está registrado");
            }
            
            // Crear nuevo usuario
            User user = new User();
            user.setUsername(request.getUsername());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setEmail(request.getEmail());
            
            // Asignar rol (por defecto USER)
            String role = "USER";
            if (request.getRole() != null && !request.getRole().isEmpty()) {
                // Validar que el rol sea válido
                String requestedRole = request.getRole().toUpperCase();
                if (requestedRole.equals("ADMIN") || requestedRole.equals("USER") || 
                    requestedRole.equals("EMPLOYEE") || requestedRole.equals("MANAGER")) {
                    role = requestedRole;
                }
            }
            user.setRole(role);
            
            // Guardar usuario
            userService.save(user);
            
            // Generar token
            String token = jwtService.generateToken(user);
            
            AuthResponse response = new AuthResponse(token, user.getUsername(), user.getRole());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error al registrar usuario: " + e.getMessage());
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            // Autenticar usuario
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()
                )
            );
            
            // Obtener detalles del usuario
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = (User) userDetails;
            
            // Generar token
            String token = jwtService.generateToken(userDetails);
            
            AuthResponse response = new AuthResponse(token, user.getUsername(), user.getRole());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Credenciales incorrectas");
        }
    }
    
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        try {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = (User) userDetails;
            
            return ResponseEntity.ok(user);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Usuario no autenticado");
        }
    }
    
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        try {
            userService.createPasswordResetToken(request.getEmail());
            return ResponseEntity.ok(new ApiResponse(true, "Si el email existe, se ha enviado un enlace de restablecimiento"));
        } catch (Exception e) {
            return ResponseEntity.ok(new ApiResponse(true, "Si el email existe, se ha enviado un enlace de restablecimiento"));
        }
    }
    
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        try {
            if (request.getNewPassword() == null || request.getNewPassword().length() < 6) {
                return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "La contraseña debe tener al menos 6 caracteres"));
            }
            
            boolean success = userService.resetPassword(request.getToken(), request.getNewPassword());
            
            if (success) {
                return ResponseEntity.ok(new ApiResponse(true, "Contraseña restablecida exitosamente"));
            } else {
                return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Token inválido o expirado"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse(false, "Error al restablecer contraseña"));
        }
    }
    
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request, Authentication authentication) {
        try {
            if (request.getNewPassword() == null || request.getNewPassword().length() < 6) {
                return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "La contraseña debe tener al menos 6 caracteres"));
            }
            
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername();
            
            boolean success = userService.changePassword(username, request.getCurrentPassword(), request.getNewPassword());
            
            if (success) {
                return ResponseEntity.ok(new ApiResponse(true, "Contraseña cambiada exitosamente"));
            } else {
                return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Contraseña actual incorrecta"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse(false, "Error al cambiar contraseña"));
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        try {
            String authHeader = request.getHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                tokenBlacklistService.blacklistToken(token);
            }
            
            return ResponseEntity.ok(new ApiResponse(true, "Sesión cerrada exitosamente"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse(false, "Error al cerrar sesión"));
        }
    }
    
    @GetMapping("/validate-token")
    public ResponseEntity<?> validateToken(Authentication authentication) {
        try {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = (User) userDetails;
            
            return ResponseEntity.ok(new ApiResponse(true, "Token válido - Usuario: " + user.getUsername()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ApiResponse(false, "Token inválido"));
        }
    }
}