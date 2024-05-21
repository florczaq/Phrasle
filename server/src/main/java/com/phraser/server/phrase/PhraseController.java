package com.phraser.server.phrase;

import com.phraser.server.phrase.object.Phrase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/v1/phrase")
public class PhraseController {
    private final PhraseRepository repository;
    private final PhraseService service;

    @GetMapping
    public Phrase getPhraseByValue(@RequestParam(name = "v") String value) {
        return service.getPhrase(value);
    }

    @GetMapping("/id")
    public Phrase getByInt(@RequestParam(name = "id") int id) {
        return service.getPhrase(id);
    }

    @GetMapping("/list")
    public List<Phrase> getAllValues() {
       return service.getAllPhrases();
    }

    @GetMapping("/random")
    public Phrase getUserRandomPhrase(@RequestParam(name = "uid", required = true) int userId) {
        return service.getUserRandomPhrase(userId);
    }

}
