package ncdc.sas.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import ncdc.sas.entity.Tag;
import ncdc.sas.entity.OpinionType;

public interface OpinionTypeRepository extends CrudRepository<OpinionType, Long> {
	List<OpinionType> findAll();
	OpinionType findByType(String type);
}
