# H5P-Player

Hierbei handelt es sich um eine Komponente zum Abspielen von H5p-Videos.

neue Abhängigkeiten:
- Microsoft.JSInterop (8.0.8)

# H5P-Standalone fehlt in Projektordner des H5P-Players

In einer Blazor-Anwendung können statische Dateien (wie JavaScript, CSS, Bilder etc.)
nicht direkt aus einem anderen Ordner als dem wwwroot-Verzeichnis geladen werden.
Der Grund dafür ist, dass das wwwroot-Verzeichnis der einzige Ordner ist,
der als Webstammverzeichnis konfiguriert ist
und vom Webserver als Quelle für statische Dateien dient.

Darum ist H5P-Standalone etc. nicht im Projektordner des H5P-Players.

Man kann dies über eine Middleware lösen, die die Javascript-Dateien während
des Build-Prozesses in das wwwroot-Verzeichnis kopiert.