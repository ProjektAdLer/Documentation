# mod_adleradaptivity_get_question_details


## Beschreibung:
Ruft Details für alle Fragen in einem Lernelement ab.


## Parameter:

- `module` (Erforderlich) - Eines der sub-Attribute ist erforderlich
    - `module_id`: String (Optional) - Modul-ID des Adaptivitätsmoduls
    - `instance_id`: String (Optional) - Instanz-ID des Adaptivitätsmoduls

## Antwort:

- `data`: Objekt
    - `questions`: Liste von Objekten
        - `uuid`: String - UUID der Frage
        - `status`: String - Status der Frage, einer von correct, incorrect, notAttempted
        - `status_best_try`: String - Status des besten Versuchs der Frage, einer von correct, incorrect, notAttempted
        - `answers`: String - JSON-kodierte Daten, die die Frageantwort enthalten. Zum Beispiel für eine Multiple-Choice-Frage: Array von Objekten mit den Feldern 'checked' und 'user_answer_correct'. Null, wenn die Frage nicht versucht wurde.
