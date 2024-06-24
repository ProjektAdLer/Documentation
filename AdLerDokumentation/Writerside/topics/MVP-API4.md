# local_adler_upload_course

## Beschreibung:
Lädt einen Adler-Kurs hoch (als <a href="MBZ-GE.md" />-Datei).

## Parameter:

- `category_id`: Int (Standardwert "null") - ID der Kategorie, in der der Kurs erstellt werden soll. Wenn null, wird der Kurs in der ersten Kategorie erstellt, in der der Benutzer berechtigt ist, einen Kurs zu erstellen.
- `only_check_permissions`: Int (Standardwert "") - Überprüft nur, ob der Benutzer die Berechtigungen zur Wiederherstellung hat. Kein <a href="MBZ-GE.md" /> erforderlich. Gibt generische Daten für Kursname und ID zurück.
- `mbz`: String (Standardwert "null") - Erforderlich (Moodle-Tag "optional" ist aufgrund von Moodle-Beschränkungen), außer wenn only_check_permissions true ist. <a href="MBZ-GE.md" /> als Datei-Upload.

## Antwort:

- `data`
    - `course_id`: Int - ID des neu erstellten Kurses
    - `course_fullname`: String - Vollständiger Name des neu erstellten Kurses. Dieser Wert kann von dem in mbz angegebenen abweichen. Wenn ein Name bereits existiert, benennt Moodle den Kurs um.
