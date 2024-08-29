# Software Architektur
Die Architektur des Backends folgt dem Konzept der Clean Architecture und ist in mehrere Schichten unterteilt, die eine klare Trennung der Verantwortlichkeiten gewährleisten.

![Backend Architekturüberblick.png](Backend Architekturüberblick.png)

1. **Controller und Interfaces:**
   Diese äußere Schicht enthält die REST-Schnittstelle, die als Einstiegspunkt für externe Anfragen dient. Sie leitet die Anfragen an die Geschäftslogik weiter.

2. **Geschäftslogik:**
    - **Mediator:** Orchestriert den Kontrollfluss zwischen den verschiedenen Komponenten.
    - **UseCases:** Implementieren die spezifischen Anwendungsfälle und Geschäftsregeln.
    - **Interfaces:** Definieren Verträge für externe Dienste und Repositories.

3. **Entitäten:**
   Repräsentieren die grundlegenden Datenstrukturen und Geschäftsobjekte.

4. **Frameworks und Treiber:**
    - **Entity Framework Repository:** Implementiert den Datenbankzugriff.
    - **Moodle Backup Processor:** Verarbeitet Moodle-Backups.
    - **Moodle Webservice:** Kommuniziert mit Moodle.
    - **Serialisierungs Service:** Handhabt die Serialisierung von Daten.
    - **Filesystem Zugriff:** Ermöglicht den Zugriff auf das Dateisystem.

Die Architektur folgt dem Dependency Inversion Principle, wobei die inneren Schichten Interfaces definieren, die von den äußeren Schichten implementiert werden. Dies gewährleistet eine lose Kopplung und erleichtert Wartung und Erweiterbarkeit.
