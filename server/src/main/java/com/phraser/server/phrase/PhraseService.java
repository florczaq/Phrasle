package com.phraser.server.phrase;

import com.phraser.server.exception.RecordAlreadyExistsException;
import com.phraser.server.phrase.object.Phrase;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class PhraseService {
    private final PhraseRepository repository;

    public Phrase getPhrase(String value) {
        return repository.findByValue(value).orElse(null);
    }

    public Phrase getPhrase(int id) {
        return repository.findById(id).orElse(null);
    }

    public List<Phrase> getAllPhrases() {
        return repository.findByValueIsNotNullOrderByValue();
    }

    public Phrase getUserRandomPhrase(String userId) {
        List<Phrase> phrases = repository.findByUserId(userId);
        return repository.findByUserId(userId).get(new Random().nextInt(phrases.size()));
    }

    public void addNewPhrase(Phrase phrase) throws RecordAlreadyExistsException, IllegalArgumentException {
        if (repository.findByValue(phrase.getValue()).isPresent())
            throw new RecordAlreadyExistsException();
        if (phrase.getUserId().length() < 36)
            throw new IllegalArgumentException();
        repository.save(phrase);
    }
}
