package com.phraser.server.user.object;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Table(name = "user")
public class User {
    @Id @Getter
    private final Integer id;
    @Getter
    private final String login;
    @Getter
    private final String password;
}
