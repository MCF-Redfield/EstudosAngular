package com.redfield.testejwt.model;

public class User {

	private String name;
	private String id;
			
	public User() {
		super();
	}
	
	public User(String name, String id) {
		super();
		this.name = name;
		this.id = id;
	}
	public final String getName() {
		return name;
	}
	public final void setName(String name) {
		this.name = name;
	}
	public final String getId() {
		return id;
	}
	public final void setId(String id) {
		this.id = id;
	}
	
	
}
