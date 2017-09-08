package ncdc.sas.server;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.apache.log4j.Category;
import org.hibernate.sql.Template;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import ncdc.sas.entity.Event;
import ncdc.sas.entity.OpinionOption;
import ncdc.sas.entity.OpinionType;
import ncdc.sas.entity.Scheme;
import ncdc.sas.repository.OpinionOptionRepository;
import ncdc.sas.repository.OpinionTypeRepository;

@SpringBootApplication
@ComponentScan("ncdc.sas.controller")
@ComponentScan("ncdc.sas.login")
@EntityScan("ncdc.sas.entity")
@EnableJpaRepositories("ncdc.sas.repository")
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@Bean
	public CommandLineRunner addOptionTypes(OpinionTypeRepository typeRepository,
			OpinionOptionRepository opinionRepository) {

		OpinionOption starOpinion = null, commentOpinion = null, emoticonOpinion = null;
		return (args) -> {
			if(typeRepository.count() == 0) {
				typeRepository.save(new OpinionType("Stars"));
				typeRepository.save(new OpinionType("Comment"));
				typeRepository.save(new OpinionType("Questionnaire"));
				typeRepository.save(new OpinionType("Emoticons"));
			}
			
			if(opinionRepository.count() == 0) {
				for (int i = 1; i < 6; i++) {
					CreateNewOpinion(starOpinion, i, typeRepository, "Stars", opinionRepository);
				}
				
				for (int i = 1; i < 4; i++) {
					CreateNewOpinion(emoticonOpinion, i, typeRepository, "Emoticons", opinionRepository);
				}
				
				CreateNewOpinion(commentOpinion, 0, typeRepository, "Comment", opinionRepository);
			}			

		};

	}

	public OpinionOption CreateNewOpinion(OpinionOption newOpinion, int value, OpinionTypeRepository typeRepo, String type,
										  OpinionOptionRepository opinionRepo) {
		newOpinion = new OpinionOption(value, typeRepo.findByType(type), null, null);
		newOpinion.setUniqueId(UUID.randomUUID().toString());
		opinionRepo.save(newOpinion);
		
		return newOpinion;
	}
}