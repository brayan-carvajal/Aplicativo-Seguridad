// UserService.java
package com.sena.crud_basic.service;

import com.sena.crud_basic.model.User;
import com.sena.crud_basic.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private EmailService emailService;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));
    }
    
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
    
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    
    public User save(User user) {
        return userRepository.save(user);
    }
    
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public Optional<User> findByResetToken(String resetToken) {
        return userRepository.findByResetToken(resetToken);
    }
    
    public void createPasswordResetToken(String email) {
        Optional<User> userOptional = findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            
            // Generar token único
            String resetToken = UUID.randomUUID().toString();
            
            // Establecer expiración (15 minutos)
            long expirationTime = System.currentTimeMillis() + (15 * 60 * 1000);
            
            user.setResetToken(resetToken);
            user.setResetTokenExpiry(expirationTime);
            
            userRepository.save(user);
            
            // Enviar email
            emailService.sendPasswordResetEmail(email, resetToken);
        }
    }
    
    public boolean resetPassword(String token, String newPassword) {
        Optional<User> userOptional = findByResetToken(token);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            
            // Verificar que el token no haya expirado
            if (user.getResetTokenExpiry() > System.currentTimeMillis()) {
                // Actualizar contraseña
                user.setPassword(passwordEncoder.encode(newPassword));
                
                // Limpiar token de reset
                user.setResetToken(null);
                user.setResetTokenExpiry(null);
                
                userRepository.save(user);
                
                // Enviar confirmación
                emailService.sendPasswordChangeConfirmation(user.getEmail());
                
                return true;
            }
        }
        return false;
    }
    
    public boolean changePassword(String username, String currentPassword, String newPassword) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            
            // Verificar contraseña actual
            if (passwordEncoder.matches(currentPassword, user.getPassword())) {
                // Actualizar contraseña
                user.setPassword(passwordEncoder.encode(newPassword));
                userRepository.save(user);
                
                // Enviar confirmación
                emailService.sendPasswordChangeConfirmation(user.getEmail());
                
                return true;
            }
        }
        return false;
    }
}