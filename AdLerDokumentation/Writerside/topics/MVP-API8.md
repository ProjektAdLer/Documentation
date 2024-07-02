# local_adler_score_get_course_scores

## Beschreibung:
Ruft die Adler-Punktzahlen für alle Elemente innerhalb des Kurses mit der gegebenen Kurs-ID ab.

## Parameter:

- `course_id`: Int (Erforderlich) - Moodle Kurs-ID

## Antwort:

- `data`: Liste von Objekten
    - `module_id`: Int - Moodle [Modul-ID](module-id-moodle-VP.md)
    - `score`: Double (Optional) - Erreichte (Adler-Datei) Punktzahl, wenn dieses Feld fehlt, ist die completion-API (oder etwas Ähnliches) für dieses Element deaktiviert.
