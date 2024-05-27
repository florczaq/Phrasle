package com.phraser.server.games;


import com.phraser.server.games.quiz.QuizGameResponse;
import com.phraser.server.games.quiz.QuizService;
import com.phraser.server.phrase.object.Phrase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.rmi.NoSuchObjectException;
import java.util.List;

@RestController
@RequestMapping("api/v1/games")
@RequiredArgsConstructor
public class GamesController {
    private final QuizService quizService;

    @PostMapping("/quiz/renderNew/{userId}")
    public ResponseEntity<QuizGameResponse> getNewSet(@PathVariable String userId) {
        try {
            return ResponseEntity.ok(quizService.pickAnotherQuiz(userId));
        } catch (NoSuchObjectException e) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/quiz/getAnswer")
    public ResponseEntity<Phrase> getCorrectAnswer(@RequestParam(name = "g") int gameId) {
        try {
            return ResponseEntity.ok(quizService.getCorrectAnswer(gameId));
        } catch (NoSuchObjectException e) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
    }

}

