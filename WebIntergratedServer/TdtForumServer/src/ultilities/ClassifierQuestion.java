package ultilities;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

import edu.stanford.nlp.classify.Classifier;
import edu.stanford.nlp.classify.ColumnDataClassifier;
import edu.stanford.nlp.classify.LinearClassifier;
import edu.stanford.nlp.ling.Datum;
import edu.stanford.nlp.objectbank.ObjectBank;
import edu.stanford.nlp.util.ErasureUtils;

public class ClassifierQuestion {
	
	public static final String HOW="how";
	public static final String WHY="why";
	public static final String WHEN="when";
	public static final String WHERE="where";
	public static final String WHICH="which";
	public static final String YESNO="yesno";
	public static final String WHAT="what";
	
	ColumnDataClassifier cdc;
	Classifier<String,String> cl;
	public static void main(String[] args) throws Exception {
	   
	    ClassifierQuestion classifierQuestion= new ClassifierQuestion();
	    classifierQuestion.train();
	    classifierQuestion.classifier("Tại sao không đi học?");
	   // demonstrateSerialization();
	  }
	public void train(){
		 cdc = new ColumnDataClassifier("examples/question.prop");
		 cl =cdc.makeClassifier(cdc.readTrainingExamples("examples/question.train"));
	}
	public String classifier(String q){
		String line="what"+"\t"+q;
	    Datum<String,String> d = cdc.makeDatumFromLine(line);
	    String result= cl.classOf(d);
	    //System.out.println(q + "  ==>  " + result);
		return result;
	}
	  public static void demonstrateSerialization()
	    throws IOException, ClassNotFoundException {
	    System.out.println("Demonstrating working with a serialized classifier");
	    ColumnDataClassifier cdc = new ColumnDataClassifier("examples/cheese2007.prop");
	    Classifier<String,String> cl =
	        cdc.makeClassifier(cdc.readTrainingExamples("examples/cheeseDisease.train"));

	    // Exhibit serialization and deserialization working. Serialized to bytes in memory for simplicity
	    System.out.println(); System.out.println();
	    ByteArrayOutputStream baos = new ByteArrayOutputStream();
	    ObjectOutputStream oos = new ObjectOutputStream(baos);
	    oos.writeObject(cl);
	    oos.close();
	    byte[] object = baos.toByteArray();
	    ByteArrayInputStream bais = new ByteArrayInputStream(object);
	    ObjectInputStream ois = new ObjectInputStream(bais);
	    LinearClassifier<String,String> lc = ErasureUtils.uncheckedCast(ois.readObject());
	    ois.close();
	    ColumnDataClassifier cdc2 = new ColumnDataClassifier("examples/cheese2007.prop");

	    // We compare the output of the deserialized classifier lc versus the original one cl
	    // For both we use a ColumnDataClassifier to convert text lines to examples
	    for (String line : ObjectBank.getLineIterator("examples/cheeseDisease.test", "utf-8")) {
	      Datum<String,String> d = cdc.makeDatumFromLine(line);
	      Datum<String,String> d2 = cdc2.makeDatumFromLine(line);
	      System.out.println(line + "  =origi=>  " + cl.classOf(d));
	      System.out.println(line + "  =deser=>  " + lc.classOf(d2));
	    }
	  }
	  
}
