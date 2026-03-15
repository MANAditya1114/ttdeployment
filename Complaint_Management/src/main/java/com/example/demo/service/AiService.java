package com.example.demo.service;

import org.springframework.stereotype.Service;

@Service
public class AiService {

    /* ================= AUTO CATEGORY ================= */

    public String detectDepartment(String text){

        text = text.toLowerCase();

        if(text.contains("electric") || text.contains("power") || text.contains("light"))
            return "Electrical";

        if(text.contains("wifi") || text.contains("internet") || text.contains("network"))
            return "IT Department";

        if(text.contains("water") || text.contains("leak") || text.contains("pipe"))
            return "Maintenance";

        if(text.contains("clean") || text.contains("room") || text.contains("hostel"))
            return "Hostel Office";

        return "General";
    }


    /* ================= PRIORITY PREDICTION ================= */

    public String detectPriority(String text){

        text = text.toLowerCase();

        if(text.contains("fire") || text.contains("danger") || text.contains("electric"))
            return "HIGH";

        if(text.contains("not working") || text.contains("broken"))
            return "MEDIUM";

        return "LOW";
    }


    /* ================= SUMMARY ================= */

    public String summarizeComplaint(String text){

        if(text.length() < 100)
            return text;

        return text.substring(0,100) + "...";
    }


    /* ================= SMART REPLY ================= */

    public String generateReply(String complaintText){

        String text = complaintText.toLowerCase();

        if(text.contains("electric")){
            return "Thank you for reporting the electrical issue. Our electrical team has been notified and will resolve it soon.";
        }

        if(text.contains("wifi")){
            return "Our IT department has been informed about the internet issue and will check it shortly.";
        }

        if(text.contains("water")){
            return "Maintenance team will inspect the water issue and fix it as soon as possible.";
        }

        return "Thank you for reporting the issue. Our team will review and resolve it soon.";
    }

}