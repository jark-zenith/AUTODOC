# Safety Boundaries

AUTODOC is software only. It must not connect to sensors, control physical devices, use real patient data, diagnose patients, prescribe medication, or represent itself as a real doctor.

Development fixtures must be synthetic. Future features must clearly label simulation output, expose their input provenance, and fail closed when a requested operation crosses these boundaries.

Symptom understanding and reasoning are informational matching layers only. They preserve original input, report unknown information explicitly, use deterministic methods, and never treat an Information Match score as disease probability or diagnostic certainty. The separate Safety Engine remains responsible for future warning and urgency workflows.

The Safety Engine also remains informational. Its warning signals identify patterns that may require attention; its status and urgency values are internal, non-clinically-validated classifications. It does not diagnose, prescribe, recommend medication, provide dosages, determine an underlying cause, or contact emergency services. Emergency integration is currently `NOT_CONFIGURED`.

The Assessment/Response Engine gives Safety priority when assembling a unified response. An urgent safety result leads the response, while Reasoning remains a secondary information-matching section. The response layer preserves limitations and never converts missing information into a negative finding.

Identity and permissions are also safety boundaries: no camera or biometric data is collected, no production authentication exists, member IDs are not trusted without scope checks, and audit logs do not contain health details. Family and Memory services use fictional/demo data and replaceable in-memory stores.

Notifications never claim external delivery or emergency contact. Safety notifications use cautious internal wording, and notification priority is separate from Safety Engine urgency.