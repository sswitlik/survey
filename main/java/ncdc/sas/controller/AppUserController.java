package ncdc.sas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ncdc.sas.container.VerificationContainer;
import ncdc.sas.entity.AppUser;
import ncdc.sas.repository.AppUserRepository;

@RestController
@RequestMapping("/verification")
public class AppUserController {

	@Autowired
	AppUserRepository appUserRepository;

	@GetMapping("/get")
	public boolean isVerification() {
		return AppUser.isVerification();
	}
	
	@PostMapping("/set")
	public void setVerification(@RequestBody VerificationContainer setter) {
		AppUser.setVerification(setter.isVerification());
		System.out.println(setter.isVerification());
	}
}
