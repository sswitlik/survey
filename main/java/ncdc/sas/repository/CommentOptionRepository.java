package ncdc.sas.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import ncdc.sas.entity.CommentOption;

public interface CommentOptionRepository extends CrudRepository<CommentOption, Long> {

	List<CommentOption> findAll();
}
