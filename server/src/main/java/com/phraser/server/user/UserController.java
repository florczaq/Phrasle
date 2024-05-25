package com.phraser.server.user;

import com.phraser.server.auth.AuthenticationResponse;
import com.phraser.server.user.object.User;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@AllArgsConstructor
public class UserController {
    private final UserService service;

    @PutMapping("/update")
    public ResponseEntity<AuthenticationResponse> updateUser(@RequestBody User newUserData) {
        try {
            return ResponseEntity.ok(service.changeUserData(newUserData));
        } catch (NoSuchFieldException e) {
            return ResponseEntity.badRequest().build();
        }
    }


}
