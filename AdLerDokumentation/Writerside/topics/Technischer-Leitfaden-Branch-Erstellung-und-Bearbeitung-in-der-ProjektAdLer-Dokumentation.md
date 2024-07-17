# Technischer Leitfaden: Branch-Erstellung und Bearbeitung in der ProjektAdLer Dokumentation

## 0. Das Projekt Clonen
Dazu Writersiede starten und ein neues Projekt aus Git clonen.

Das Repo ist unter folgendem Link zu finden: 

https://github.com/ProjektAdLer/Documentation

![Clonen.png](Clonen.png)

## 1. Eigenen Branch erstellen

1. Das ProjektAdLer Dokumentations-Projekt in JetBrains Writerside öffnen.
2. In der oberen Menüleiste auf den aktuellen Branch-Namen klicken (im Screenshot ist "main" ausgewählt).
3. Im Dropdown-Menü "New Branch..." auswählen. Alternativ kann die Tastenkombination Strg+Alt+N verwendet werden.
4. Im sich öffnenden Dialogfeld den neuen Branch nach dem Schema benennen: `KorrekturXX1207`
    - XX steht für das Personenkürzel
    - 1207 ist das aktuelle Datum (z.B. 12. Juli)
5. Die Erstellung des neuen Branches bestätigen.

![neuerBRanch.png](neuerBRanch.png)

## 2. Topics finden und lesen

1. Im Projekt-Explorer zum Ordner mit den Topics navigieren
2. Die relevanten Topic-Dateien durch Doppelklick öffnen.

![WriterSide_Overview](WriterSide_Overview.png)

## 3. Änderungen und Kommentare einfügen

1. Den Inhalt der Topic-Datei lesen.
2. Für Änderungen:
    - Den Text direkt im Editor korrigieren. (Die änderungen werden von Git hervorgehoben. Das müsst ihr nicht extra markieren)
3. Für Kommentare:
    - Einen Kommentar im folgenden Format einfügen:
      ```
      [//]: # (TODO: XX: Rechtschreibfehler entfernen)
      ```
    - "XX" durch das Personenkürzel ersetzen.
    - Wenn ihr diese mit TODO: beginnt, werden sie in der Writerside als Aufgaben angezeigt.

## 4. Änderungen committen

1. Das Git-Fenster öffnen (Roter pfeil auf dem Bild).
2. Die geänderten Dateien auswählen.

   **Wichtig: Es muss der eigene Branch ausgewählt sein. (Auf dem Screenshot der Rote Kreis)**
3. Eine aussagekräftige Commit-Nachricht eingeben.
4. Auf "Commit and Push" klicken. Somit werden die Änderungen auf den eigenen Branch auf GitHub hochgeladen.
5. Eventuell wird nach dem GitHub-Passwort gefragt. Dabei mit den GitHub Zugangsdaten anmelden, welche auch in der AdLer Organisation verwendet werden.

![Writerside_Commit.png](Writerside_Commit.png)

## 5. Pull Request auf GitHub erstellen
Diesen Schritt werden die Entwickler dann übernehmen