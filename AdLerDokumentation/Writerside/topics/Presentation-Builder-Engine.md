# Presentation Builder 

Um die Initialisierung des in der AdLer Engine verwendeten [MVC Musters](MVC-Muster-Engine.md) in der Adapterschicht 
(siehe [Architektur](Architektur.md)) zu vereinfachen, wird ein sog. Presentation Builder verwendet. Dieser folgt dem 
Builder Design Pattern. Dabei definiert der Builder eine feste Liste zu erzeugender Objekte. 

![](imageEnginePresentationBuilder.jpg)

## Builder
Der Builder ist zuständig für die Erzeugung folgender Komponenten des MVC-Patterns: ViewModel, Controller, Presenter und View. 
Alle aufgezählten Komponenten bis auf das ViewModel sind optional und können bei der Erzeugung des Builders entfallen, da immer ein ViewModel benötigt wird.
Für optionale Komponenten wird als Template-Argument `undefined` übergeben.
Nach dem Build-Prozess können die einzelnen Komponenten über Getter-Methoden abgerufen werden.

### Einbindung in React
Für die Verwendung eines Builders in einer React Komponente existiert die Custom Hook `useBuilder`.
Sie nimmt als Parameter einen Buildertyp und als Generic die erwarteten Typen für ViewModel und Controller entgegen. Sie gibt ein Tupel aus ViewModel und Controller zurück.
Die `useBuilder` Hook liefert keine Referenz auf den erstellten Presenter, da die View-Komponenten in React nicht direkt mit ihren Presentern kommunizieren.
Da die `useBuilder` Hook intern mit `useEffect` arbeitet, kann es sein, dass die Buildprodukte nicht im selben Frame vorliegen, wenn die Hook das erste Mal aufgerufen wurde.
Es ist deshalb zu empfehlen, die Komponente ggf. nicht zu rendern, falls sie vom Controller oder Daten des ViewModels abhängig ist.

## Presentation Director
Die Reihenfolge der Instanziierung der MVC-Komponenten durch den Presentation Builder erfolg durch den Presentation Director.
Der Director führt folgende Anweisungen in fester Reihenfolge aus:
- setze übergebenen Builder zurück
- erzeuge ViewModel
- erzeuge Controller
- erzeuge View
- erzeuge Presenter