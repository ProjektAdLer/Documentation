# Integration und E2E Testing

## Voraussetzungen, um Integration und E2E Tests zu schreiben und auszuführen
- WSL (Windows Subsystem for Linux) installiert

  Dazu den Command `wsl --install` in der PowerShell ausführen.
- Eine JetBrains-IDE (am besten WebStorm) installiert
- Docker installiert (und bereits getestet, ob es läuft)
- Line-Endings in Git auf "input" gesetzt (Das ist sehr wichtig!)

  `git config --global core.autocrlf input`

## Schritt für Schritt Anleitung

### 1. WSL (Windows Subsystem for Linux) installieren
Um WSL zu installieren, zunächst das Terminal in Windows öffnen. Dann den Command `wsl --install` ausführen.
Dieser installiert WSL und die benötigten Komponenten. Nach der Installation muss der Computer neu gestartet werden.

Danach erneut das Terminal öffnen und den Befehl `wsl` ausführen. Damit wird die WSL-Shell geöffnet.
Nun kann ein Nutzer für die WSL-Shell erstellt werden. Dazu einfach dem Installationsprozess folgen.

Nun den Befehl `sudo apt install nodejs npm` ausführen, um Node.js und npm zu installieren. Dies wird benötigt, um die Tests auszuführen.

Danach die Befehle `npx playwright install` und `sudo npx playwright install-deps` ausführen. Damit installieren wir Browser, mit denen wir Tests ausführen können.

Der Befehl `npx playwright install` muss auch nochmal in einer Windows-Konsole ausgeführt werden.

> **Hinweis:** Wenn ihr Genaueres wissen wollt, warum wir WSL nutzen müssen, gerne Philipp oder Markus darauf ansprechen. :) Momentan ist das leider ein notwendiges Übel.

### 2. Die AdLer-Umgebung starten

**Schritt 1:** Docker-Compose generieren

Es muss mittels dem Befehl `docker compose -f docker-compose.base.yml -f docker-compose.test-adjustments.yml config > docker-compose.yml` zunächst eine `docker-compose.yml` Datei generiert werden.

**Schritt 2:** Docker-Compose starten

Das Kommando `docker compose up -d --build --force-recreate --wait` startet die Umgebung. Das kann einige Zeit dauern, da die Images erst gebaut und eingerichtet werden müssen.

![WebstormDockerCompose.png](WebstormDockerCompose.png)

### 3. Snapshot in WSL erstellen

Wir erstellen nun einen Snapshot, damit wir unsere Tests öfters ausführen können und nicht jedes Mal unsere Umgebung manuell neu aufsetzen müssen.
Dazu müssen wir allerdings in WSL arbeiten. Deshalb muss in die Konsole nun der Befehl `wsl` eingegeben werden. Von nun an habt ihr in dieser Konsole Zugriff auf die WSL-Shell.

Dort angekommen führen wir den Befehl `./docker-volumes-snapshot.sh snapshot` aus. Das erstellt einen Snapshot, den wir später wiederherstellen können. Sollte die Meldung kommen, dass die Datei nicht gefunden wurde, wurden vermutlich die
Line-Endings nicht auf "input" gesetzt. Dazu bitte die Voraussetzungen oben auf dieser Seite nochmal überprüfen.

> **Hinweis:** Wir werden weiterhin ab jetzt fast alles in dieser WSL-Umgebung machen, da die Integrationstests auf die Linux-Umgebung angewiesen sind.
>
> **Hinweis:** Bitte auch die Readme im Projekt-Repo beachten. Dort sind nochmal alle Schritte aufgelistet. Auch wie man die Umgebung aktualisiert und updated ist dort beschrieben.

### 4. Die IDE (WebStorm) einrichten
In WebStorm muss zunächst für das Projekt "Game" der Befehl `npm install` ausgeführt werden. Dazu zur Datei `package.json` navigieren. Nun müsste WebStorm einen Hinweis anzeigen, dass die Dependencies noch nicht installiert sind. Diesen Hinweis einfach bestätigen.
Sollte das nicht der Fall sein, muss in der Konsole in den Ordner "Game" navigiert werden und dort der Befehl `npm install` ausgeführt werden.

> **Hinweis:** Das Repo hat insgesamt 4 Projekte, in denen Komponenten getestet werden. Deshalb ist es wichtig, dass man sich im Ordner "Game" befindet.

Um nun die Tests über WSL starten zu können, muss WebStorm erstmal eine "Default-Config" anlegen. Deshalb starten wir einen beliebigen Test einfach über das UI von WebStorm (siehe Screenshot). Die Tests befinden sich in
`Game/test/`. Dort den Test `login.spec.ts` auswählen und den Test über das UI starten. Dieser Test wird zwar fehlschlagen, aber WebStorm wird eine Konfiguration anlegen.

![FailingTest.png](FailingTest.png)

Sobald der Test fehlgeschlagen ist, können wir die Konfiguration öffnen. Dazu rechts oben bei WebStorm auf "Edit Configurations" klicken.
Dort können wir dann den "Node Interpreter" auf "WSL" umstellen. Dazu einfach auf das Dropdown-Menü klicken und dann "Add" auswählen. Dort können wir dann "Ubuntu" auswählen.

![UbuntuAsNodeInterpreter.png](UbuntuAsNodeInterpreter.png)

Jetzt können wir den Test nochmal starten. Jetzt wird er ungefähr 30 Sekunden laufen (während dieser Zeit wird die Umgebung aufgesetzt) und dann erfolgreich abschließen.