package algorithm;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import entity.Question;
import ultilities.Tokenizer;
import vn.hus.nlp.tokenizer.VietTokenizer;

public class QuestionSimilariry_1_Gram implements Algorithm {

	private double measure_1_gram(String q1, String q2){
		q1= q1.toLowerCase();
		q1= Tokenizer.vietTokenizer.segment(q1);
		q2= q2.toLowerCase();
		q2= Tokenizer.vietTokenizer.segment(q2);
		String[] arrQ1= q1.split(" ");
		String[] arrQ2= q2.split(" ");
		List<String> wordMatches= new ArrayList<>();
		for(int i=0; i< arrQ1.length; i++){
			for(int j=0; j< arrQ2.length; j++){
				if(arrQ1[i].equals(arrQ2[j])) wordMatches.add(arrQ1[i]);
			}
		}
		double result= (double)2* wordMatches.size()/(arrQ1.length+ arrQ2.length);
		return result;
	}
	@Override
	public List<Question> findSimilarityQuestion(List<Question> listQuestion, String q) {
		List<Question> temp = new ArrayList<>();
		//q.toLowerCase();
		//q= Tokenizer.vietTokenizer.segment(q);
		System.out.println("Question input: "+q);
		double score=0;

		for(Question s: listQuestion){
			
			double currentScore= measure_1_gram(q, s.getContent());
			s.setScore(currentScore);
			if(currentScore>score){
				score= currentScore;
	
			}
		}
		
	
		Collections.sort(listQuestion);
		int count=0;
		for(int i= listQuestion.size()-1; i>=0;i--){
			count++;
			if(count==4) break;
			temp.add(listQuestion.get(i));
			System.out.println(listQuestion.get(i).getScore()+" "+listQuestion.get(i).getContent());
		}
		System.out.println("=========================================");
		return temp;
	}

}
