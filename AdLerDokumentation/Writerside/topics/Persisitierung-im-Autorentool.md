# Persisitierung im Autorentool



## Beschreibung

Für jede Lernwelt im Autorentool wird eine XML-Datei im Verzeichnis SavedWorlds angelegt.
Das Format der Datei ist das AdLer World Format (AWF). 
Das AWF entspricht der Struktur der Persist-Entities des Autorentools.
Kurz zusammengefasst enthält jede Lernwelt ihre Lernräume, diese wiederum 
enthalten die Lernelemente usw.
Einzige Ausnahme sind die Content-Dateien der Lernelemente selbst
(.mp4, .png, .h5p, ...), diese sollen in einem Systemordner zentral
liegen und in den AWF-Lernweltdateien über Dateipfade referenziert werden.


Wichtiges Aktivitätsdiagramm zum Persistierungsprozess im Autorentool: [](ASE6.md) 

## Wichtige Methoden:

Eine wichtige Methode des Autorentools
um die Persistierung auf Code-Ebene zu verstehen ist: 
DataAccess.SaveLearningWorldToFile


## Verzeichnis zur Persistierung

Sowohl die Domänenspezifischen als auch die Anwendungsspezifischen Daten
des Autorentools werden ausschließlich auf dem Dateisystem des
[](Lehrende-GE.md) [persistiert](CRUDSP-GE.md).


- Verzeichnisname: AdLerAuthoring
- Pfad: C:\Users\%USERPROFILE%\AppData\Roaming\AdLerAuthoring\...

Verzeichnisstruktur:

- AdLerAuthoring
  - ContentFiles
      - Zu jedem Lernelement gibt es:
          - Lernelement-Datei
          - Hash zu Lernelement-Datei
  - Logs
  - SavedWorlds
      - Die Welten mit Endung awf (Adler World File)
      - SavedWorlds.xml
        - Zweck dieser Datei ist unbekannt: wurde vom damals nicht dokumentiert.
  - Toolbox
    - - Zweck dieses Verzeichnisses ist unbekannt: wurde damals nicht dokumentiert.
  - ApplicationConfig.json
    - Zweck dieser Datei ist unbekannt: wurde damals nicht dokumentiert.
    - Sieht aus als würde sie nicht mehr gebraucht werden.



