package ncdc.sas.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class OpinionType extends AbstractEntity{
	
	@Column( name  = "type")
	private String type;
	
	private OpinionType(){
		super();
    }

	public OpinionType(String type) {
		this.type = type;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}	

}
