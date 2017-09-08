package ncdc.sas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import ncdc.sas.entity.Event;

public interface EventRepository extends CrudRepository<Event, Long> {

    List<Event> findByTitle(String title);
    List<Event> findAll();
    List<Event> findByTagsName(String name);
    @Query("SELECT DISTINCT e FROM Event e JOIN e.tags tag WHERE tag.name in :names")
	List<Event> findEventsByTags(@Param("names")List<String> names);

}
