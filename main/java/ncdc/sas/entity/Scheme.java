package ncdc.sas.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.springframework.beans.factory.annotation.Autowired;

import ncdc.sas.repository.EventRepository;

@Entity
public class Scheme extends AbstractEntity {

	private final static long DAY = 86400000;
	
	@OneToMany(mappedBy = "scheme", cascade = CascadeType.ALL)
	private List<Event> events;
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "scheme_tags", joinColumns = @JoinColumn(name = "scheme_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id"))
	private Set<Tag> tags;

	@ManyToOne
	@JoinColumn(name = "template_id")
	private Template template;
		
	@Column(name = "title")
	private String title;
	
	@Column(name = "fromScheme")
	private Date from;
	
	@Column(name = "toScheme")
	private Date to;

	@Column(name = "firstStop")
	private Date firstStop;
	
	@Column(name = "description")
	private String desc;

	@Column(name = "daysForEvent")
	private int daysForEvent;
	
	@Column(name = "interval")
	private int interval;

	@ElementCollection
	private List<Integer> disabledWeekDays;
	
	@ElementCollection
	private List<Date> disabledStartDays;
	
	private boolean isDayInScheme(Date actual) {
		
		if (actual.before(from) || actual.after(to))
			return false;

		for (Date date : disabledStartDays) {
			if (actual.getYear() == date.getYear() && actual.getMonth() == date.getMonth() && actual.getDate() == date.getDate())
				return false;
		}
		
		for (Integer day : disabledWeekDays) {
			if (actual.getDay() == day)
				return false;
		}
		
		return true;
	}
	
	private boolean isEventInDay(Date actual) {
		for (Event event : events) {
			if ( event.getFrom().getDay() == actual.getDay())
				return true;
		}
		return false;
	}

	private boolean isDateInInterval(Date actual) {
		//isDayInScheme() needed but this method is always working with 
		
		long milisecondsFromStart = actual.getTime() - from.getTime();
		int daysFromStart = (int)(milisecondsFromStart / DAY + 1);
		
		int disabledDaysNumber = (daysFromStart / 7) * disabledWeekDays.size();
		int currentWeekDay = actual.getDay();
		for (int i = 0; i < daysFromStart % 7; i++) {
			if (disabledWeekDays.contains(currentWeekDay))
				disabledDaysNumber++;
			
			currentWeekDay--;
			if (currentWeekDay < 0)
				currentWeekDay = 6;
		}
		
		for (Date date : disabledStartDays) {
			if ( date.before(actual) && date.after(from))
				disabledDaysNumber++;
		}
		
		int daysFromStartWithoutDisabled = daysFromStart - disabledDaysNumber;
		if ((daysFromStartWithoutDisabled - 1) % interval == 0)
			return true;
		else
			return false;
	}

	private boolean isDateBetween(Date check, Date start, Date stop) {
		return check.after(start) && check.before(stop);
	}

	private boolean canMakeEvent(Date actual, Date startEvent, Date stopEvent) {
		return isDateBetween(actual, startEvent, stopEvent) &&
			   isDayInScheme(startEvent) &&
			   !isEventInDay(startEvent) &&
			   isDateInInterval(startEvent);
	}

	public List<Event> generateNewEvents(Date actual) {
		long time = this.firstStop.getTime() - this.from.getTime();
		List<Event> result = new ArrayList<>();
		for (int i=0; i <= daysForEvent; i++) {
			
			Date startEvent = new Date(actual.getTime());
				startEvent.setHours(from.getHours());
				startEvent.setMinutes(from.getMinutes());
				startEvent.setSeconds(from.getSeconds());
				startEvent.setTime(startEvent.getTime() - DAY*i);
			
			Date stopEvent = new Date(startEvent.getTime() + time);
			
			if( actual.after(startEvent) && actual.before(stopEvent)	//check hours
				&& this.isDayInScheme(startEvent) 		//check day in exceptions
				&& !isEventInDay(startEvent)			//check if event is already exist
				&& isDateInInterval(startEvent)) {
					result.add(new Event(this.getTitle(), this.getDesc(), startEvent, stopEvent, this.getEventTemplate(), this.tags));
			}
		}
		return result;
	}

	public Scheme() {
		super();
		events = new ArrayList<>();
		this.tags = tags;
	}
	
	public Scheme(List<Event> events, Template template, String title, Date start, Date stop,
			Date firstStop, String desc, List<Integer> disabledWeekDays, List<Date> disabledDays, int interval, Set<Tag> tags) {
		super();
		this.events = events;
		this.template = template;
		this.title = title;
		this.from = start;
		this.to = stop;
		this.desc = desc;
		this.firstStop = firstStop;
		this.disabledWeekDays = disabledWeekDays;
		this.disabledStartDays = disabledDays;
		this.daysForEvent = firstStop.getDay() - start.getDay();
		this.interval = interval;
		this.tags = tags;
	}

	//------------------------------------------------------------------------------------------
	public List<Event> getEvents() {
		return events;
	}

	public void setEvents(List<Event> events) {
		this.events = events;
	}

	public Template getEventTemplate() {
		return template;
	}

	public void setEventTemplate(Template template) {
		this.template = template;
	}

	
	
	public List<Date> getDisabledStartDays() {
		return disabledStartDays;
	}

	public void setDisabledStartDays(List<Date> disabledStartDays) {
		this.disabledStartDays = disabledStartDays;
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

	public int getInterval() {
		return interval;
	}

	public void setInterval(int interval) {
		this.interval = interval;
	}
	
	public List<Integer> getDisabledWeekDays() {
		return disabledWeekDays;
	}

	public void setDisabledWeekDays(List<Integer> disabledWeekDays) {
		this.disabledWeekDays = disabledWeekDays;
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

	public Date getFirstStop() {
		return firstStop;
	}

	public void setFirstStop(Date firstStop) {
		this.firstStop = firstStop;
	}

	public int getDaysForEvent() {
		return daysForEvent;
	}

	public void setDaysForEvent(int daysForEvent) {
		this.daysForEvent = daysForEvent;
	}
	
	public Set<Tag> getTags() {
		return tags;
	}
	
	public void setTags(Set<Tag> tags) {
		this.tags = tags;
	}
}
