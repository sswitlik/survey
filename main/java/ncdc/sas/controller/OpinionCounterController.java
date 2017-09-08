package ncdc.sas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ncdc.sas.entity.OpinionCounter;
import ncdc.sas.repository.OpinionCounterRepository;

@RestController
@RequestMapping("opinion_counter")
public class OpinionCounterController {

	@Autowired
	OpinionCounterRepository repository;
	
	@RequestMapping("/list")
	public List<OpinionCounter> findAll() {
		return repository.findAll();
	}
	
	@PostMapping("/create")
	public void saveOpinionCounter(@RequestBody OpinionCounter opinionCounter) {
		repository.save(opinionCounter);
	}
}
