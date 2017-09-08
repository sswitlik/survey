package ncdc.sas.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import ncdc.sas.entity.OpinionCounter;

public interface OpinionCounterRepository extends CrudRepository<OpinionCounter, Long> {
	
	OpinionCounter findOne(Long id);
	List<OpinionCounter> findAll();
}
