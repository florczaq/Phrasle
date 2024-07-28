package com.phraser.server.games.quiz;

import com.phraser.server.phrase.object.Phrase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.rmi.NoSuchObjectException;
import java.util.EmptyStackException;

@RestController
@RequestMapping("api/v1/games/quiz")
@CrossOrigin
@RequiredArgsConstructor

public class QuizController {
    private final QuizService service;

    @GetMapping("/renderNew")
    public ResponseEntity<QuizResponse> getNewSet(@RequestParam(name = "u") String userId) {
        try {
            return ResponseEntity.ok(service.pickAnotherQuiz(userId));
        } catch (NoSuchObjectException | EmptyStackException e) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/getAnswer")
    public ResponseEntity<Phrase> getCorrectAnswer(@RequestParam(name = "g") int gameId) {
        try {
            return ResponseEntity.ok(service.getCorrectAnswer(gameId));
        } catch (NoSuchObjectException e) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
    }

    @DeleteMapping("/finish")
    public ResponseEntity<Void> finishQuizAndDeleteRecord(@RequestBody String userId) {
        try {
            service.finishQuizAndClear(userId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}
