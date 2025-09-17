# Administration in Moodle

## Wichtige Hinweise für Moodle-Administratoren
- Moodle Administratoren dürfen keine AdLer [Kurse](Lernwelt-GE.md) in Moodle löschen. Dies wird derzeit nicht
  unterstützt.
- Moodle Administratoren müssen den Abschnitt [Nutzer löschen](#nutzer-l-schen) beachten, wenn sie Nutzer in Moodle löschen.

## Nutzer verwalten

### Nutzer anlegen
Accounts für studierende in AdLer unterscheiden sich nicht von Accounts für Studierende in Moodle.
Daher ist hierfür die Moodle-Dokumentation zu Rate zu ziehen: 
[Nutzerkonto anlegen](https://docs.moodle.org/404/de/Nutzerkonten_anlegen), 
[Nutzer/in neu anlegen](https://docs.moodle.org/404/de/Nutzer/in_neu_anlegen)

Accounts für Lehrende benötigen die "adler_manager" Rolle in der 
[Kurskategorie](Kurskategorie-VP.md), für welche sie verantwortlich sind.
Ein Moodle-Administrator kann dies, folgend der 
[Moodle-Dokumentation](https://docs.moodle.org/404/de/Kursbereichseinschreibung) einrichten.

#### Nutzer per Kommandozeilen-Script anlegen

> Dieser Abschnitt ist nur für erfahrene Administratoren geeignet, es ist einfach möglich,
> durch fehlerhafte Eingaben die Moodle-Instanz zu beschädigen.
> {style='warning'}

Zum vereinfachten Anlegen (vieler) Nutzer gibt es ein Kommandozeilen-Script, welches die Rollenzuweisung übernimmt.

**Wichtig**: Das Script muss als der User ausgeführt werden, als welcher auch der Webserver läuft. 
Bei Nutzung unseres Docker-Setups ist dies der User `daemon`.

Das Script `local/declarativesetup/cli/create_course_cat_and_assign_user_role.php` bietet folgende Parameter:
- `--username` (erforderlich) - Der Nutzername des Nutzers, welcher die Rolle zugewiesen bekommen soll.
- `--role` (erforderlich) - Die Rolle, welche zugewiesen werden soll. Zum Anlegen von Adler-Managern 
(Lehrenden-Accounts) ist dies `adler_manager`.
- `--category_path` - Dies ist ein optionaler Parameter, welcher den vollständigen Pfad (siehe 
[Unterkursbereiche](https://docs.moodle.org/404/de/Kursbereiche#Unterkursbereiche_anlegen)) der 
[Kurskategorie](Kurskategorie-VP.md) angibt. Wird dieser Parameter nicht angegeben, wird eine neue Kategorie mit dem 
Pfad `adler/<username>` erstellt.

### Nutzer löschen
Nutzer können ganz normal in Moodle gelöscht werden

> Das Entfernen von Nutzern ist derzeit nicht vollständig im Projekt umgesetzt. Es ist möglich, dass im 
> [Backend](Backend-GE.md) noch verbleibende Daten von Nutzern existieren, welche bereits in Moodle gelöscht wurden.
> Dies sollte bei der regulären Nutzung aber keine Probleme verursachen
> {style='note'}
 
> Beim Löschen von Lehrenden-Accounts ist zu beachten, dass seine [Kurse](Lernwelt-GE.md) dann nicht mehr fehlerfrei 
> gelöscht werden können.
> {style='warning'}
