package ncdc.sas.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import ncdc.sas.entity.Scheme;

public interface SchemeRepository extends CrudRepository<Scheme, Long> {

	List<Scheme> findAll();
}
