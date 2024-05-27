package com.phraser.server.games.quiz;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface QuizRepository extends JpaRepository<Quiz, Integer> {
    Optional<Quiz> findByPhraseId(int phraseId);
    Optional<Quiz> findById(int id);
}
