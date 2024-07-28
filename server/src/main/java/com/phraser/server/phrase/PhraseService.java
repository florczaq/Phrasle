package com.phraser.server.phrase;

import com.phraser.server.exception.RecordAlreadyExistsException;
import com.phraser.server.phrase.object.Phrase;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class PhraseService {
    private final PhraseRepository repository;


    public List<Phrase> getAllPhrasesAsc(String uid) {
        return repository.findByUserIdOrderByValue(uid);
    }

    public Phrase getUserRandomPhrase(String userId) {
        List<Phrase> phrases = repository.findByUserId(userId);
        return repository.findByUserId(userId).get(new Random().nextInt(phrases.size()));
    }

    public void addNewPhrase(Phrase phrase) throws RecordAlreadyExistsException, IllegalArgumentException {
        if (repository.findByValueAndUserId(phrase.getValue(), phrase.getUserId()).isPresent())
            throw new RecordAlreadyExistsException();
        if (phrase.getUserId().length() < 36)
            throw new IllegalArgumentException();
        repository.save(phrase);
    }

    public List<Phrase> getAllUserPhrases(String userId) {
        return repository.findByUserId(userId);
    }

    public void deletePhrase(Phrase phrase) {
        if (repository.findById(phrase.getId()).isEmpty())
            throw new NoSuchElementException();
        repository.deletePhrase(phrase.getId());
    }
}
