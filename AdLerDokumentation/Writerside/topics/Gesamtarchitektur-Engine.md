# Gesamtarchitektur

## Architektur

Die Architektur der AdLer Engine folgt der von Uncle Bob aufgestellten Clean Architecture ([_Robert C. Martin (Uncle Bob)_, The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)).

Die Abhängigkeitsregel wird eingehalten. Codeteile einer inneren Schicht sind folglich nicht vom Code einer äußeren Schicht abhängig. Übergänge zwischen Schichten werden über Ports behandelt, die nach dem Dependency Inversion Prinzip angelegt sind.

Im folgenden Diagramm sind die Schichten mit ihren Namen in der Projektstruktur dargestellt. Die Komponenten innerhalb der Schichten sind beispielhaft und zeigen eine mögliche Kommunikation zwischen den Schichten.

![CleanArchitecture.png](imageCleanArchitecture.png){width="700"}

## Komponenten

<!-- Design Artikel hier verlinken -->

![imageAdLerEngineComponentDiagram.jpg](imageAdLerEngineComponentDiagram.jpg){width="700"}