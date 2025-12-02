# Weltenverwaltung - Benutzungsanleitung

Die Weltenverwaltung ermöglicht das Verwalten von Lernwelten direkt im Browser. Diese Anleitung erklärt alle Funktionen für Lernende und Lehrende.

---

## Inhaltsverzeichnis

1. Übersicht
2. Weltenverwaltung öffnen
3. Für Lernende
    - Lernwelt importieren
    - Lernwelt löschen
    - Speicherplatz verwalten
4. Für Lehrende / Dozenten
    - Lernwelten testen
    - Lernwelten aktualisieren
    - Veröffentlichungsmodus
    - Auf Webserver bereitstellen
5. Fehlerbehebung
6. Häufige Fragen (FAQ)

---

## Übersicht

Die AdLer 3D-Lernumgebung unterstützt zwei Arten von Lernwelten:

| Art            | Beschreibung                                           | Löschbar?             |
|----------------|--------------------------------------------------------|-----------------------|
| Vorinstalliert | Welten, die auf dem Webserver bereitgestellt sind      | Nur von Server-Admins |
| Importiert     | Welten, die Sie selbst als .mbz-Datei importiert haben | Ja                    |

Was ist eine .mbz-Datei?  
Eine .mbz-Datei ist ein Moodle-Backup-Format. In AdLer enthält sie eine komplette Lernwelt mit allen Lernelementen (Texte, Videos, H5P-Inhalte, 3D-Modelle etc.).

---

## Weltenverwaltung öffnen

1. Öffnen Sie die AdLer 3D-Lernumgebung im Browser
2. Auf der Startseite finden Sie den Button „Weltenverwaltung"
3. Klicken Sie darauf, um das Verwaltungsfenster zu öffnen

![Startseite der AdLer-Webserver-Edition](imageManualAdLerWebServerWorldManagement.png)

---

## Für Lernende {id="f-r-lernende_1"}

Als Lernende nutzen Sie die Weltenverwaltung hauptsächlich, um von Dozenten bereitgestellte Lernwelten zu importierenl, wenn diese nicht auf dem Server selbst bereitgestellt wurden.

### Lernwelt importieren

Es gibt zwei Möglichkeiten, eine Lernwelt zu importieren:

#### Option A: Per Klick

1. Klicken Sie auf „Lernwelt importieren (.mbz)"
2. Wählen Sie die gewünschte .mbz-Datei aus
3. Der Import startet automatisch

#### Option B: Per Drag & Drop

1. Ziehen Sie die .mbz-Datei direkt in den markierten Bereich „Dateien hier ablegen"
2. Der Import startet automatisch

![Geöffnetes Weltenverwaltungsmodal](imageManualAdLerWebServerWorldManagementModal.png)

#### Import-Fortschritt

Während des Imports sehen Sie einen Fortschrittsbalken mit Statusmeldungen:

| Phase              | Beschreibung                              |
|--------------------|-------------------------------------------|
| Extrahiere Archiv  | Die .mbz-Datei wird entpackt              |
| Lese Weltdokument  | Die Lernwelt-Struktur wird analysiert     |
| Speichere Elemente | Lerninhalte werden im Browser gespeichert |
| Schließe Import ab | Abschlussarbeiten und Validierung         |

![Fenster während dem Lernweltupload](imageManualAdLerWebServerWhileUpload.png)

Nach erfolgreichem Import erscheint eine Erfolgsmeldung mit dem Namen der Lernwelt und der Anzahl der Elemente.

![Upload erfolgreich](imageManualAdLerWebServerWorldUploadSucessful.png)

### Lernwelt löschen

> ⚠️ Hinweis: Nur selbst importierte Lernwelten können gelöscht werden. Vorinstallierte Welten (mit dem Label „Vorinstalliert") sind nicht von normalen Nutzenden, ohne Zugriff auf den Webserver löschbar.

1. Finden Sie die gewünschte Lernwelt in der Liste
2. Klicken Sie auf den Löschen-Button rechts neben dem Eintrag

![Klicken des Löschen-Buttons](imageManualAdLerWebServerWorldManagementClickDelete.png)

3. Bestätigen Sie die Löschung im erscheinenden Dialog

![Löschen bestätigen](imageManualAdLerWebServerWorldConfirmDelete.png)

> **Achtung**: Das Löschen einer Lernwelt ist unwiderruflich! Alle Fortschritte in dieser Welt gehen verloren.

### Speicherplatz verwalten

Am unteren Rand der Weltenverwaltung sehen Sie eine Speicheranzeige:

```
Speicher: 245 MB / 2.1 GB belegt (12%)
████░░░░░░░░░░░░░░░░
```

Diese zeigt an:

- Wie viel Speicherplatz Ihre importierten Lernwelten belegen
- Wie viel Speicherplatz insgesamt verfügbar ist
- Den prozentualen Anteil der Nutzung

Browser-Speicherlimits:

| Browser | Typisches Limit               |
|---------|-------------------------------|
| Chrome  | \~60% des Festplattenspeichers |
| Firefox | \~50% des Festplattenspeichers |
| Safari  | \~1 GB                         |
| Edge    | \~60% des Festplattenspeichers |

> 💡 Tipp: Löschen Sie nicht mehr benötigte Lernwelten, um Speicherplatz freizugeben.
 
> **Achtung**: In der AdLer-Webserver-Edition gibt es eine Uploadgrenze von 950 MB.

---

## Für Lehrende / Dozenten

Als Lehrende nutzen Sie die Weltenverwaltung zum Testen Ihrer mit dem AdLer-Autorentool erstellten Lernwelten und zur Bereitstellung auf Webservern.

### Lernwelten testen

Der typische Workflow zum Testen einer neuen Lernwelt:

1. Erstellen Sie die Lernwelt im AdLer-Autorentool
2. Exportieren Sie die Lernwelt als .mbz-Datei
3. Importieren Sie die .mbz-Datei in der Weltenverwaltung (siehe Lernwelt importieren)
4. Testen Sie die Lernwelt in der 3D-Umgebung
5. Nehmen Sie bei Bedarf Anpassungen im Autorentool vor

### Lernwelten aktualisieren

Wenn Sie Änderungen an einer bereits importierten Lernwelt vorgenommen haben:

1. Exportieren Sie die aktualisierte Lernwelt erneut aus dem Autorentool
2. Importieren Sie die neue .mbz-Datei – die alte Version wird automatisch überschrieben

> ✅ Gut zu wissen: Sie müssen die alte Version nicht vorher löschen! Beim Import einer Lernwelt mit demselben Namen (bzw. derselben UUID) wird die bestehende Version automatisch durch die neue ersetzt. Das spart Zeit beim iterativen Testen.

> 💡 Tipp: Wenn Sie eine komplett neue Version mit anderem Namen anlegen möchten, können Sie die alte Version anschließend manuell löschen, um Speicherplatz freizugeben.

### Veröffentlichungsmodus

Der Veröffentlichungsmodus (auch „Dozentenmodus") ermöglicht es, mehrere Lernwelten als Paket zu exportieren – ideal für die Bereitstellung auf einem Webserver.

#### Veröffentlichungsmodus aktivieren

1. Aktivieren Sie die Checkbox „Veröffentlichungsmodus (Dozenten)"

![Veröffentlichungsmodus Dozenten aktiv](imageManualAdLerWebServerWorldTeacherMode.png)

> -> Die Ansicht ändert sich: Jede Lernwelt erhält eine Auswahlbox

#### Lernwelten auswählen

Nach Aktivierung des Veröffentlichungsmodus haben Sie folgende Optionen:

| Aktion                  | Beschreibung                                    |
|-------------------------|-------------------------------------------------|
| Einzelne Welt auswählen | Klicken Sie auf die Checkbox neben der Lernwelt |
| Alle auswählen          | Klicken Sie auf „Alle"                          |
| Alle abwählen           | Klicken Sie auf „Keine"                         |

Die Anzeige „X / Y ausgewählt" zeigt, wie viele Welten aktuell markiert sind.

#### Paket exportieren

1. Wählen Sie die gewünschten Lernwelten aus
2. Klicken Sie auf „Paket exportieren"

![Paket exportieren](imageManualAdLerWebServerWorldExportWorld.png)

3. Warten Sie, bis der Export abgeschlossen ist
4. Eine Datei wird automatisch heruntergeladen

Das exportierte Paket enthält:

- Alle ausgewählten Lernwelten
- Eine aktualisierte worlds.json-Datei

### Auf Webserver bereitstellen

Um Lernwelten auf einem Webserver als „vorinstallierte" Welten bereitzustellen, müssen Sie das exportierte Paket in das Verzeichnis LearningWorlds auf Ihrem Webserver kopieren.

#### Wichtig: Die worlds.json verstehen

> ⚠️ Kritischer Hinweis: Da eine statische Website keine Ordner auslesen kann, benötigt die AdLer-Anwendung eine worlds.json-Datei, die alle verfügbaren Lernwelten auflistet.

Die worlds.json hat folgende Struktur:

```json
{
  "worlds": [
    {
      "worldID": 1,
      "worldName": "Meine Lernwelt",
      "worldFolder": "Meine_Lernwelt",
      "elementCount": 42
    }
  ]
}
```

#### Szenario A: Publikation auf denselben Server (z.B. Test-Server)

Wenn Sie auf denselben Webserver publizieren, den Sie auch zum Testen verwenden:

1. Aktivieren Sie den Veröffentlichungsmodus
2. Wählen Sie ALLE Welten aus – sowohl Ihre neuen als auch die bereits vorhandenen
3. Exportieren Sie das Paket
4. Laden Sie das Paket auf den Server in das Verzeichnis LearningWorlds/

> ⚠️ Warum alle Welten? Die exportierte worlds.json ersetzt die vorhandene auf dem Server. Wenn Sie nicht alle Welten mit exportieren, werden die fehlenden Welten auf dem Server nicht mehr gefunden!

#### Szenario B: Publikation auf einen neuen/anderen Server

Wenn Sie auf einen separaten Produktions-Server publizieren:

1. Aktivieren Sie den Veröffentlichungsmodus
2. Wählen Sie nur die gewünschten Welten für diesen Server
3. Exportieren Sie das Paket
4. Laden Sie das Paket auf den Produktionsserver in das Verzeichnis LearningWorlds/

Hier müssen Sie die vorinstallierten Testwelten nicht mit exportieren, da der Ziel-Server unabhängig ist.

#### Verzeichnisstruktur auf dem Server

Nach dem Upload sollte die Struktur so aussehen:

```
/ihr-webserver/
├── index.html
├── ...
└── LearningWorlds/
    ├── worlds.json              ← Index aller Lernwelten
    ├── Lernwelt_A/
    │   ├── world.json           ← Lernwelt-Daten
    │   ├── manifest.json        ← Dateiliste
    │   └── elements/            ← Lerninhalte
    │       ├── 1.pdf
    │       ├── 2.jpg
    │       └── 5/               ← H5P-Inhalt (Ordner)
    └── Lernwelt_B/
        └── ...
```

---

## Fehlerbehebung

### Import-Fehler

| Fehlermeldung              | Ursache                                              | Lösung                                                                       |
|----------------------------|------------------------------------------------------|------------------------------------------------------------------------------|
| Datei ist zu groß          | Die .mbz-Datei überschreitet 950 MB                  | Reduzieren Sie die Dateigröße im Autorentool oder entfernen Sie große Medien |
| Ungültiges Dateiformat     | Die Datei ist keine .mbz-Datei                       | Stellen Sie sicher, dass Sie die richtige Datei ausgewählt haben             |
| Ungültige MBZ-Datei        | Die Datei ist beschädigt oder nicht im Moodle-Format | Exportieren Sie die Lernwelt erneut aus dem Autorentool                      |
| Kein gültiges Weltdokument | Die MBZ-Datei enthält keine AdLer-Lernwelt           | Prüfen Sie, ob die Datei aus dem AdLer-Autorentool stammt                    |
| Nicht genug Speicherplatz  | Der Browser-Speicher ist voll                        | Löschen Sie nicht benötigte Lernwelten                                       |

### Speicherprobleme

Problem: Import bricht ab oder Browser wird langsam

Lösungen:

1. Schließen Sie andere Browser-Tabs
2. Löschen Sie nicht benötigte Lernwelten
3. Leeren Sie den Browser-Cache (andere Websites)
4. Versuchen Sie einen anderen Browser

### Export-Fehler

| Fehlermeldung           | Ursache                                      | Lösung                                                 |
|-------------------------|----------------------------------------------|--------------------------------------------------------|
| Export fehlgeschlagen   | Allgemeiner Fehler beim Erstellen des Pakets | Versuchen Sie es erneut oder wählen Sie weniger Welten |
| Keine Welten ausgewählt | Button ist deaktiviert, weil keine Auswahl   | Wählen Sie mindestens eine Lernwelt aus                |

---

## Häufige Fragen (FAQ)

### Allgemein

F: Wo werden meine importierten Lernwelten gespeichert?  
A: Im lokalen Browser-Speicher (IndexedDB). Die Daten bleiben erhalten, solange Sie den Browser-Cache nicht löschen.

F: Kann ich Lernwelten zwischen Browsern übertragen?  
A: Nicht direkt. Exportieren Sie die Lernwelt als Paket und importieren Sie sie im anderen Browser neu (sofern Sie die Original-.mbz-Datei noch haben).

F: Funktionieren importierte Lernwelten offline?  
A: Ja, nach dem Import sind alle Inhalte lokal verfügbar und funktionieren ohne Internetverbindung.

### Für Lernende

F: Mein Dozent hat mir eine .mbz-Datei gegeben. Was soll ich tun?  
A: Öffnen Sie die Weltenverwaltung und importieren Sie die Datei per Klick oder Drag & Drop. Danach können Sie die Lernwelt starten.

F: Kann ich meinen Lernfortschritt sichern?  
A: Der Lernfortschritt wird automatisch im Browser gespeichert. Beim Löschen einer Lernwelt geht jedoch auch der Fortschritt verloren.

F: Warum kann ich manche Lernwelten nicht löschen?  
A: Welten mit dem Label „Vorinstalliert" sind auf dem Webserver hinterlegt und können nicht gelöscht werden. Nur selbst importierte Welten sind löschbar.

### Für Lehrende

F: Warum muss ich beim Export alle Welten auswählen?  
A: Die exportierte worlds.json definiert, welche Welten auf dem Webserver verfügbar sind. Fehlende Einträge führen dazu, dass Welten nicht gefunden werden.

F: Kann ich die worlds.json manuell bearbeiten?  
A: Ja, technisch ist das möglich. Stellen Sie sicher, dass die Struktur korrekt bleibt und alle referenzierten Ordner existieren.

F: Wie verteile ich Lernwelten an meine Studierenden?  
A: Sie haben zwei Optionen:

1. Vorinstalliert: Stellen Sie die Welten auf dem Webserver bereit (Veröffentlichungsmodus)
2. Individuell: Geben Sie den Studierenden die .mbz-Datei zum selbst importieren

F: Was ist der Unterschied zwischen ATF- und DSL-Format?  
A: ATF (AdLer Transfer Format) ist das aktuelle Standardformat. DSL (Domain Specific Language) ist ein älteres Format, das weiterhin unterstützt wird. Beim Export aus aktuellen Autorentool-Versionen erhalten Sie automatisch das ATF-Format.

---