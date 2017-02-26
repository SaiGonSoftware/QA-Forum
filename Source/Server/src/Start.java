import java.util.List;

import algorithm.ChooseAlgorithm;
import algorithm.QuestionSimilariry_1_Gram;
import algorithm.QuestionSimilariry_2_Gram;
import database.MongoDatabase;
import entity.Question;
import ultilities.Tokenizer;

public class Start {

	public static void main(String[] args) {
		// Init Tokenizer
		Tokenizer tokenizer = new Tokenizer();
		tokenizer.getInstance();
		List<Question> listQuestion;
		// Init Mongo Database
		MongoDatabase mongoDatabase = new MongoDatabase();
		mongoDatabase.Connect();
		listQuestion= mongoDatabase.getAllQuestion();
		// Choose Algorithm
		ChooseAlgorithm chooseAlgorithm;
		chooseAlgorithm= new ChooseAlgorithm(listQuestion, new QuestionSimilariry_2_Gram());
		chooseAlgorithm.excuteAlgorithm("miễn học phí");
		
		/**Test measure 2 gram
		QuestionSimilariry_2_Gram findQuestion= new QuestionSimilariry_2_Gram();
		System.out.println(findQuestion.measure_2_gram("ngày mai tôi đi học", "ngày mai tôi đi làm")+"");
		*/
		
	}

}
