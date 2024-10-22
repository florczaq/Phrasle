package com.phraser.server.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponse {
  private String token = "";
  private String userId = "";
  private String errorMessage = "";

  public AuthenticationResponse(String token, String userId) {
    this.token = token;
    this.userId = userId;
  }

  public AuthenticationResponse(String errorMessage) {
    this.errorMessage = errorMessage;
  }
}
