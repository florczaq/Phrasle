package com.phraser.server.phrase;

import com.phraser.server.exception.RecordAlreadyExistsException;
import com.phraser.server.phrase.object.Phrase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/v1/phrase")
public class PhraseController {
    private final PhraseService service;

    @GetMapping("/amount")
    public long getNumberOfRecords(@RequestParam(name = "u") String userId) {
        return service.getAllUserPhrases(userId).size();
    }

    @GetMapping("/list")
    public List<Phrase> getAllValues(@RequestParam(name = "u") String uid) {
        return service.getAllPhrasesAsc(uid);
    }

    @GetMapping("/random")
    public Phrase getUserRandomPhrase(@RequestParam(name = "u") String userId) {
        return service.getUserRandomPhrase(userId);
    }

    @PostMapping("/add")
    public ResponseEntity<HttpStatus> addNewPhrase(@RequestBody Phrase phrase) {
        try {
            service.addNewPhrase(phrase);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (RecordAlreadyExistsException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<HttpStatus> deletePhrase(@RequestBody Phrase phrase) {
        try {
            service.deletePhrase(phrase);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

}

