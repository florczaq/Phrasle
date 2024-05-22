package com.phraser.server.auth;

import com.phraser.server.config.JwtService;
import com.phraser.server.exception.RecordAlreadyExistsException;
import com.phraser.server.user.UserRepository;
import com.phraser.server.user.object.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) throws RecordAlreadyExistsException {
        var user = User
            .builder()
            .id(UUID.randomUUID().toString())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .build();

        if (repository.findByEmail(user.getUsername()).isEmpty())
            repository.save(user);
        else throw new RecordAlreadyExistsException();

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse
            .builder()
            .token(jwtToken)
            .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getEmail(), request.getPassword()
                )
            );
        } catch (Exception e) {
            return null;
        }

        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);


        return AuthenticationResponse
            .builder()
            .token(jwtToken)
            .build();
    }
}
