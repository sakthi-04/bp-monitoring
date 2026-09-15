package PatientBP;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class BPRecord{

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String patientId;
    private String bpValue;

    public BPRecord(){

    }

    public Long getId(){
        return id;
    }
    public String getPatientId(){
        return patientId;
    }
    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public String getBpValue() {
        return bpValue;
    }

    public void setBpValue(String bpValue) {
        this.bpValue = bpValue;
    }

}