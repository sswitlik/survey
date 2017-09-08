package ncdc.sas.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class CommentOption extends AbstractEntity{
	
	@ManyToOne
	@JoinColumn(name = "answerMask")
	@JsonIgnore
	private AnswerMask answerMask;
	
	private String commentOption;

	public CommentOption() {
		super();
	}
	
	public CommentOption(AnswerMask answerMask, String commentOption) {
		super();
		this.answerMask = answerMask;
		this.commentOption = commentOption;
	}

	public AnswerMask getAnswerMask() {
		return answerMask;
	}

	public void setAnswerMask(AnswerMask answerMask) {
		this.answerMask = answerMask;
	}

	public String getCommentOption() {
		return commentOption;
	}

	public void setCommentOption(String commentOption) {
		this.commentOption = commentOption;
	}
}
