package ultilities;

import vn.hus.nlp.tokenizer.VietTokenizer;

public class Tokenizer {
	public static VietTokenizer vietTokenizer;
	public void getInstance(){
		vietTokenizer= new VietTokenizer();
	}
}
