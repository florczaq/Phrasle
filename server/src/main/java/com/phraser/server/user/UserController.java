package com.phraser.server.user;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository repository;

    @GetMapping
    public String testController(@RequestParam(name = "u", defaultValue = "somebody") String s){
        return  repository.findByLogin("test").get().getLogin();
    }
}
