package server;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.List;

import algorithm.ChooseAlgorithm;
import database.MongoDatabase;
import entity.Question;
import ultilities.Tokenizer;

public class Server {
	private ServerSocket serverSocket;
	public static MongoDatabase mongoDatabase;
	public Server() {
		try {
			//FindQuestion findQuestion = new FindQuestion();
			Tokenizer tokenizer = new Tokenizer();
			tokenizer.getInstance();
			
			// Init Mongo Database
			mongoDatabase = new MongoDatabase();
			mongoDatabase.Connect();

			// Create Server
			this.serverSocket=new ServerSocket(2345);
			System.out.println("Server listenning on port 2345");
			while(true){
				
				Socket socket = serverSocket.accept();
				System.out.println(socket.getInetAddress().getAddress()+": Connected");
				Thread t = new ClientThread(socket);
				t.start();
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	}
	public static void main(String[] args) {
		Server server = new Server();
	}
}
