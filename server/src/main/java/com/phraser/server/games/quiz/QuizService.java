package com.phraser.server.games.quiz;

import com.phraser.server.phrase.PhraseRepository;
import com.phraser.server.phrase.object.Phrase;
import lombok.RequiredArgsConstructor;
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

        if (userPhrases.isEmpty()) throw new NoSuchObjectException("This user doesn't have any phrases added yet.");

        if(userPhrases.size()<4) throw new EmptyStackException();

        Set<Phrase> result = new HashSet<>();
        Random random = new Random();

        do result.add(userPhrases.get(random.nextInt(userPhrases.size())).clone()); while (result.size() < 4);

        return new ArrayList<>(result);
    }

    public QuizGameResponse pickAnotherQuiz(String userId) throws NoSuchObjectException, EmptyStackException {
        ArrayList<Phrase> response = pickNewAnswersSet(userId);
        //TEMPORARY
        while (quizRepository.findByPhraseId(response.get(0).getId()).isPresent()) {
            System.out.println(response.get(0).getId());
            response = pickNewAnswersSet(userId);
        }
        //TEMPORARY

        Phrase correctAnswer = response.get(0);

        quizRepository.save(new Quiz(correctAnswer.getId(), correctAnswer.getUserId()));
        var game = quizRepository.findByPhraseId(correctAnswer.getId());

        if (game.isEmpty()) throw new RuntimeException();

        Collections.shuffle(response);

        return new QuizGameResponse(response, game.get().getId());
    }

    public Phrase getCorrectAnswer(int gameId) throws NoSuchObjectException {
        var game = quizRepository.findById(gameId);
        if (game.isEmpty()) throw new NoSuchObjectException("No record of such a game.");

        var correctAnswer = phraseRepository.findById(game.get().getPhraseId());
        if (correctAnswer.isEmpty()) throw new NoSuchObjectException("No record of such a phrase.");

        return correctAnswer.get();
    }

}
