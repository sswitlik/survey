package ncdc.sas.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import ncdc.sas.entity.Tag;

public interface TagRepository extends CrudRepository<Tag, Long> {

	
	List<Tag> findByName(String name);
    List<Tag> findAll();
	
}
