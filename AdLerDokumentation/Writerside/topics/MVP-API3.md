# mod_adleradaptivity_get_task_details

## Beschreibung:
Ruft Details für alle Aufgaben in einem Lernelement ab.

## Parameter:

- `module` (Erforderlich) - Eines der sub-Attribute ist erforderlich
    - `module_id`: String (Optional) - [Modul-ID](module-id-moodle-VP.md) des Adaptivitätsmoduls
    - `instance_id`: String (Optional) - [Instanz-ID](instance-id-moodle-VP.md) des Adaptivitätsmoduls

## Antwort:

- `data`: Objekt
    - `tasks`: Liste von Objekten
        - `uuid`: String - UUID der Aufgabe
        - `status`: String - Status der Aufgabe, einer von correct, incorrect, notAttempted
