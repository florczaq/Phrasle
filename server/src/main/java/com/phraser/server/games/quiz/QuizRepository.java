package com.phraser.server.games.quiz;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface QuizRepository extends JpaRepository<Quiz, Integer> {
    Optional<Quiz> findByPhraseId(int phraseId);
    Optional<Quiz> findById(int id);

    @Query("SELECT q.phraseId FROM Quiz q WHERE q.userId = ?1")
    List<Integer> findAll(@Param("uid") String userId);
    @Transactional
    long deleteByUserId(String userId);
}
