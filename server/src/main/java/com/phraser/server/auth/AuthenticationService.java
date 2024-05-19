package com.example.demo.auth;

import com.example.demo.config.JwtService;
import com.example.demo.user.Role;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
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
            .firstName(request.getFirstName())
            .lastName(request.getLastName())
            .username(request.getUsername())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(Role.USER)
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
