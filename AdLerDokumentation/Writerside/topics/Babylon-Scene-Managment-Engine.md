# Babylon Scene Management

Im Folgenden werden die Komponenten des Szenenmanagments für [Babylon](Babylon-js-Engine.md)-Szenen in der AdLer Engine im Detail erläutert.

## BabylonCanvas

Der BabylonCanvas ist eine React-Komponente, über die sich eine Babylon-Szene in die übergreifende Ract-Struktur einbinden lässt.

Der BabylonCanvas übernimmt folgende Aufgaben:
- Verwaltung des Rendercanvas im Browser (inklusive von Resize-Events)
- Erstellen der Babylon-Engine Instanz
- Erstellen des ScenePresenters für den gegebenen SceneDefinition-Typ
- Anstoß des Szenenerstellungsprozesses
- Starten des Renderloops

Der BabylonCanvas orientiert sich grob an der von Babylon selbst vorgeschlagenen SceneComponent
([_Babylon.js and React_ aus Babylon.js Doku](https://doc.babylonjs.com/communityExtensions/Babylon.js+ExternalLibraries/BabylonJS_and_ReactJS)).

## ScenePresenter

Der ScenePresenter ist eine Klasse die folgende Aufgaben übernimmt:
- Zur Verfügung stellen von Funktionen zur Manipulation der Szene für den Rest des Codes
- Haltung ihrer SceneDefinition (wie Strategie-Muster)

Der ScenePresenter erhält eine SceneDefinition-Instanz im Constructor. Pro SceneDefinition kann nur ein ScenePresenter existieren. Dies wird von der ScenePresenterFactory durchgesetzt, die im CoreDIContainer gebunden ist:
```Typescript
const scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
	SCENE_TYPES.ScenePresenterFactory
);
// sceneDefinitionType entspricht dem Typ definiert bei der BabylonCanvas API
const scenePresenter = scenePresenterFactory(sceneDefinitionType);
```

## SceneDefinition

Die SceneDefinition-Klassen beschreiben, die zur Erstellung einer Babylon Szene benötigten Schritte und sichern ihre korrekte Ausführung, bevor die Szene gerendert werden soll.

### AbstractSceneDefinition

Die AbstractSceneDefinition beschreibt einerseits die öffentliche Schnittstelle, über die der ScenePresenter mit seiner SceneDefinition kommunizieren kann. Diese Methoden enthalten Funktionalität die allen SceneDefinitions gemein ist, weshalb die AbstractSceneDefinition als abstrakte Klasse statt als Interface implementiert ist.

- **Getter für Szene und Highlight Layer**: kann um weitere Getter erweitert werden, falls Teile der Szene nach außen offengelegt werden sollen
- **createScene-Methode**: regelt den Ablauf der Szenenerstellung; Szeneninstanz erstellen -> preTasks ausführen -> Szene initialisieren

Auf der anderen Seite definiert die AbstractSceneDefinition die privaten Methoden, die von allen konkreten SceneDefinition implementiert werden müssen.

- **preTasks-Array**: Array mit synchronen oder asynchronen Funktionen, die void zurückgeben; werden nach Reihenfolge im Array ausgeführt bevor die Szene initialisiert wird
- **initializeScene-Methode**: abstrakte Methode, in der die Szene befüllt wird; hier werden Builder aufgerufen und Babylon-Komponenten, wie Kameras und Lichter, instantiiert

## Diagramme

Die folgenden beiden Diagramme bilden die Interaktionen der oben beschriebenen Klassen/Komponenten ab.

![imageBabylonSceneInitialization.jpg](imageBabylonSceneInitialization.jpg)

Die im Klassendiagramm abgebildete _Presentation Class_ ist ein Platzhalter für eine beliebige andere Klasse der AdLer Engine, die über den Scene Presenter mit der Babylon-Szene interagiert. Sie erhält, genauso wie der Babylon Canvas,  Zugang zum Scene Presenter über die Scene Presenter Factory-Methode der Dependency Injection.

![imageBabylonSceneManagement.jpg](imageBabylonSceneManagement.jpg)