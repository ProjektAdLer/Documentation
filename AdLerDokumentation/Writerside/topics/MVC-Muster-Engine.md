# MVC Muster

![PresentationMVC.png](imageEnginePresentationMVC.png){width="400"}

Die Adapter Schicht umfasst unter anderem die komplette MVC Struktur, die für die Anzeige der 3D Szene in Babylon und die Anzeige der GUI mit React verwendet wird. Das nebenstehende Diagramm zeigt die Beziehungen der einzelnen Elemente des MVC Patterns wie es in der AdLer Engine implementiert wird und wie diese Elemente mit der Application Schicht interagieren.

Die Erstellung der Klassen des MVC Patterns und ihre Verknüpfung untereinander, wird in der AdLer Engine vom [PresentationBuilder](Presentation-Builder-Engine.md) übernommen.

Alle Klassen des MVC Patterns, außer der View (da keine Abhängigkeiten von ihr), werden immer durch ein Interface abstrahiert.

## View
Die View ist für die Darstellung zuständig. Dazu ließt sie Daten aus dem View Model zur Anzeige aus. Im Fall, dass der User mit einem von der View verwalteten Element interagiert, gibt sie dies an den Controller weiter.
Im besten Fall ist die View die einzige Klasse des MVC Patterns, die mit Code der externen Abhängigkeit arbeitet.
Die View stellt sich von ihrer Funktionalität auf Seiten von Babylon und React unterschiedlich dar:
- **Babylon**: Laden von Objekten mit Meshes/Materialen/usw., Platzierung von Objekten in der Szene, Animation
- **React**: React Funktionskomponente

## Controller
Der Controller ist für die Verarbeitung von User Input zuständig. User Input führt meistens entweder zur direkten Änderung von Daten des View Models, dem Anstoß eines Use Cases und/oder der Weiterleitung des Calls an einen anderen Controller/Presenter. Dabei geschieht die Weiterleitung eines Calls an Controller oder Presenter, nur wenn die User Interaction keinen Geschäftsprozess beeinflusst und rein für die Anzeige relevant ist.

## ViewModel
Das ViewModel ist eine reines Datenobjekt, das für die Anzeige relevante Daten hält.
Babylon.js hält meist bereits einen Teil der Daten, die in das ViewModel gehören würden. Deswegen kann es sein, dass das ViewModel in einigen Fällen sehr klein oder sogar leer ist.
Daten im View Model werden in den meisten Fällen in Observables gehalten. Diese Observables können dann von Controller oder View beobachtet werden, um auf eine Änderung der Daten zu reagieren.

## Presenter
Der Presenter ist für die Befüllung des View Models zuständig. Dazu nimmt er DTOs von aus der Application Schicht entgegen (siehe oben unter *Ports*). Daten aus den DTOs werden dann ggf. umgewandelt und in die Member des View Models geschrieben.

## Interaktion
Für einen beispielhaften Ablauf der Interaktionen zwischen den Teilen des MVC-Patterns zusammen mit einem Use Case, siehe [](Use-Cases-Engine.md).
