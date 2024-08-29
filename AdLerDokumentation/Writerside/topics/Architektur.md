# Architektur
Die Architektur von AdLer umfasst vier zentrale Komponenten: das Autorentool mit Generator, die 3D-Lernumgebung, das Backend und Moodle mit eigenen Plugins. Die Interaktion zwischen diesen Komponenten erfolgt über eigens definierte REST-Schnittstellen, um eine nahtlose Kommunikation und Datenübertragung zu gewährleisten.

Das **Autorentool** wird auf der Maschine des Autors verwendet und ermöglicht die Erstellung von Kursinhalten, die im ATF-Format (AdLer Transfer Format) gespeichert werden. Diese Inhalte werden über das **Backend** an die **3D-Lernumgebung** übertragen, die auf den Maschinen der Lernenden läuft. Hier werden die Kurse in einer immersiven 3D-Umgebung dargestellt.

Das **Backend** fungiert als zentrale Schnittstelle, die die Kommunikation zwischen dem Autorentool und den Lernumgebungen sowie Moodle ermöglicht. Es verarbeitet und leitet die Kursdaten weiter. Für die Integration in Moodle werden die Kurse im Moodle-Backup-Format (.mbz) vom Autorentool über das Backend in das Lernmanagementsystem (LMS) Moodle importiert.

**Moodle** dient als Plattform für die Verwaltung und Bereitstellung der Kursinhalte. Mit speziell entwickelten Plugins wird die Integration und Verwaltung der im .mbz-Format vorliegenden Kurse erleichtert.

![Überblick Adler.png](Überblick_Adler.png)

```plantuml
@startuml
|User|
start :Start Node;
if (PathWayView opened?) then (No)
  :Open PathWayView;
endif
:Click on toggle switch button of PathWayCondition to edit;

|AuthoringTool|
if (current condition) then (AND)
  :Change condition of object to OR;
else (OR)
  :Change condition of object to AND;
endif

|User|
stop
@enduml
```