package com.phraser.server.phrase.object;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor(force = true)
@Data
@Entity
@Table(name = "phrase")
public class Phrase {
    @Id
    @Getter
    private final Integer id;
    @Getter
    private final String value;
    @Getter
    private final String definition;
    @Getter
    @Column(name = "user_id", nullable = false)
    private final Integer userId;
}
