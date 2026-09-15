package PatientBP;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BPRecordRepository
        extends JpaRepository<BPRecord, Long> {

    List<BPRecord> findByPatientId(String patientId);
}