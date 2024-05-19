package com.example.demo.auth;

import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
  private String firstName = "-";
  private String lastName = "-";
  private String username;
  private String password;

  public RegisterRequest(String username, String password) {
    this.username = username;
    this.password = password;
  }

}
