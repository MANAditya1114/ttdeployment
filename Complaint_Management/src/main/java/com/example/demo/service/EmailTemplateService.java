package com.example.demo.service;

import com.example.demo.entity.Complaint;

public class EmailTemplateService {

    public static String complaintCreatedTemplate(Complaint c) {

        return """
        <h2>Complaint Created Successfully</h2>

        <p>Hello %s,</p>

        <p>Your complaint has been registered successfully.</p>

        <h3>Complaint Details</h3>

        <table border="1" cellpadding="8">
        <tr><td><b>Complaint ID</b></td><td>%d</td></tr>
        <tr><td><b>Title</b></td><td>%s</td></tr>
        <tr><td><b>Description</b></td><td>%s</td></tr>
        <tr><td><b>Status</b></td><td>%s</td></tr>
        <tr><td><b>Date</b></td><td>%s</td></tr>
        </table>

        <br>

        <p>Our team will review your complaint shortly.</p>

        <p>Thank you,<br>Complaint Management System</p>
        """
        .formatted(
                c.getUserEmail(),
                c.getId(),
                c.getTitle(),
                c.getDescription(),
                c.getStatus(),
                c.getCreatedAt()
        );
    }
}