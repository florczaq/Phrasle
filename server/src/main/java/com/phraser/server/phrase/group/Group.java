package com.phraser.server.phrase.group;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
    private final int id;
    @Getter
    private final String name;
    @Getter
    @Column(name = "user_id", nullable = false)
    private final String userId;
}
