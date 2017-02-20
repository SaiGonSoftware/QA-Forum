import java.awt.EventQueue;
import java.awt.TextArea;

import javax.swing.JFrame;
import javax.swing.JComboBox;
import javax.swing.JLabel;
import javax.swing.JTextField;
import javax.swing.JButton;
import javax.swing.JTextPane;

import algorithm.ChooseAlgorithm;
import algorithm.QuestionSimilariry_1_Gram;
import algorithm.QuestionSimilariry_2_Gram;
import database.MongoDatabase;
import entity.Question;
import ultilities.Tokenizer;

import javax.swing.JTextArea;
import java.awt.Color;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.List;
import java.awt.event.ActionEvent;
import java.awt.Font;

public class MainWindow {

	private JFrame frame;
	private ChooseAlgorithm chooseAlgorithm;
	private List<Question> listQuestion;
	private MongoDatabase mongoDatabase;
	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					MainWindow window = new MainWindow();
					window.frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the application.
	 */
	public MainWindow() {
		// Init Tokenizer
		Tokenizer tokenizer = new Tokenizer();
		tokenizer.getInstance();
		
		// Init Mongo Database
		mongoDatabase = new MongoDatabase();
		mongoDatabase.Connect();
		listQuestion= mongoDatabase.getAllQuestion();
		
		initialize();
		
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frame = new JFrame();
		frame.setBounds(100, 100, 529, 474);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().setLayout(null);
		
		final JComboBox comboBox = new JComboBox();
		comboBox.setBounds(180, 36, 248, 20);
		comboBox.addItem("QuestionSimilarity 1-gram");
		comboBox.addItem("QuestionSimilarity 2-gram");
		frame.getContentPane().add(comboBox);
		
		JLabel lblChooseAlgorithm = new JLabel("Choose Algorithm: ");
		lblChooseAlgorithm.setBounds(29, 39, 139, 14);
		frame.getContentPane().add(lblChooseAlgorithm);
		
		JLabel lblNewLabel = new JLabel("Input Question: ");
		lblNewLabel.setBounds(29, 78, 141, 14);
		frame.getContentPane().add(lblNewLabel);
		
		final JTextArea textArea = new JTextArea();
		textArea.setFont(new Font("Arial", Font.PLAIN, 13));
		textArea.setBackground(Color.LIGHT_GRAY);
		textArea.setLineWrap(true);
		textArea.setRows(10);
		textArea.setBounds(180, 73, 248, 241);
		frame.getContentPane().add(textArea);
		
		JButton btnFindSimilarity = new JButton("Find Question");
		btnFindSimilarity.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				List<Question> questionFinded= mongoDatabase.findQuestion(textArea.getText());
				if(comboBox.getSelectedIndex()==0){
					chooseAlgorithm= new ChooseAlgorithm(listQuestion, new QuestionSimilariry_1_Gram());
					chooseAlgorithm.excuteAlgorithm(textArea.getText());
				}
				if(comboBox.getSelectedIndex()==1){
					chooseAlgorithm= new ChooseAlgorithm(listQuestion, new QuestionSimilariry_2_Gram());
					chooseAlgorithm.excuteAlgorithm(textArea.getText());
				
				}
			}
		});
		btnFindSimilarity.setBounds(312, 363, 116, 23);
		frame.getContentPane().add(btnFindSimilarity);
		
	
	}
}
