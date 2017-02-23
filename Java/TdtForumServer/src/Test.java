

import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.util.List;

import database.MongoDatabase;
import entity.Question;
import opennlp.maxent.Main;

public class Test {
	public static void main(String[] args) {
		MongoDatabase database= new MongoDatabase();
		database.Connect();
		List<Question> temp = database.getAllQuestion();
	
		Writer out;
		try {
			out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream("question.txt"), "UTF-8"));
			for(Question q : temp){
				System.out.println(q.getContent());
				 out.write(q.getContent()+"\n");
				 
				
			}
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} 
			
		
	}
}
