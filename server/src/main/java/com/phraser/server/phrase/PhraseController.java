package com.phraser.server.phrase;

import com.phraser.server.phrase.object.Phrase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/v1/phrase")
public class PhraseController {
    private final PhraseRepository repository;

    @GetMapping
    public Phrase getPhraseByValue(@RequestParam(name = "v") String value) {
        return repository.findByValue(value).orElse(null);
    }

    @GetMapping("/id")
    public Phrase getByInt() {
        return repository.findById(1).orElse(null);
    }

    @GetMapping("/list")
    public List<Phrase> getAllValues() {
        return repository.findByValueIsNotNull();
    }
}
