package com.example.demo.controller;

import com.example.demo.service.AiService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService){
        this.aiService = aiService;
    }

    /* ================= AUTO CATEGORY ================= */

    @PostMapping("/categorize")
    public Map<String,String> categorize(@RequestBody Map<String,String> body){

        String text = body.get("text");

        String dept = aiService.detectDepartment(text);
        String priority = aiService.detectPriority(text);
        String summary = aiService.summarizeComplaint(text);

        return Map.of(
                "department",dept,
                "priority",priority,
                "summary",summary
        );
    }


    /* ================= SMART REPLY ================= */

    @PostMapping("/reply")
    public Map<String,String> generateReply(@RequestBody Map<String,String> body){

        String text = body.get("text");

        String reply = aiService.generateReply(text);

        return Map.of("reply",reply);
    }

}