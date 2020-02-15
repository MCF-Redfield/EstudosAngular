package com.redfield.testejwt.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.redfield.testejwt.model.User;

@CrossOrigin
@RestController
@RequestMapping("/jwt")
public class JWTController {

	private static List<User> list = new ArrayList<User>();
	{
		list.add(new User("User 1", "123456"));
		list.add(new User("User 2", "659849"));
		list.add(new User("User 3", "65498987"));
	}
		
	@GetMapping("")
	public List<User> getAllUsers()
	{
		return list;
	}
	
	@PostMapping("")
	public void addUser(@RequestBody User user){
		System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>");
		System.out.println(user.getId() + " " + user.getName());
        list.add(user);        
    }
	
	//@PostMapping("/jwt/autentica")
	//public Response
	
	
}
