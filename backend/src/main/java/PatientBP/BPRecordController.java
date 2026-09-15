package PatientBP;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bp")
@CrossOrigin(origins = "*")
public class BPRecordController {

    @Autowired
    private BPRecordRepository repository;


    // ==============================
    // 1. Save a new BP record
    // ==============================

    @PostMapping
    public BPRecord saveBPRecord(@RequestBody BPRecord bpRecord) {

        return repository.save(bpRecord);
    }


    // ==============================
    // 2. Get all BP records
    // ==============================

    @GetMapping
    public List<BPRecord> getAllBPRecords() {

        return repository.findAll();
    }


    // ==============================
    // 3. Get BP record by ID
    // ==============================

    @GetMapping("/{id}")
    public Optional<BPRecord> getBPRecordById(
            @PathVariable Long id) {

        return repository.findById(id);
    }


    // ==============================
    // 4. Search by Patient ID
    // ==============================

    @GetMapping("/search")
    public List<BPRecord> searchByPatientId(
            @RequestParam String patientId) {

        return repository.findByPatientId(patientId);
    }


    // ==============================
    // 5. Get all records for patient
    // ==============================

    @GetMapping("/patient/{patientId}")
    public List<BPRecord> getPatientRecords(
            @PathVariable String patientId) {

        return repository.findByPatientId(patientId);
    }


    // ==============================
    // 6. Delete BP record
    // ==============================

    @DeleteMapping("/{id}")
    public String deleteBPRecord(
            @PathVariable Long id) {

        if (repository.existsById(id)) {

            repository.deleteById(id);

            return "BP Record deleted successfully";
        }

        return "BP Record not found";
    }
}