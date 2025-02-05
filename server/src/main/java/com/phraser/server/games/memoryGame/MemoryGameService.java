package com.phraser.server.games.memoryGame;

import com.phraser.server.phrase.PhraseService;
import com.phraser.server.phrase.object.Phrase;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemoryGameService {
    private final PhraseService phraseService;

    public List<Phrase> getNewSet(MemoryGameRequest request) {
        List<Phrase> phrases = phraseService.getAllUserPhrasesByGroup(request.getUserId(), request.isStarred(), request.getGroupId());
        Collections.shuffle(phrases);
        System.out.println(request.getMaxAmount());
        return phrases.subList(0, Math.min(phrases.size(), request.getMaxAmount()));
    }
}
