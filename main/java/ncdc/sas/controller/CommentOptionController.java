package ncdc.sas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ncdc.sas.entity.CommentOption;
import ncdc.sas.repository.CommentOptionRepository;


@RestController
@RequestMapping("comment_option")
public class CommentOptionController {

		@Autowired
		CommentOptionRepository repository;
		
		@RequestMapping("/list")
		public List<CommentOption> findAll() {
			return repository.findAll();
		}
		
		@PostMapping("/create")
		public void saveCommentOption(@RequestBody CommentOption commentOption) {
			repository.save(commentOption);
		}
		
		
		
}
