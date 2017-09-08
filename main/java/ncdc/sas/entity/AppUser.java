package ncdc.sas.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class AppUser extends AbstractEntity{
	
	@Column(name="verification")
	private static boolean verification;
	
	@Column(name="username")
	private String username;
	
	@Column(name="password")
	private String password;

	public AppUser() {
		super();
	}
	
	public AppUser(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public static boolean isVerification() {
		return verification;
	}

	public static void setVerification(boolean _verification) {
		verification = _verification;
	}
	
	
}
