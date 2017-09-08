package ncdc.sas.controller;

import java.util.List;
import java.util.UUID;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ncdc.sas.entity.Event;
import ncdc.sas.entity.OpinionOption;
import ncdc.sas.repository.OpinionOptionRepository;



@RestController
@RequestMapping("opinion_option")
public class OpinionOptionController {

	@Autowired
	OpinionOptionRepository repository;
	
	@PersistenceContext
	private EntityManager em;
	
	@PostMapping("/create")
	public void saveOpinionOptionInDatabase(@RequestBody OpinionOption opinion){
		
		opinion.setUniqueId(UUID.randomUUID().toString());
		repository.save(opinion);
	}

	@RequestMapping("/list")
	public List<OpinionOption> findAllOpinionOptions() {

		return repository.findAll();
	}

	@RequestMapping("/list/{id}")
	public OpinionOption findOpinionOptionById(@PathVariable("id") Long id) {

		return repository.findOne(id);
	}

@RequestMapping("/list/type/{type}")
	public List<OpinionOption> findOpinionOptionByType(@PathVariable("type") String type) {

		String jpql = "SELECT o FROM OpinionOption o WHERE o.type.type = :type";
		TypedQuery<OpinionOption> opinionQuery = em.createQuery(jpql, OpinionOption.class);
		opinionQuery.setParameter("type", type);
		
		return opinionQuery.getResultList();
		
	}

}
