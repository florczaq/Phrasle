package com.phraser.server.auth;

import com.phraser.server.exception.RecordAlreadyExistsException;
import com.phraser.server.games.quiz.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;
    private final QuizService quizService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        try {
            return ResponseEntity.ok(service.register(request));
        } catch (RecordAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    @PostMapping(value = "/authenticate", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        AuthenticationResponse response = null;
        try {
            response = service.authenticate(request);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(new AuthenticationResponse("No account assigned to this email."), HttpStatus.BAD_REQUEST);
        }
        if (response == null)
            return new ResponseEntity<>((AuthenticationResponse) null, HttpStatus.BAD_REQUEST);

        quizService.finishQuizAndClear(response.getUserId());
        return ResponseEntity.ok(response);
    }
}
