package student.entity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

 @RestController
public class HelloController {

	  @GetMapping("/hello/{name}")
	    public String hello(@PathVariable String name) {
	        return "Hello " + name;
	    }
	  
	  @PostMapping("/Student")
	  public String addStudent() {
		  return "Student Added";
	  }
}
