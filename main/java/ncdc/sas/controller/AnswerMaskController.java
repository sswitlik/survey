package ncdc.sas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ncdc.sas.entity.AnswerMask;
import ncdc.sas.entity.OpinionCounter;
import ncdc.sas.repository.AnswerMaskRepository;

@RestController
@RequestMapping("answer_mask")
public class AnswerMaskController {

	@Autowired
	AnswerMaskRepository repository;
	
	@PostMapping("/create")
	public void  saveAnswerMaskInDatabase(@RequestBody AnswerMask answer) {
		repository.save(answer);
	}

	@RequestMapping("/list")
	public List<AnswerMask> findAll() {
		return repository.findAll();
	}

	
}
