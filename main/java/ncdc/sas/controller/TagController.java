package ncdc.sas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ncdc.sas.entity.Tag;
import ncdc.sas.repository.TagRepository;

@RestController
@RequestMapping("tag")
public class TagController {

	@Autowired
	TagRepository tagRepository;
		
	@PostMapping("/create")
	public void saveEventInDatabase(@RequestBody Tag tag){
		tagRepository.save(tag);
	}

	@PostMapping("/delete")
	public void deleteTagFromDatabase(@RequestBody Tag tag) {
		tagRepository.delete(tag);
	}

	@RequestMapping("/list")
	public List<Tag> findAllEvents(){
		
		return tagRepository.findAll();
	}
	
	@RequestMapping("/list/{id}")
	public Tag findEventById(@PathVariable("id") Long id) {
		
		return tagRepository.findOne(id);
	}	
}
