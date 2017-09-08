package ncdc.sas.entity;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import javax.persistence.Table;
import javax.swing.SpringLayout.Constraints;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.annotation.JsonIgnore;

import ncdc.sas.repository.AnswerMaskRepository;


@Entity
public class Event extends AbstractEntity {

	@Autowired
	static AnswerMaskRepository answerMaskRepo; 
	
	@ManyToOne
	@JoinColumn(name = "scheme")
	@JsonIgnore
	private Scheme scheme;
	
	@ManyToOne
	@JoinColumn(name = "template_id")
	private Template template;
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "event_tags", joinColumns = @JoinColumn(name = "event_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id"))
	private Set<Tag> tags;

	@Column(name = "title")
	private String title;

	@Column(name = "description")
	private String desc;

	@Column(name = "start_date")
	private Date from;

	@Column(name = "end_date")
	private Date to;
	
	@OneToOne
	@JoinColumn(name = "mask_id")
	private AnswerMask answerMask;

	public void createMask() {
		AnswerMask answer = new AnswerMask();
		this.setAnswerMask(answer);
	}
	
	public Event() {
		super();
	}	
	
	public Event(Scheme scheme, String title) {
		super();
		this.scheme = scheme;
		this.title = title;
	}

	
	
	
		
	public Event(String title, String desc,  Date from, Date to, Template template, Set<Tag> tags) {
		super();
		this.template = template;
		this.title = title;
		this.desc = desc;
		this.tags = tags;
		this.from = from;
		this.to = to;
		this.template = template;
		tags.stream().findAny();
	}
	
	public void incrementOpinion(String opinionUniqueId) {
		answerMask.incrementOpinion(opinionUniqueId);
	}
	

	public void saveComment(String comment) {
		answerMask.saveComment(comment);
	}
	
	public AnswerMask getAnswerMask() {
		return answerMask;
	}
	
	public void setAnswerMask(AnswerMask answerMask) {
		this.answerMask = answerMask;
	}

	public Template getEventTemplate() {
		return template;
	}

	public void setEventTemplate(Template template) {
		this.template = template;
	}	

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public Set<Tag> getTags() {
		return tags;
	}
	
	public void setTags(Set<Tag> tags) {
		this.tags = tags;
	}

	public Date getFrom() {
		return from;
	}

	public void setFrom(Date from) {
		this.from = from;
	}

	public Date getTo() {
		return to;
	}

	public void setTo(Date to) {
		this.to = to;
	}
	
	public Scheme getScheme() {
		return scheme;
	}

	public void setScheme(Scheme scheme) {
		this.scheme = scheme;
	}

	public Template getTemplate() {
		return template;
	}

	public void setTemplate(Template template) {
		this.template = template;
	}
	

}
