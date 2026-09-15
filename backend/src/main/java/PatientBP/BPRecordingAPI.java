package PatientBP;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bp")
@CrossOrigin(origins = "http://localhost:5173")
public class BPRecordingAPI {

    private final List<BPRecording> recording = new ArrayList<>();
    private int nextId = 1;

    @GetMapping
    public List<BPRecording> getAllRecordings() {
        return recording;

    }

    @PostMapping("/register")
    public BPRecording registerBP(@RequestBody BPRecording bp) {

        bp.setId(nextId++);
        recording.add(bp);
        return bp;
    }

    @GetMapping("/patient/{patientId}")
    public List<BPRecording> getPatientBP(@PathVariable int patientId) {

        List<BPRecording> result = new ArrayList<>();
        for (BPRecording bp : recording) {

            if (bp.getPatientId() == patientId) {
                result.add(bp);
            }
        }
        return result;
    }

}
