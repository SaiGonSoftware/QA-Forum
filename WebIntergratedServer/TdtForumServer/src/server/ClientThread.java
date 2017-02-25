package server;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.Socket;
import java.util.List;

import algorithm.ChooseAlgorithm;
import algorithm.QuestionSimilariry_1_Gram;
import database.MongoDatabase;
import entity.Question;

public class ClientThread extends Thread{
	private ChooseAlgorithm chooseAlgorithm;
	private Socket socket;
	private InputStream is=null;
	private OutputStream os= null;
	int count=0;
	public ClientThread(Socket socket) {
		this.socket =socket;
		
		try {
			this.is = socket.getInputStream();
			this.os=socket.getOutputStream();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	@Override
	public void run() {
		try {
			String receiveMessage = inputStreamAsString();
			System.out.println(receiveMessage);
			count++;
			//System.out.println(count+" Question input:0"+ receiveMessage);
			// Find and filter list Question using Full text search
			List<Question> questionFinded= Server.mongoDatabase.findQuestion(receiveMessage);
			// Find type of question input
			String type =MongoDatabase.classifierQuestion.classifier(receiveMessage);
			System.out.println("Type of Question: "+type);
			// Filter List question base on type of message input
			questionFinded= Server.mongoDatabase.classifierQuestion(questionFinded, type);
			chooseAlgorithm = new ChooseAlgorithm(questionFinded, new QuestionSimilariry_1_Gram());
			List<Question> list= chooseAlgorithm.excuteAlgorithm(receiveMessage);
			sendMessage(list.get(0).get_id().toString()+","+list.get(1).get_id().toString()+","+list.get(2).get_id().toString());
			socket.close();
			this.stop();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public String inputStreamAsString() throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(is));
        StringBuilder sb = new StringBuilder();
        String line = null;

        while ((line = br.readLine()) != null) {
            sb.append(line + "?\n");
        }
        return sb.toString();
    }
	public void sendMessage(String message){
		try {
			os.write(message.getBytes());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
