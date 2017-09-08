package ncdc.sas.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class AnswerUser extends AbstractEntity {

	@ManyToOne
	@JoinColumn(name = "opinion_option_unique_id")
	private OpinionOption opinionOption;
	
	@ManyToOne
	@JoinColumn(name = "event_id")
	private Event event;
	
	@Column(name = "user_id")
	private String userID;

	@Column(name = "comment")
	private String comment;
	
	public AnswerUser() {
		super();
	}

	public String getUserID() {
		return userID;
	}
	
	public void setUserID(String user) {
		this.userID = user;
	}

	public OpinionOption getOpinionOption() {
		return opinionOption;
	}
	
	public void setOpinionOption(OpinionOption opinionOption) {
		this.opinionOption = opinionOption;
	}	

	public Event getEvent() {
		return event;
	}

	public void setEvent(Event event) {
		this.event = event;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	/*	
	@ManyToOne
	@JoinColumn(name = "opinion_option_unique_id")
	public OpinionOption getOpinionOption() {
		return opinionOption;
	}

	@ManyToOne
	@JoinColumn(name = "event_id")
	public Event getEvent() {
		return event;
	}
	*/	
}
