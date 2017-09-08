package ncdc.sas.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import ncdc.sas.entity.Event;
import ncdc.sas.entity.OpinionOption;
import ncdc.sas.entity.OpinionType;
import ncdc.sas.entity.Template;

public interface OpinionOptionRepository extends CrudRepository<OpinionOption, Long> {
	List<OpinionOption> findByType(OpinionType type);
    List<OpinionOption> findAll();
}
