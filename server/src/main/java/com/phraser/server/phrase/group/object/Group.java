package com.phraser.server.phrase.group.object;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor(force = true)
@Table(name = "phrase_group")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private final int id;
    @Getter
    private final String name;
    @Getter
    @Column(name = "user_id", nullable = false)
    private final String userId;
}
