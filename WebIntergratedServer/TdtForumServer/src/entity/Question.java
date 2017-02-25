package entity;

public class Question implements Comparable<Question> {
	private Object _id;
	private Object CategoryId;
	private String UserQuestion;
	private String Title;
	private String Content;
	private double Score;
	public Object getCategoryId() {
		return CategoryId;
	}
	public void setCategoryId(Object categoryId) {
		CategoryId = categoryId;
	}
	public Object get_id() {
		return _id;
	}
	public void set_id(Object _id) {
		this._id = _id;
	}
	
	public String getUserQuestion() {
		return UserQuestion;
	}
	public void setUserQuestion(String userQuestion) {
		UserQuestion = userQuestion;
	}
	public String getTitle() {
		return Title;
	}
	public void setTitle(String title) {
		Title = title;
	}
	public String getContent() {
		return Content;
	}
	public void setContent(String content) {
		Content = content;
	}
	public double getScore() {
		return Score;
	}
	public void setScore(double score) {
		Score = score;
	}
	@Override
	public int compareTo(Question o) {
		return new Double(this.Score).compareTo(new Double(o.Score));
	}
	
}
