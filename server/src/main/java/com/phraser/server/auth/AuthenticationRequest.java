package com.phraser.server.auth;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
public class AuthenticationRequest {
  private String email = null;
  private String password = null;
  private boolean staySignedIn = false;
}
