package ncdc.sas.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class OpinionCounter extends AbstractEntity{
	
	@ManyToOne
	@JoinColumn(name = "answerMask")
	@JsonIgnore
	private AnswerMask answerMask;
	
	private Long opinionCounter = (long) 0;
	private String opinionUniqueId;
	
	public OpinionCounter(String opinionUniqueID, AnswerMask answerMask) {
		super();
		this.opinionCounter = (long) 0;
		this.opinionUniqueId = opinionUniqueID;
		this.answerMask = answerMask;
	}
	
	public OpinionCounter() {
		super();
	}

	public void incrementCounter() {
		opinionCounter++;
	}

//-------------------------------------------------------------
	public AnswerMask getAnswerMask() {
		return answerMask;
	}

	public void setAnswerMask(AnswerMask answerMask) {
		this.answerMask = answerMask;
	}

	public Long getOpinionCounter() {
		return opinionCounter;
	}

	public void setOpinionCounter(Long opinionCounter) {
		this.opinionCounter = opinionCounter;
	}

	public String getOpinionUniqueId() {
		return opinionUniqueId;
	}

	public void setOpinionUniqueId(String opinionUniqueId) {
		this.opinionUniqueId = opinionUniqueId;
	}



	
}