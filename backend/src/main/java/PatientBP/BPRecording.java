package PatientBP;

public class BPRecording {
	
	private int id ;
	private int patientId;
	private String bpValue;
	
	public BPRecording(int id, int patientId,String bpValue) {
		
		this.id = id;
		this.patientId = patientId;
		this.bpValue = bpValue;
		
	}
	
	public int getId() {
		return id ;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public int getPatientId() {
		return patientId;
	}
	
	public void setPatientId(int patientId) {
		this.patientId = patientId;	
	}
	public String getBpValue() {
		return bpValue;
	}
	
	public void setBpValue(String bpValue) {
		this.bpValue = bpValue;
	}
}
