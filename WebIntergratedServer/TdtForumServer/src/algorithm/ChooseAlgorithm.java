package algorithm;

import java.util.List;

import entity.Question;

public class ChooseAlgorithm {
	private Algorithm algorithm;
	List<Question> listQuestion;
	public ChooseAlgorithm(List<Question> listQuestion, Algorithm algorithm) {
		this.listQuestion=listQuestion;
		this.algorithm=algorithm;
	}
	public List<Question> excuteAlgorithm(String q){
		return algorithm.findSimilarityQuestion(listQuestion,q);
	}
}
