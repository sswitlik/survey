package ncdc.sas.entity;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Tag extends AbstractEntity {
	
	@ManyToMany(mappedBy = "tags")
	@JsonIgnore
	private Set<Event> events;
	
	@ManyToMany(mappedBy = "tags")
	@JsonIgnore
	private Set<Scheme> schemes;
	
	@Column(name = "name")
	private String name;
	
	private Tag(){
		super();
    }

	public Tag(String name, Set<Event> events, Set<Scheme> schemes) {
		this.name = name;
		this.events = events;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}	
	
	public Set<Event> getEvents() {
		return events;
	}
	
	public void setEvents(Set<Event> events) {
		this.events = events;
	}
	
	public Set<Scheme> getSchemes() {
		return schemes;
	}
	
	public void setSchemes(Set<Scheme> schemes) {
		this.schemes = schemes;
	}
}
