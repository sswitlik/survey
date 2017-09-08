package ncdc.sas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ncdc.sas.entity.Tag;
import ncdc.sas.entity.OpinionType;
import ncdc.sas.repository.TagRepository;
import ncdc.sas.repository.OpinionTypeRepository;

@RestController
@RequestMapping("opinion_type")
public class OpinionTypeController {

	@Autowired
	OpinionTypeRepository typeRepository;

	@PostMapping("/create")
	public void saveOpinionTypeInDatabase(@RequestBody OpinionType type) {
		typeRepository.save(type);
	}

	@RequestMapping("/list")
	public List<OpinionType> findAllOpinionTypes() {

		return typeRepository.findAll();
	}

	@RequestMapping("/list/{id}")
	public OpinionType findOpinionTypeById(@PathVariable("id") Long id) {

		return typeRepository.findOne(id);
	}

}
