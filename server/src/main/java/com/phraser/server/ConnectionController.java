package com.phraser.server;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin
@RequestMapping("/api/v1/connection")
public class ConnectionController {
    @GetMapping
    public ResponseEntity<HttpStatus> testConnection(){
        return ResponseEntity.ok().build();
    }
}
