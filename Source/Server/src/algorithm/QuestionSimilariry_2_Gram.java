package algorithm;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import entity.Question;
import ultilities.Tokenizer;

public class QuestionSimilariry_2_Gram implements Algorithm {
	public double measure_2_gram(String q1, String q2){
		q1= q1.toLowerCase();
		q1= Tokenizer.vietTokenizer.segment(q1);
		q2= q2.toLowerCase();
		q2= Tokenizer.vietTokenizer.segment(q2);
		String[] arrQ1= q1.split(" ");
		String[] arrQ2= q2.split(" ");
		List<String> list_2_gram_q1= new ArrayList<>();
		List<String> list_2_gram_q2= new ArrayList<>();
		List<String> wordMatches = new ArrayList<>();
		for(int i=0; i<arrQ1.length-1; i++){
			list_2_gram_q1.add(arrQ1[i]+ " "+ arrQ1[i+1]);
		}
		for(int i=0; i<arrQ2.length-1; i++){
			list_2_gram_q2.add(arrQ2[i]+ " "+ arrQ2[i+1]);
		}
		for(String s1: list_2_gram_q1){
			for(String s2: list_2_gram_q2){
				if(s1.equals(s2)) wordMatches.add(s1);
			}
		}
		double score= (double)2*wordMatches.size()/ (list_2_gram_q1.size()+ list_2_gram_q2.size());
		return score;
	}
	@Override
	public List<Question> findSimilarityQuestion(List<Question> listQuestion, String q) {
		List<Question> temp = new ArrayList<>();
		System.out.println("Question input: "+q);
		double score=0;

		for(Question s: listQuestion){
			
			double currentScore= measure_2_gram(q, s.getContent());
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
