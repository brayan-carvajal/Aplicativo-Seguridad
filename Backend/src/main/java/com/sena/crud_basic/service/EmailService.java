package com.sena.crud_basic.service;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    public void sendPasswordResetEmail(String email, String resetToken) {
        // En producción, usar JavaMailSender o servicio como SendGrid
        // Por ahora, solo simular el envío

        String resetUrl = "http://localhost:8080/reset-password?token=" + resetToken;

        System.out.println("=== EMAIL ENVIADO ===");
        System.out.println("Para: " + email);
        System.out.println("Asunto: Restablecer contraseña");
        System.out.println("Contenido:");
        System.out.println("Hola,");
        System.out.println("Has solicitado restablecer tu contraseña.");
        System.out.println("Haz clic en el siguiente enlace para continuar:");
        System.out.println(resetUrl);
        System.out.println("Este enlace expirará en 15 minutos.");
        System.out.println("Si no solicitaste este cambio, ignora este email.");
        System.out.println("===================");

        // TODO: Implementar envío real de email
        // mailSender.send(createEmail(email, resetUrl));
    }

    public void sendPasswordChangeConfirmation(String email) {
        System.out.println("=== EMAIL ENVIADO ===");
        System.out.println("Para: " + email);
        System.out.println("Asunto: Contraseña cambiada exitosamente");
        System.out.println("Tu contraseña ha sido cambiada exitosamente.");
        System.out.println("===================");
    }
}