package ncdc.sas.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import ncdc.sas.entity.AnswerMask;
import ncdc.sas.entity.AnswerUser;

public interface AnswerMaskRepository extends CrudRepository<AnswerMask, Long> {

	AnswerMask findOne(Long id);
	List<AnswerMask> findAll();
	
	/*
	AnswerMask findOne(Long id);

	AnswerMask findByEventIdAndOpinionOptionId(Long eventId, Long opinionOptionId);
	List<AnswerMask> findByEventId(Long eventId);
	*/
}
