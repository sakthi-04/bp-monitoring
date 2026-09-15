package com.SpringPractice.demo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class StudentsAPI {

	List <Student> stdls = new ArrayList<>();
	
	Student stdlNo1 = new Student(1, "Naveen", 260);
	Student stdlNo2 = new Student(2, "Naveen", 230);
	Student stdlNo3 = new Student(3, "Naveen", 290);
	Student stdlNo4 = new Student(4, "Naveen", 210);
	
	public StudentsAPI(){
		stdls.add(stdlNo1);
		stdls.add(stdlNo2);
		stdls.add(stdlNo3);
		stdls.add(stdlNo4);
	}
	
	@GetMapping("/getstudent")
	public List<Student>getstudent() {
		System.out.println("Get All Student");
		return stdls;
	}
	
	@GetMapping("/getstudent/{id}")
	public Student getStudent(@PathVariable int id) {
		for(Student s: stdls) {
			if(s.getId()==id){
				return s;
			}
		}
		
		return null;
	}
	
	@PostMapping("/addstudent")
	public String addStudent(@RequestBody Student newStudent) {
		stdls.add(newStudent);
		return "Student Added Successfully";
	}
	
	@PutMapping("/update")
	public String update(@RequestBody Student updata) {
		for(Student s: stdls) {
			if(s.getId() == updata.getId()) {
				s.setName(updata.getName());
				s.setMark(updata.getMark());

			return "Student Updated";
			
			}
		}
		
		return "Student Not Found";
	}
	
	@DeleteMapping("/deletestudent/{id}")
		public String delete(@PathVariable int id) {
			stdls.removeIf(s -> s.getId() == id);
			
			return "Student Deleted";
		}
}
