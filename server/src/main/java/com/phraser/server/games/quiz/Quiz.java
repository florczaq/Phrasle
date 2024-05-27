package com.phraser.server.games.quiz;

import jakarta.persistence.*;
import lombok.*;

@Data
@Table(name = "quiz")
@Entity
@RequiredArgsConstructor
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class Quiz {
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Getter
    @Column(name = "phrase_id")
    private final int phraseId;
    @Getter
    @Column(name = "user_id")
    private final String userId;
}
