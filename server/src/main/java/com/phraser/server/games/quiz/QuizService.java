package com.phraser.server.games.quiz;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.phraser.server.phrase.PhraseRepository;
import com.phraser.server.phrase.object.Phrase;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.json.JSONParser;
import org.apache.tomcat.util.json.ParseException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.rmi.NoSuchObjectException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizService {
    private final PhraseRepository phraseRepository;
    private final QuizRepository quizRepository;

    private ArrayList<Phrase> pickNewAnswersSet(String userId) throws NoSuchObjectException, EmptyStackException {
        List<Phrase> userPhrases = phraseRepository.findByUserId(userId);
        List<Integer> alreadyUsedPhrases = quizRepository.findAll(userId);

        userPhrases =
            userPhrases
                .stream()
                .filter(item -> !alreadyUsedPhrases.contains(item.getId()))
                .collect(Collectors.toList());

        if (userPhrases.isEmpty())
            throw new NoSuchObjectException("This user doesn't have any phrases added yet.");

        if (userPhrases.size() < 4)
            throw new EmptyStackException();

        Set<Phrase> result = new HashSet<>();
        Random random = new Random();
        do result.add(
            userPhrases.get(
                random.nextInt(userPhrases.size())
            ).clone());
        while (result.size() < 4);

        return new ArrayList<>(result);
    }

    public QuizResponse pickAnotherQuiz(String userId) throws NoSuchObjectException, EmptyStackException {
        ArrayList<Phrase> response = pickNewAnswersSet(userId);
        Phrase correctAnswer = response.get(0);

        quizRepository.save(
            new Quiz(
                correctAnswer.getId(),
                correctAnswer.getUserId())
        );

        var game = quizRepository.findByPhraseId(correctAnswer.getId());

        if (game.isEmpty())
            throw new RuntimeException();

        Collections.shuffle(response);

        return new QuizResponse(
            response
                .stream()
                .map(Phrase::getDefinition)
                .collect(Collectors.toList()),
            game.get().getId(),
            correctAnswer.getValue(),
            userId
        );
    }

    public Phrase getCorrectAnswer(int gameId) throws NoSuchObjectException {
        var game = quizRepository.findById(gameId);
        if (game.isEmpty()) throw new NoSuchObjectException("No record of such a game.");

        var correctAnswer = phraseRepository.findById(game.get().getPhraseId());

        if (correctAnswer.isEmpty())
            throw new NoSuchObjectException("No record of such a phrase.");

        return correctAnswer.get();
    }

    public void finishQuizAndClear(String userId)  {
        JSONObject jsonObject = new JSONObject(userId);
        quizRepository.deleteByUserId(jsonObject.getString("userId"));
    }

}
