package PatientBP;

import PatientBP.BPRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BPRecordRepository
        extends JpaRepository<BPRecord, Long> {
}