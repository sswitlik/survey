package ncdc.sas.entity;

import java.util.Set;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class OpinionOption extends AbstractEntity {

	@ManyToMany(mappedBy = "opinionOptions")
	@JsonIgnore
	private Set<Template> templates;
	
	@Column(name = "value")
	int value;

	@Column(name = "unique_id")
	String uniqueId;
	
	@Column(name = "description")
	String description;
	
	@ManyToOne
	@JoinColumn(referencedColumnName = "id")
	OpinionType type;
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setType(OpinionType type) {
		this.type = type;
	}

	public OpinionOption() {
		super();
	}
	
	public OpinionOption(int value, OpinionType type, Set <Template> templates, String description) {
		this.value = value;
		this.type = type;
		this.templates = templates;
		this.description = description;
	}

	public int getValue() {
		return value;
	}

	public void setValue(int value) {
		this.value = value;
	}

	public String getUniqueId() {
		return uniqueId;
	}

	public void setUniqueId(String uniqueId) {
		this.uniqueId = uniqueId;
	}

	public OpinionType getType() {
		return type;
	}

	public Set<Template> getTemplates() {
		return templates;
	}
	
	public void setTemplates(Set<Template> templates) {
		this.templates = templates;
	}
   

}