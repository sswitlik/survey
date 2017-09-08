package ncdc.sas.entity;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;


@Entity
public class AnswerMask extends AbstractEntity {

	@OneToMany(mappedBy = "answerMask", cascade = CascadeType.ALL)
	private List<OpinionCounter> opinionCounter;
	
	@OneToMany(mappedBy = "answerMask", cascade = CascadeType.ALL)
	private List<CommentOption> commentOption;
	
	String name;
	
	public void incrementOpinion(String opinionUniqueId) {
		for (OpinionCounter counter : opinionCounter) {
			if (counter.getOpinionUniqueId().equals(opinionUniqueId)) {
				counter.incrementCounter();
				return;
			}
		}
		OpinionCounter counter = new OpinionCounter(opinionUniqueId, this);
		counter.incrementCounter();
		opinionCounter.add(counter);
	}
	
	public void saveComment(String comment) {
		commentOption.add(new CommentOption(this, comment));
	}
	
	public List<OpinionCounter> getOpinionCounter() {
		return opinionCounter;
	}

	public void setOpinionCounter(List<OpinionCounter> opinionCounter) {
		this.opinionCounter = opinionCounter;
		
	}
	
	public List<CommentOption> getCommentOption() {
		return commentOption;
	}
	
	public void setCommentOption(List<CommentOption> commentOption) {
		this.commentOption = commentOption;
	}
}