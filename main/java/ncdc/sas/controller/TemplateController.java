package ncdc.sas.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ncdc.sas.entity.OpinionOption;
import ncdc.sas.entity.Template;
import ncdc.sas.repository.OpinionOptionRepository;
import ncdc.sas.repository.TemplateRepository;

@RestResource
@RestController
@RequestMapping("template")
public class TemplateController {

	@Autowired
    TemplateRepository repository;
	
	@Autowired
	private OpinionOptionRepository opinionOptionRepository;

	@PostMapping("/create")
	public void saveTemplate(@RequestBody Template template) {
		
		
		Set<OpinionOption> opinionList = new HashSet();
		template.getOpinions().stream().forEach(opinion -> {
			OpinionOption opOp = opinionOptionRepository.findOne(opinion.getId());
			opinionList.add(opOp);
		});
		
		template.setOpinions(opinionList);
		
		repository.save(template);
	}

	@RequestMapping("/list")
	public List<Template> findAllTemplates() {

		return repository.findAll();
	}
	@RequestMapping("/list/{id}")
	public Template findEventById(@PathVariable("id") Long id) {
		
		return repository.findOne(id);
	}

}