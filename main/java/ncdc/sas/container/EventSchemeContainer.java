package ncdc.sas.container;

import java.util.List;

import ncdc.sas.entity.Event;
import ncdc.sas.entity.Scheme;

public class EventSchemeContainer {
	List<Event> events;
	List<Scheme> schemes;
	
	public EventSchemeContainer() {
		super();
	}

	public EventSchemeContainer(List<Event> events, List<Scheme> schemes) {
		super();
		this.events = events;
		this.schemes = schemes;
	}

	public List<Event> getEvents() {
		return events;
	}

	public void setEvents(List<Event> events) {
		this.events = events;
	}

	public List<Scheme> getSchemes() {
		return schemes;
	}

	public void setSchemes(List<Scheme> schemes) {
		this.schemes = schemes;
	}
	
	
}
