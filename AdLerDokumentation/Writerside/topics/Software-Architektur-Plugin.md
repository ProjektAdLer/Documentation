# Software Architektur

> Die Architektur der Plugins entspricht dem Moodle-Standard. Deshalb ist hierfür die Moodle-Dokumentation zu 
> studieren. Dieser Artikel gibt lediglich einen Überblick über die Plugins, die für AdLer entwickelt wurden.
> {style='info'}

Zur Integration von AdLer in Moodle sind mehrere Plugins notwendig. Dies ist bedingt durch das Konzept von Moodle, dass
so ziemlich alles ein Plugin ist und viele dieser Plugins wiederrum die Möglichkeit bieten durch andere Plugins 
erweitert zu werden. So ist beispielsweise jedes [Modul](modul-moodle-VP.md) ein Plugin, genauso wie die Regeln,
nach denen [Sections](Section-VP.md) in Kursen freigeschaltet werden. Für weitere Informationen zu den verschiedenen
Plugin-Typen siehe die [Moodle-Dokumentation](https://moodledev.io/docs/4.5/apis/plugintypes).

Die Moodle-Integration von AdLer ist derzeit durch folgende Plugins realisiert:
- local_adler: Dieses Plugin ist das Hauptplugin von AdLer. Es implementiert das Punktesystem sowie die Schnittstellen
  zur Abgabe von Lernelementen. Außerdem bietet es die Schnittstelle zum Upload von Kursen 
  ([Lernwelten](Lernwelt-GE.md)) und zur Konvertierung von UUIDs zu Moodle-IDs.
- local_logging: Dies ist ein primitives Logging-Plugin, welches die Möglichkeit bietet beliebige Nachrichten in die 
  Moodle-Logdatenbank zu schreiben. Moodle selbst bietet, abgesehen von CLI-Skripten, keinerlei Log-Möglichkeiten.
- mod_adleradaptivity: Dieses Plugin implementiert das das [Adaptivitätselement](Adaptivitätselement-GE.md) in Moodle
- availability_adler: Dieses Plugin implementiert die Verfügbarkeitsregeln der [Sections](Section-VP.md) in Kursen
  (AdLer-[Räume](Lernraum-GE.md))

![](image-plugins-plugin-overview.png)


Die Plugins kommunizieren weitestgehend nur (indirekt) über Moodle-Schnittstellen untereinander. Direkte Kommunikation
findet nur in folgenden Fällen statt:
- local_logging wird wie eine library genutzt und daher direkt von allen Plugins angesprochen
- local_adler wird von availability_adler aufgerufen, um den completion Status und den Namen von 
  [Sections](Section-VP.md) zu erhalten