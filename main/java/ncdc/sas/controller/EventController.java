package ncdc.sas.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.websocket.Session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ncdc.sas.entity.Tag;
import ncdc.sas.entity.Event;
import ncdc.sas.entity.Scheme;
import ncdc.sas.container.EventSchemeContainer;
import ncdc.sas.entity.AnswerMask;
import ncdc.sas.entity.OpinionOption;
import ncdc.sas.entity.OpinionCounter;

import ncdc.sas.repository.TagRepository;
import ncdc.sas.repository.EventRepository;
import ncdc.sas.repository.SchemeRepository;
import ncdc.sas.repository.AnswerMaskRepository;

@RestController
@RequestMapping("event")
public class EventController {

	@Autowired
	EventRepository repository;
	
	@Autowired
	AnswerMaskRepository maskRepo;
	
	@Autowired
	TagRepository tagRepo;
			
	@Autowired
	SchemeRepository schemeRepo;
	
	@PersistenceContext
    private EntityManager em;
	
	private boolean removeEvent;
	
	@PostMapping("/create")
	public void saveEventInDatabase(@RequestBody Event event) {
		
		//Create AnswerMask
		event.createMask();
		maskRepo.save(event.getAnswerMask());
		
		Set<Tag> tagList = new HashSet();
	
		event.getTags().stream().forEach(tag -> {
			Tag tagOp = tagRepo.findOne(tag.getId());
			tagList.add(tagOp);
		});
		
		event.setTags(tagList);
		
		repository.save(event);
	}

	@PostMapping("/update")
	public void updateEventInDatabase(@RequestBody Event event) {

		Event editedEvent = repository.findOne(event.getId());
		editedEvent.setTitle(event.getTitle());
		editedEvent.setDesc(event.getDesc());
		editedEvent.setTags(event.getTags());
		editedEvent.setFrom(event.getFrom());
		editedEvent.setTo(event.getTo());
		editedEvent.setEventTemplate(event.getEventTemplate());

		repository.save(editedEvent);

	}

	@PostMapping("/delete")
	public void deleteEventFromDatabase(@RequestBody Event event) {
		repository.delete(event);
	}
	
	@RequestMapping("/list")
	public List<Event> findAllEvents() {

		return repository.findAll();
	}

	@RequestMapping("/list/{id}")
	public Event findEventById(@PathVariable("id") Long id) {

		return repository.findOne(id);
	}
	
	@RequestMapping("/list/active")
	public List<Event> findActiveEvents() {
		
		Date date = new Date();
		
		String jpql = "SELECT event FROM Event event WHERE event.from < :current_date AND event.to > :current_date";
		TypedQuery<Event> query = em.createQuery(jpql, Event.class);
		query.setParameter("current_date", date);
		List<Event> activeEvents = query.getResultList();
		

		activeEvents.addAll(generateEventsFromSchemes(date));
		
		return activeEvents;
	}
	

	@PostMapping("/list/tags")
	public List<Event> findEventByTags(@RequestBody List<String> names) {
		List<Event> events = repository.findEventsByTags(names);
		List<Integer> eventsToRemove = new ArrayList<Integer>();
		events.stream().forEach(event -> {
			names.stream().forEach(name -> {
				removeEvent = true;
				for (Tag tag : event.getTags()) {
					if (tag.getName().equals(name)) {
						removeEvent = false;
					}
				}

				if (removeEvent == true) {
					eventsToRemove.add(events.indexOf(event));
				}
			});
		});

		for (int i = 0; i < eventsToRemove.size(); i++) {
			events.remove(eventsToRemove.get(i).intValue() - i);

		}

		return events;

	}
	
	
	@RequestMapping("/scheme/list/active/{from}/{to}")
	public EventSchemeContainer findActiveInPeriod(@PathVariable("from") Long from, @PathVariable("to") Long to) {

		Date fromDate = new Date(from);
		Date toDate = new Date(to);

		List<Event> list = repository.findAll(); 
		String jpql = "SELECT event FROM Event event WHERE event.to > :from AND event.from < :to AND event.scheme IS NULL";

		TypedQuery<Event> eventQuery = em.createQuery(jpql, Event.class);
		eventQuery.setParameter("from", fromDate);
		eventQuery.setParameter("to", toDate);
		List<Event> eventResult = eventQuery.getResultList();
		
		jpql = "SELECT scheme FROM Scheme scheme WHERE scheme.to > :from AND scheme.from < :to";
		TypedQuery<Scheme> schemeQuery = em.createQuery(jpql, Scheme.class);
		schemeQuery.setParameter("from", fromDate);
		schemeQuery.setParameter("to", toDate);
		List<Scheme> schemeResult = schemeQuery.getResultList();

		EventSchemeContainer result = new EventSchemeContainer(eventResult, schemeResult);
		return result;
	}
	
	private List<Event> generateEventsFromSchemes(Date date) {
		List<Event> result = new ArrayList<>();
		
		List<Event> events = new ArrayList<>();
		List<Scheme> schemes = schemeRepo.findAll();
		for (Scheme scheme : schemes) {
			events = scheme.generateNewEvents(date);
			scheme.setEvents(events);
			schemeRepo.save(scheme);
			for (Event event : events) {
				event.setScheme(scheme);
				event.createMask();
				maskRepo.save(event.getAnswerMask());
				repository.save(event);
				
				result.add(event);
			}
		}
		return result;
	}
}

