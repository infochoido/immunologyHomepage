package com.immunologyHomepage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FallbackController {
    
    @GetMapping(value = {
        "/",
        "/boardDetail/**",
        "/notice/**",
        "/research/**",
        "/project/**",
        "/patent/**",
        "/referredJournal/**"
    })
    public String forward() {
        return "forward:/index.html";
    }
} 