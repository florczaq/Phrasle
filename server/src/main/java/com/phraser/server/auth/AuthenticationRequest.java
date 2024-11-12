package com.phraser.server.auth;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(force = true)
@RequiredArgsConstructor
public class AuthenticationRequest {
  private final String email = null;
  private final String password = null;
  private boolean staySignedIn = false;
}
