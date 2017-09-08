package ncdc.sas.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import ncdc.sas.entity.AnswerUser;
import ncdc.sas.entity.Event;

public interface AnswerUserRepository extends CrudRepository<AnswerUser, Long>{
	List<AnswerUser> findAll();
	List<AnswerUser> findByUserID(String userId);
	List<AnswerUser> findByEventId(Long eventId);
	List<AnswerUser> findByUserIDAndEvent(Long userId, Long event);
	List<AnswerUser> findByEventIdAndOpinionOptionId(Long eventId, Long opinionOptionId);
}