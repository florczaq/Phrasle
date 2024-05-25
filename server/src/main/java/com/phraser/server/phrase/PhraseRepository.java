package com.phraser.server.phrase;

import com.phraser.server.phrase.object.Phrase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PhraseRepository extends JpaRepository<Phrase, Integer> {
    Optional<Phrase> findByValue(String value);

    List<Phrase> findByUserId(String uid);
    List<Phrase> findByUserIdOrderByValue(String uid);
}
