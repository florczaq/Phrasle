package com.phraser.server.games.quiz;

import com.phraser.server.phrase.object.Phrase;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
public class QuizGameResponse {
    @Getter
    private final List<Phrase> answers;
    @Getter
    private final int gameId;
}
