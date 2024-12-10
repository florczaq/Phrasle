package com.phraser.server.phrase;

import com.phraser.server.exception.RecordAlreadyExistsException;
import com.phraser.server.phrase.object.Phrase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.NoSuchElementException;
import java.util.List;
import java.util.Optional;

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
    public List<Phrase> getAllValues(@RequestParam(name = "u") String uid, @RequestParam(required = false, name = "s") Optional<Boolean> starred, @RequestParam(name = "gid") int groupId) {
        if (starred.isEmpty()) return service.getAllUserPhrasesByGroup(uid, groupId);
        return service.getAllUserPhrasesByGroup(uid, starred.get(), groupId);
    }

    @GetMapping("/list/all")
    public List<Phrase> getAllValues(@RequestParam(name = "u") String uid, @RequestParam(required = false, name = "s") Optional<Boolean> starred) {
        if (starred.isEmpty()) return service.getAllPhrasesAsc(uid);
        return service.getAllUserPhrases(uid, starred.get());
    }

    @GetMapping("/list/shuffle")
    public List<Phrase> getAllValuesShuffled(@RequestParam(name = "u") String uid, @RequestParam(required = false, name = "s") Optional<Boolean> starred,@RequestParam(name = "gid") int groupId) {
        List<Phrase> response;
        System.out.println(groupId);
        response = starred.isEmpty() ? service.getAllUserPhrasesByGroup(uid, groupId) : service.getAllUserPhrasesByGroup(uid, starred.get(), groupId);
        Collections.shuffle(response);
        return response;
    }

    @GetMapping("/list/all/shuffle")
    public List<Phrase> getAllValuesShuffled(@RequestParam(name = "u") String uid, @RequestParam(required = false, name = "s") Optional<Boolean> starred) {
        List<Phrase> response;
        response = starred.isEmpty() ? service.getAllPhrasesAsc(uid) : service.getAllUserPhrases(uid, starred.get());
        Collections.shuffle(response);
        return response;
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

    @PutMapping("/edit")
    public ResponseEntity<HttpStatus> editPhrase(@RequestBody Phrase phrase) {
        service.editPhrase(phrase);
        return ResponseEntity.ok().build();
    }
}

