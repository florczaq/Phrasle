package com.phraser.server.auth;

import com.phraser.server.config.JwtService;
import com.phraser.server.user.UserRepository;
import com.phraser.server.user.object.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User
            .builder()
            .username(request.getUsername())
            .password(passwordEncoder.encode(request.getPassword()))
            .build();

        if (repository.findByUsername(user.getUsername()).isEmpty())
            repository.save(user);

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
                    request.getUsername(), request.getPassword()
                )
            );
        } catch (Exception e) {
            System.out.println("---" + e.getMessage());
            return null;
        }

        var user = repository.findByUsername(request.getUsername()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);


        return AuthenticationResponse
            .builder()
            .token(jwtToken)
            .build();
    }
}
