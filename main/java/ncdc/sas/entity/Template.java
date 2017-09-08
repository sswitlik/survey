package ncdc.sas.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
public class Template extends AbstractEntity {

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "template_opinion_options", joinColumns = @JoinColumn(name = "template_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "opinion_options_id", referencedColumnName = "id"))
	private Set<OpinionOption> opinionOptions;

	@Column(name = "name")
	private String name;


//--------------------------------------------------------------------------------
	public Template() {
	}

	public Template(String name) {
		this.name = name;

	}
	public Template(String name, Set<OpinionOption> opinionOptions) {
		this.name = name;
		this.opinionOptions = opinionOptions;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	public Set<OpinionOption> getOpinions() {
		return opinionOptions;
	}
	
	public void setOpinions(Set<OpinionOption> opinionOptions) {
		this.opinionOptions = opinionOptions;
	}

}
