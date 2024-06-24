# local_adler_score_primitive_learning_element

## Beschreibung:
Übermittelt das Ergebnis für primitive Lernelemente (abgeschlossen/nicht abgeschlossen).

## Parameter:

- `module_id`: Int (Erforderlich) - Moodle Modul-ID
- `is_completed`: Int (Erforderlich) - 1: abgeschlossen, 0: nicht abgeschlossen

## Antwort:

- `data`: Liste von Objekten
    - `module_id`: Int - Moodle Modul-ID
    - `score`: Double (Optional) - Erreichte (Adler-Datei) Punktzahl, wenn dieses Feld fehlt, ist die completion-API (oder etwas Ähnliches) für dieses Element deaktiviert.
