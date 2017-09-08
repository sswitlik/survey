package ncdc.sas.repository;

import org.springframework.data.repository.CrudRepository;

import ncdc.sas.entity.AppUser;

public interface AppUserRepository extends CrudRepository<AppUser, Long>{
	AppUser findByUsernameAndPassword(String username, String password);
}
