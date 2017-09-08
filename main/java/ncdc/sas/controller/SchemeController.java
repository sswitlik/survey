package ncdc.sas.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ncdc.sas.container.EventSchemeContainer;
import ncdc.sas.entity.Event;
import ncdc.sas.entity.Scheme;
import ncdc.sas.entity.Tag;
import ncdc.sas.repository.EventRepository;
import ncdc.sas.repository.SchemeRepository;
import ncdc.sas.repository.TagRepository;

@Controller
@RestController
@RequestMapping("scheme")
public class SchemeController {

	@Autowired
	SchemeRepository repository;
	
	@Autowired
	TagRepository tagRepo;
	
	@Autowired
	EventRepository eventRepo;
	
	@PostMapping("/create")
	public void saveScheme(@RequestBody Scheme scheme) {

		List<Event> events = new ArrayList<>();
		for (Event event : scheme.getEvents()) {
			events.add(eventRepo.findOne(event.getId()));
		}
		scheme.setEvents(events);
		
		
		for (Event event : scheme.getEvents()) {
			event.setScheme(scheme);
			eventRepo.save(event);
		}
		
		Set<Tag> tagList = new HashSet();
		
		scheme.getTags().stream().forEach(tag -> {
			Tag tagOp = tagRepo.findOne(tag.getId());
			tagList.add(tagOp);
		});
		
		scheme.setTags(tagList);
		
		repository.save(scheme);
	}
	
	@RequestMapping("/list")
	public List<Scheme> findAllEvents() {
		return repository.findAll();
	}
	
    @PostMapping("/event/update")
    public boolean updateOneEventInOneScheme(@RequestBody EventSchemeContainer container) {
        Scheme scheme = repository.findOne(container.getSchemes().get(0).getId());
        Event event = container.getEvents().get(0);
        
        scheme.getEvents().add(event);
        event.setScheme(scheme);
        
        repository.save(scheme);
        return true;
    }

    @PostMapping("/update")
    public boolean updateScheme(@RequestBody Scheme scheme) {
    	repository.save(scheme);
    	List<Scheme> list = repository.findAll();
    	return true;
    }
}
