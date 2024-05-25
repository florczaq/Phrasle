package com.phraser.server.user;

import com.phraser.server.auth.AuthenticationRequest;
import com.phraser.server.auth.AuthenticationResponse;
import com.phraser.server.auth.AuthenticationService;
import com.phraser.server.user.object.User;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationService authenticate;

    public AuthenticationResponse changeUserData(User newUserData) throws NoSuchFieldException {
        if (repository.findById(newUserData.getId()).isEmpty())
            throw new NoSuchFieldException();

        repository.save(
            new User(
                newUserData.getId(),
                newUserData.getEmail(),
                passwordEncoder.encode(newUserData.getPassword())
            )
        );

        return authenticate.authenticate(
            new AuthenticationRequest(
                newUserData.getEmail(),
                newUserData.getPassword()
            )
        );
    }
}
