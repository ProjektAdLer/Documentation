# mod_adleradaptivity_answer_questions

## Beschreibung:
Beantwortet eine Frage eines Adaptivitäts-Lernelements.

## Parameter:

- `module` (Erforderlich) - Eines der sub-Attribute ist erforderlich
    - `module_id`: String (Optional) - Modul-ID des Adaptivitätsmoduls
    - `instance_id`: String (Optional) - Instanz-ID des Adaptivitätsmoduls
- `questions` (Erforderlich)
    - `uuid`: String - UUID der Frage
    - `answer`: String - JSON-kodierte Daten, die die Frageantwort enthalten. Zum Beispiel für eine Multiple-Choice-Frage: [false, false, true, false]. Null, wenn die Frage nicht versucht wurde.

## Antwort:

- `data`
    - `module`
        - `module_id`: String (Optional) - Modul-ID des Adaptivitätsmoduls
        - `instance_id`: String (Optional) - Instanz-ID des Adaptivitätsmoduls
        - `status`: String - Status des Moduls, einer von correct, incorrect, notAttempted
    - `tasks`: Liste von Objekten
        - `uuid`: String - UUID der Aufgabe
        - `status`: String - Status der Aufgabe, einer von correct, incorrect, notAttempted
    - `questions`: Liste von Objekten
        - `uuid`: String - UUID der Frage
        - `status`: String - Status der Frage, einer von correct, incorrect, notAttempted
        - `status_best_try`: String - Status des besten Versuchs der Frage, einer von correct, incorrect, notAttempted
        - `answers`: String - JSON-kodierte Daten, die die Frageantwort enthalten. Zum Beispiel für eine Multiple-Choice-Frage: Array von Objekten mit den Feldern 'checked' und 'user_answer_correct'. Null, wenn die Frage nicht versucht wurde.
