# local_adler_get_element_ids_by_uuids

## Beschreibung:
Gibt Kontext- und Datenbank-IDs für <a href="Section-VP.md">Sections</a> / Kursmodule mit gegebenen UUIDs und Kurs-IDs zurück.

## Parameter:

- `elements`: Liste von Objekten (Erforderlich)
    - `course_id`: String (Erforderlich) - Kurs-ID
    - `element_type`: String (Erforderlich) - Elementtyp, einer von <a href="Section-VP.md">Section</a>, cm
    - `uuid`: String (Erforderlich) - Element-UUID

## Antwort:

- `data`: Liste von Objekten
    - `course_id`: String - Kurs-ID (Moodle-ID, auch "Instanz-ID")
    - `element_type`: String - Elementtyp
    - `uuid`: String - Element-UUID
    - `moodle_id`: Int - Element Moodle-ID
    - `context_id`: Int - Element Kontext-ID, null für <a href="Section-VP.md">Section</a>
