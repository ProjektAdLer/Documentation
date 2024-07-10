# local_adler_score_get_element_scores

## Beschreibung:
Ruft die Adler-Punktzahlen für Lernelemente mit gegebenen IDs ab.

## Parameter:

- `module_ids`: Liste von Int (Erforderlich) - Moodle [Modul-IDs](module-id-moodle-VP.md)

## Antwort:

- `data`: Liste von Objekten
    - `module_id`: Int - Moodle [Modul-ID](module-id-moodle-VP.md)
    - `score`: Double (Optional) - Erreichte (Adler-Datei) Punktzahl, wenn dieses Feld fehlt, ist die completion-API (oder etwas Ähnliches) für dieses Element deaktiviert.
