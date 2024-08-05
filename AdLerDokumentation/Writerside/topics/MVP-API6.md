# local_adler_score_h5p_learning_element

## Beschreibung:
Übermittelt das Ergebnis für H5P. Dies ist nur eine Proxy-Funktion und leitet die Payload an {"wsfunction", "core_xapi_statement_post"}, {"component", "mod_h5pactivity"}, {"requestjson", "[" + statement + "]"} weiter.

## Parameter:

- `xapi`: String (Erforderlich) - xapi JSON Nutzlast für das H5P-Modul

## Antwort:

- `data`: Liste von Objekten
    - `module_id`: Int - Moodle [Modul-ID](module-id-moodle-VP.md)
    - `score`: Double (Optional) - Erreichte (Adler-Datei) Punktzahl, wenn dieses Feld fehlt, ist die completion-API (oder etwas Ähnliches) für dieses Element deaktiviert.
