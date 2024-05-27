package com.phraser.server.games.quiz;

import com.phraser.server.phrase.PhraseRepository;
import com.phraser.server.phrase.object.Phrase;
import lombok.RequiredArgsConstructor;
import org.hibernate.boot.model.naming.CamelCaseToUnderscoresNamingStrategy;
import org.springframework.stereotype.Service;

import java.rmi.NoSuchObjectException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class QuizService {
    private final PhraseRepository phraseRepository;
    private final QuizRepository quizRepository;

    private Phrase[] shuffle(Phrase[] array) {
        Random random = new Random();
        Phrase temp;
        for (int i = 0, index = 0; i < array.length; i++) {
            temp = array[i].clone();
            index = random.nextInt(array.length);
            array[i] = array[index].clone();
            array[index] = temp.clone();
        }
        return array;
    }

    public List<Phrase> pickNewAnswersSet(String userId) throws NoSuchObjectException {
        List<Phrase> userPhrases = phraseRepository.findByUserId(userId);
        if (userPhrases.isEmpty()) throw new NoSuchObjectException("This user doesn't have any phrases added yet.");

        Set<Phrase> result = new HashSet<>();
        Random random = new Random();

        do result.add(userPhrases.get(random.nextInt(userPhrases.size())).clone()); while (result.size() < 4);
        return result.stream().toList();
    }

    public QuizGameResponse pickAnotherQuiz(String userId) throws NoSuchObjectException {
        var response = pickNewAnswersSet(userId);
        quizRepository.save(new Quiz(response.get(0).getId(), response.get(0).getUserId()));
        var game = quizRepository.findByPhraseId(response.get(0).getId());
        if (game.isEmpty()) return new QuizGameResponse(new ArrayList<Phrase>(), -1);
        return new QuizGameResponse(response, 1);
    }

    public Phrase getCorrectAnswer(int gameId) throws NoSuchObjectException {
        var game = quizRepository.findById(gameId);
        if (game.isEmpty())
            throw new NoSuchObjectException("No record of such a game.");
        var correctAnswer = phraseRepository.findById(game.get().getPhraseId());

        if (correctAnswer.isEmpty())
            throw new NoSuchObjectException("No record of such a phrase.");
        return correctAnswer.get();
    }

}
