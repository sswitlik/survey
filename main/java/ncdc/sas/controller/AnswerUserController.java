package ncdc.sas.controller;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ncdc.sas.entity.AnswerUser;
import ncdc.sas.entity.Event;
import ncdc.sas.repository.AnswerMaskRepository;
import ncdc.sas.repository.AnswerUserRepository;
import ncdc.sas.repository.CommentOptionRepository;
import ncdc.sas.repository.EventRepository;
import ncdc.sas.repository.OpinionCounterRepository;
import ncdc.sas.repository.OpinionOptionRepository;

@RestController
@RequestMapping("answer_user")
public class AnswerUserController {
	
	@PersistenceContext
	EntityManager em;

	@Autowired
	AnswerUserRepository repository;
	
	@Autowired
	OpinionOptionRepository opinionRepo;
	
	@Autowired
	EventRepository eventRepo;
	
	@Autowired 
	AnswerMaskRepository maskRepo;
	
	@Autowired
	OpinionCounterRepository counterRepo;
	
	@Autowired
	CommentOptionRepository commentRepo;
	
	@PostMapping("/create")
	public void saveAnswerUserInDatabase(@RequestBody AnswerUser answer){
		repository.save(answer);
		
		//Increment Counter
		Event event = eventRepo.findOne(answer.getEvent().getId());
		String opinionUniqueId = opinionRepo.findOne(answer.getOpinionOption().getId()).getUniqueId();
		event.incrementOpinion(opinionUniqueId);
		if (answer.getComment() != null) {
			event.saveComment(answer.getComment());
			commentRepo.save(event.getAnswerMask().getCommentOption());	
		}
			
		counterRepo.save(event.getAnswerMask().getOpinionCounter());		
		maskRepo.save(event.getAnswerMask());		
		eventRepo.save(event);
	}
	@PostMapping("/createList")
	public void saveAnswersUserInDatabase(@RequestBody List<AnswerUser> answers){
		
		for(int i  = 0; i<answers.size(); i ++ ){
			repository.save(answers.get(i));
			
			//Increment Counter
			Event event = eventRepo.findOne(answers.get(i).getEvent().getId());
			String opinionUniqueId = opinionRepo.findOne(answers.get(i).getOpinionOption().getId()).getUniqueId();
			event.incrementOpinion(opinionUniqueId);
			if (answers.get(i).getComment() != null) {
				event.saveComment(answers.get(i).getComment());
				commentRepo.save(event.getAnswerMask().getCommentOption());	
			}
				
			counterRepo.save(event.getAnswerMask().getOpinionCounter());		
			maskRepo.save(event.getAnswerMask());		
			eventRepo.save(event);
		}
		
	}
		
	@RequestMapping("/list")
	public List<AnswerUser> findAllAnswers(){
		
		return repository.findAll();
	}
	
	@RequestMapping("/list/{id}")
	public AnswerUser findById(@PathVariable("id") Long id) {
		
		return repository.findOne(id);
	}
	
	@RequestMapping("/listByEvent/{event_id}")
	public List<AnswerUser> findByEvent(@PathVariable("event_id") Long eventId) {
		
		return repository.findByEventId(eventId);
	}

	@RequestMapping("/listByUser/{userId}")
	public List<AnswerUser> findByUser(@PathVariable("user_id") String userId) {
		return repository.findByUserID(userId);
	}
	
	@RequestMapping("/listByEventAndOpinionOption/{event_id}/{opinionOption_id}")
	public List<AnswerUser> findByEventAndOpinionOption(@PathVariable("event_id") Long eventId, 
														@PathVariable("opinionOption_id") Long opinionOptionId) {
		return repository.findByEventIdAndOpinionOptionId(eventId, opinionOptionId);
	}
	
	
	@RequestMapping("/isAnswerExist/{event_id}/{rfid}")
	public Long isAnswerExist(@PathVariable("event_id") Long eventId, @PathVariable("rfid") String rfid){
		
		
		String jpql = "SELECT COUNT(au) FROM AnswerUser au WHERE au.event.id = :id AND au.userID = :rfid";
		Query query = em.createQuery(jpql);
		query.setParameter("id", eventId);
		query.setParameter("rfid", rfid);
		Long result = (Long) query.getSingleResult();
		
		return result;
	}
	
}
