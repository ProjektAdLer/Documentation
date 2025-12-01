# AdLer-Webserver-Edition – Installationsanleitung

Diese Anleitung erklärt Schritt für Schritt, wie Sie die AdLer 3D-Lernumgebung auf Ihrem Computer oder einem Webserver zum Laufen bringen – ohne tiefgreifende Programmierkenntnisse.

---

## Inhaltsverzeichnis

1. Was Sie brauchen
2. Download
3. Lokale Installation (auf Ihrem Computer)
4. Installation auf einem Webserver
5. Eigene Lernwelten hinzufügen
6. Fehlerbehebung

---

## Was Sie brauchen

- Einen aktuellen Browser: Chrome, Firefox, Edge oder Safari
- Den AdLer-Build: Eine ZIP-Datei, die Sie herunterladen
- Für lokalen Betrieb: Die kostenlose App „Simple Web Server"
- Für Webserver: Zugang zu einem Webhosting (z.B. bei Ihrem IT-Service)

---

## Download

1. Laden Sie hier die aktuelle [AdLer-Webserver-Edition](https://github.com/ProjektAdLer/projektadler.github.io/archive/refs/heads/main.zip) herunter. ([https://github.com/ProjektAdLer/projektadler.github.io/archive/refs/heads/main.zip](https://github.com/ProjektAdLer/projektadler.github.io/archive/refs/heads/main.zip))
2. Entpacken Sie das Archiv an einem Ort Ihrer Wahl

Nach dem Entpacken haben Sie einen Ordner mit dieser Struktur:

```
adler-3d-lernumgebung/
├── index.html           ← Startseite
├── LearningWorlds/      ← Hier liegen die Lernwelten
│   ├── worlds.json
│   └── [Lernwelt-Ordner]/
└── static/              ← Anwendungsdateien
    └── ...
```

---

## Lokale Installation (auf Ihrem Computer)

Ideal für: Einzelnutzung, Tests, Präsentationen

### Schritt 1: Simple Web Server installieren

Simple Web Server ist eine kostenlose, frei verfügbare, einfache App, mit MIT-License für Windows, Mac und Linux.

1. Öffnen Sie [simplewebserver.org](https://simplewebserver.org)
2. Klicken Sie auf Download
3. Installieren Sie die App

![Dowwnloadseite Simple Web Server](imageManualAdLerWebServerSimpleWebServerDownload.png)

### Schritt 2: Server starten

1. Starten Sie Simple Web Server
![Initialer Zustand nach Öffnen Simple Web Server](imageManualAdLerWebServerSimpleWebServerInitial.png)
2. Klicken Sie auf den Button "Neuer Server"
![Neuen Server hinzufügen](imageManualAdLerWebServerSimpleWebServerAddServer.png)
3. Klicken Sie dann auf das gelbe Ordnersymbol oben rechts und wählen im sich öffnenden Betriebssystemdialog den entpackten, heruntergeladenen Ordner mit der AdLer-Webserver-Edition aus
4. Klicken Sie auf "Server erstellen"
5. Ihr Server läuft nun.

### Schritt 3: Lernumgebung öffnen

1. In Simple Web Server: Klicken Sie auf den soeben angelegten Server.
2. Klicken Sie auf den blauen Link (z.B. http://localhost:8080 oder http://127.0.0.1:8080 je nach dem, welcher Port im laufenden Server angegeben ist)
2. Ihr Browser öffnet sich mit der AdLer 3D-Lernumgebung
3. Fertig! 🎉

> 💡 Wichtig: Simple Web Server muss im Hintergrund laufen, solange Sie die Lernumgebung nutzen möchten.

---

## Installation auf einem Webserver

Ideal für: Bereitstellung für mehrere Nutzer, Intranet, Internet

### Einfache Variante: Dateien hochladen

Wenn Sie Zugang zu einem Webhosting haben (z.B. über Ihre Hochschule oder einen Hosting-Anbieter):

1. Verbinden Sie sich mit Ihrem Webserver (z.B. per FTP oder Web-Oberfläche)
2. Laden Sie alle Dateien aus dem entpackten AdLer-Ordner hoch
3. Öffnen Sie die URL Ihres Webservers im Browser

Das war's! Die AdLer-Anwendung besteht nur aus statischen Dateien und benötigt keine besondere Server-Software.

### Was Sie Ihrem IT-Service mitteilen können

Falls Ihr IT-Service die Installation übernimmt, hier die wichtigsten Infos:

> Anforderungen:
>
> - Statischer Webserver (beliebig: Apache, Nginx, IIS, etc.)
> - Keine serverseitige Programmierung erforderlich (kein PHP, Node.js, etc.)
> - HTTPS empfohlen (aber nicht zwingend erforderlich)
> - SPA-Routing: Alle 404-Fehler sollten auf index.html umgeleitet werden

---

## Eigene Lernwelten hinzufügen

Die heruntergeladene ZIP-Datei enthält bereits eine Demo-Lernwelt. Um eigene Lernwelten hinzuzufügen, nutzen Sie die Weltenverwaltung direkt in der Anwendung.

### Für einzelne Nutzer bzw. Lokal (Import)

1. Öffnen Sie die AdLer 3D-Lernumgebung  (wie beschrieben im Browser)
2. Klicken Sie oben links auf „Weltenverwaltung"
3. Klicken Sie auf „Lernwelt importieren (.mbz)"
4. Wählen Sie Ihre .mbz-Datei aus, die sie zuvor aus dem AdLerr-Autorentool exportiert haben
5. Die Lernwelt wird in Ihrem Browser gespeichert

> 💡 Die importierten Welten bleiben auch nach dem Schließen des Browsers erhalten.

### Für Webserver (Vorinstallierte Welten)

Wenn Sie Lernwelten für alle Nutzer vorinstalliert bereitstellen möchten:

1. Öffnen Sie die AdLer 3D-Lernumgebung lokal oder auf Ihrem Webserver
2. Importieren Sie alle gewünschten Lernwelten
3. Aktivieren Sie den „Veröffentlichungsmodus (Dozenten)"
4. Wählen Sie alle Welten aus, die vorinstalliert sein sollen
5. Klicken Sie auf „Paket exportieren"
6. Entpacken Sie das heruntergeladene .zip Paket
7. Kopieren Sie den Inhalt in den LearningWorlds/-Ordner auf Ihrem Webserver oder ihrer lokalen AdLer-Webserver-Edition

> ⚠️ Wichtig: Wenn auf dem Webserver bereits Welten vorhanden sind, müssen Sie diese beim Export mit auswählen! Sonst werden sie überschrieben.

---

## Fehlerbehebung

### Die Seite lädt nicht / zeigt nur weiße Seite

Mögliche Ursachen:

- Die Dateien wurden nicht vollständig entpackt
- Simple Web Server zeigt auf den falschen Ordner
- Der Browser ist veraltet

Lösungen:

1. Entpacken Sie die ZIP-Datei erneut vollständig
2. Stellen Sie sicher, dass Sie den Ordner mit der index.html ausgewählt haben
3. Aktualisieren Sie Ihren Browser

### Keine Lernwelten werden angezeigt

Mögliche Ursachen:

- Keine Lernwelten im LearningWorlds/-Ordner
- Die Datei worlds.json fehlt oder ist fehlerhaft

Lösungen:

1. Prüfen Sie, ob der Ordner LearningWorlds/ existiert
2. Prüfen Sie, ob eine worlds.json-Datei darin liegt
3. Importieren Sie eine Lernwelt über die Weltenverwaltung

### H5P-Inhalte funktionieren nicht

Mögliche Ursachen:

- Die H5P-Dateien wurden nicht korrekt entpackt
- Fehlende Dateien im Lernwelt-Ordner

Lösungen:

- Importieren Sie die Lernwelt erneut über die Weltenverwaltung
- Prüfen Sie, ob im elements/-Ordner H5P-Unterordner vorhanden sind

### „Seite nicht gefunden" beim Neuladen

Ursache: Der Webserver leitet nicht korrekt auf index.html um

Lösung für Simple Web Server:

- Dieses Problem tritt bei Simple Web Server normalerweise nicht auf
- Falls doch: Navigieren Sie zurück zur Startseite

Lösung für Webserver:

- Bitten Sie Ihren IT-Service, alle 404-Fehler auf index.html umzuleiten

---

## Häufige Fragen

F: Brauche ich Internet, um die Lernumgebung zu nutzen?  
A: Nein! Nach dem Herunterladen und Einrichten funktioniert alles offline.

F: Kann ich die Lernumgebung auf einem USB-Stick transportieren?  
A: Ja! Kopieren Sie den gesamten Ordner auf den USB-Stick. Sie brauchen dann nur noch Simple Web Server auf dem Zielrechner.

F: Wie viel Speicherplatz braucht die Anwendung?  
A: Die Grundanwendung benötigt ca. 200-300 MB. Jede Lernwelt kann je nach Inhalt zwischen 10 MB und mehreren hundert MB groß sein.

F: Können mehrere Personen gleichzeitig auf einem Webserver lernen?  
A: Ja! Jeder Nutzer arbeitet unabhängig in seinem eigenen Browser.

---

## Weitere Hilfe

| Ressource                  | Link                           |
|----------------------------|--------------------------------|
| Weltenverwaltung-Anleitung | WORLD_MANAGEMENT_USER_GUIDE.md |
| AdLer-Projektseite         | projekt-adler.eu               |
| Probleme melden            | GitHub Issues                  |

---

Dokumentversion: 1.0 | Stand: November 2025