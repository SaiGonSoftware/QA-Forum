package database;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

import entity.Question;

public class MongoDatabase {
	private  MongoClient m;
	public  DB db;
	private Gson gson;
	DBCollection coll;
	public void Connect(){
		gson = new GsonBuilder().setLenient().serializeNulls().create();
		try{
			String textUri = "mongodb://nhatnguyen95:abc123@ds139937.mlab.com:39937/tdtforumdb";
			MongoClientURI uri = new MongoClientURI(textUri);
			m = new MongoClient(uri);
			db = m.getDB("tdtforumdb");
			coll = db.getCollection("questions");
			}
			catch (Exception e) {
				// TODO: handle exception
				 System.err.println( e.getClass().getName() + ": " + e.getMessage() );
			}
	}
	public List<Question> getAllQuestion(){
		List<String> listStringQuestion= new ArrayList<>();
		List<Question> listQuestion = new ArrayList<>();
		
        DBCursor cursor = coll.find();
        while (cursor.hasNext()) { 
        	String s = cursor.next().toString();
        	listStringQuestion.add(s);
        }

        for(String question :listStringQuestion){
        	Question q= gson.fromJson(question, Question.class);
        	q.set_id(removeLastChar(q.get_id().toString().substring(6)));
        	q.setCategoryId(removeLastChar(q.getCategoryId().toString().substring(6)));
        	listQuestion.add(q);
        }
        return listQuestion;
	}
	public List<Question> findQuestion(String question){
		
        List<Question> list = new ArrayList<>();

        DBCursor cursor = coll.find(new BasicDBObject("$text", new BasicDBObject("$search", question)))
        		.sort(new BasicDBObject("CreateDate",-1));
        while (cursor.hasNext()) {
            DBObject document = cursor.next();
            Question q = new Question();
            q.set_id(document.get("_id").toString());
            q.setCategoryId(document.get("CategoryId").toString());
            q.setUserQuestion((String) document.get("UserQuestion"));
            q.setTitle((String) document.get("Title"));
            q.setContent((String) document.get("Content"));
         
            list.add(q);
        }

        return list;

}
	
	private  String removeLastChar(String str) {
        return str.substring(0,str.length()-1);
    }
}
