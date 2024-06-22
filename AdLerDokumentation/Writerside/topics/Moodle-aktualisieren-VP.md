# Moodle aktualisieren

Das Update von Moodle und der AdLer-Moodle-Plugins ist ein manueller und aufwändigerer Prozess.
Insbesondere das Update der Moodle-Version ist ein riskanter Prozess, weshalb die Erstellung eines [Backups](Adler-installieren-VP.md#backup) vor dem Update dringend anzuraten ist.

Da für unsere Moodle-Version keine fertigen Docker-Images ausgeliefert werden, müssen diese lokal von Docker gebaut werden.
Beim ersten Start des Containers geschieht dies automatisch, darauffolgend muss dies explizit angefordert werden.
Dazu muss beim start des Docker-Compose Prozesses das Flag `--build` angegeben werden (bspw. `docker-compose up -d --build`).
Der Build-Prozess wird über sogenannte [Build arguments](https://docs.docker.com/build/guide/build-args/) gesteuert.
Diese finden sich in der `docker-compose.yml` Datei unter `services.moodle.build.args`.

## Plugins aktualisieren
Der Prozess zum Aktualisieren der AdLer-Moodle-Plugins ist weitestgehend automatisiert.

**Schritt 1: Auswahl des Release-Sets** \
Als Erstes muss ein [Release-Set](Release-Set-VP.md) der Plugins gewählt werden.
Die Release-Sets der Plugins sind in [dieser Datei](https://github.com/ProjektAdLer/moodle-docker/blob/main/plugin-releases.json) definiert.
Bei der Auswahl des Release-Sets ist auf die Kompatibilität der Plugins mit der aktuellen Moodle und PHP-Version zu achten.
Dies ist derzeit nicht für das Release-Set selbst dokumentiert, stattdessen muss in den README-Dateien aller Plugins nachgeschaut
und ein [Release-Set](Release-Set-VP.md) gefunden werden, welches mit der aktuellen Moodle-Version (und PHP-Version) kompatibel ist.

**Schritt 2: Anpassen der `docker-compose.yml`** \
In der `docker-compose.yml` Datei muss das Release-Set unter `services.moodle.environment.PLUGIN_VERSION` angegeben werden.

**Schritt 3: Neustart von Moodle** \
Wie zuvor beschrieben muss das Image neu gebaut werden.
Dazu muss der Moodle-Container zuerst gestoppt und dann mit dem Flag `--build` neu gestartet werden.
Dazu den folgenden Befehl ausführen: `docker compose stop moodle && docker compose up -d --build moodle`.

**Hinweis:** Es kann auch der gesamte Docker Compose Stack neu gestartet werden: `docker-compose down && docker-compose up -d --build`.

**Hinweis bei Nutzung von Portainer:** Portainer baut das Image nicht neu, wenn ein Build-Argument geändert wird.
Folgender Workaround ist deshalb nötig:
1. Moodle-Container stoppen
2. Moodle-Container löschen
3. Moodle-Image löschen
4. Moodle-Container erneut starten

Das Update sollte nun automatisch eingespielt werden.
Nach erfolgtem Neustart kann in Moodle die Version der installierten AdLer-Plugins überprüft werden.


## Moodle-Update
Moodle bietet keinen automatisierten Update-Prozess, die Aktualisierung muss vollständig manuell durchgeführt werden.

Vor Beginn des Update-Prozesses wird empfohlen, sich mit den folgenden Dokumentationen vertraut zu machen.
- [Moodle Update Dokumentation](https://docs.moodle.org/404/de/Aktualisierung_von_Moodle)
- [Bitnami Update Dokumentation](https://docs.bitnami.com/aws/apps/moodle/administration/upgrade/)

**Schritt 1: Backup** \
Vor dem Update sollte ein [Backup](Adler-installieren-VP.md#backup) der AdLer-Instanz angelegt werden.

**Schritt 2: Shell im Moodle-Container öffnen** \
Die Befehle zum Aktualisieren von Moodle müssen im Moodle-Container als User `daemon` ausgeführt werden.
Der folgende Befehl, ausgeführt in dem Ordner, in welchem die `docker-compose.yml` von AdLer liegt, öffnet eine Shell im Moodle-Container: `docker-compose exec -u daemon moodle bash`.

**Schritt 3: Update durchführen** \
Hierzu der Dokumentation von [Moodle](https://docs.moodle.org/404/de/Aktualisierung_von_Moodle#Neue_Moodle-Version_installieren), bzw. der von [Bitnami](https://docs.bitnami.com/aws/apps/moodle/administration/upgrade/) folgen.

**Schritt 4: Datenbank aktualisieren** \
Dies ist entweder über das Kommandozeilen-Scrip `php admin/cli/upgrade.php` (im Verzeichnis von Moodle) oder über das Webinterface möglich.
Für weniger erfahrene Nutzer ist das Webinterface zu empfehlen.

**Schritt 5: Update des Build-Arguments MOODLE_VERSION** \
Das Flag `services.moodle.build.args.MOODLE_VERSION` in der `docker-compose.yml` wird zwar nur beim ersten Start des Containers genutzt,
sollte jedoch aus Dokumentations- und Konsistenzzwecken auf die aktuelle Moodle-Version gesetzt werden.

**Hinweis:** Moodle kann auch noch aktualisiert werden, wenn es nach der Laufzeit des AdLer-Projekts keine offiziellen Updates mehr gibt.
Die Wahrscheinlichkeit für Fehler ist jedoch recht hoch, wenn eine neue Version von Moodle genutzt wird (bspw. von Moodle 4.2 auf Moodle 4.3).
Sollte dies versucht werden ist es ratsam zuerst alle Tests aller Plugins mit der neuen Version von Moodle durchzuführen.
Es ist jedoch problemlos möglich Sicherheitsupdates einzuspielen (bspw. von Moodle 4.2.1 auf Moodle 4.2.2).
AdLer unterstützt die LTS Version 4.1 und die normale Version 4.4, welche [bis Ende 2025 Sicherheitsupdates erhalten werden](https://moodledev.io/general/releases).
