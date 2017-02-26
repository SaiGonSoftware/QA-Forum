package algorithm;

import java.util.List;

import entity.Question;

public interface Algorithm {
	List<Question> findSimilarityQuestion(List<Question> listQuestion, String q);
}
