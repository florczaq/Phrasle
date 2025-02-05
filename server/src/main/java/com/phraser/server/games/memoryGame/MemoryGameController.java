package com.phraser.server.games.memoryGame;

import com.phraser.server.phrase.object.Phrase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/v1/games/memoryGame")
@RequiredArgsConstructor
@RestController
@CrossOrigin
public class MemoryGameController {
    private final MemoryGameService service;

    @PostMapping
    public ResponseEntity<List<Phrase>> getNewGame(@RequestBody MemoryGameRequest request) {
        var response = service.getNewSet(request);
        return ResponseEntity.ok(response);
    }
}
