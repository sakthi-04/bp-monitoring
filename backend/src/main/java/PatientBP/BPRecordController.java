
package PatientBP;

import PatientBP.BPRecordRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import PatientBP.BPRecord;

@RestController
@RequestMapping("/api/bp")
@CrossOrigin(origins = "*")
public class BPRecordController {

    @Autowired
    private BPRecordRepository repository;

    // 1. Save a new BP record
    @PostMapping
    public BPRecord saveBPRecord(@RequestBody BPRecord bpRecord) {
        return repository.save(bpRecord);
    }

    // 2. Get all BP records
    @GetMapping
    public List<BPRecord> getAllBPRecords() {
        return repository.findAll();
    }

    // 3. Get a BP record by ID
    @GetMapping("/{id}")
    public Optional<BPRecord> getBPRecordById(@PathVariable Long id) {
        return repository.findById(id);
    }

    // 4. Delete a BP record by ID
    @DeleteMapping("/{id}")
    public String deleteBPRecord(@PathVariable Long id) {

        if (repository.existsById(id)) {
            repository.deleteById(id);
            return "BP Record deleted successfully";
        }

        return "BP Record not found";
    }
}

