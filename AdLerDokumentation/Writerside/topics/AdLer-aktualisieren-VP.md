# Adler aktualisieren

Im ersten Abschnitt [AdLer aktualisieren](#adler-aktualisieren) wird beschrieben, wie alle Komponenten von AdLer außer Moodle 
aktualisiert werden. Das Update von Moodle wird im zweiten Abschnitt [Moodle aktualisieren](#moodle-update) 
beschrieben.

## AdLer aktualisieren

**Hinweis:** Bevor ein Update eingespielt wird sollte ein [Backup](Adler-installieren-VP.md#backup) der AdLer-Instanz angelegt werden.

Die Anleitung zum Aktualisieren von AdLer findet sich [hier im AdLerStack Repository](https://github.com/ProjektAdLer/AdLerStack/blob/main/docs/deploying_adler.md#updating).


### Moodle-Update
Moodle bietet keinen automatisierten Update-Prozess, die Aktualisierung muss vollständig manuell durchgeführt werden.

Vor Beginn des Update-Prozesses wird empfohlen, sich mit den folgenden Dokumentationen vertraut zu machen.
- [Dokumentation im AdlerStack Repository](https://github.com/ProjektAdLer/MoodleAdlerLMS?tab=readme-ov-file#updating-moodle)
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
