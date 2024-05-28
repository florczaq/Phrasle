package com.phraser.server.games.quiz;

import com.phraser.server.phrase.object.Phrase;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
public class QuizResponse {
    @Getter
    private final List<String> answers;
    @Getter
    private final int gameId;
    @Getter
    private final String question;
    @Getter
    private final String userId;
}
