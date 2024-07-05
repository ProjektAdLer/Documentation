# Software Design

## INotifyPropertyChanged/-Changing

Siehe [hier](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.inotifypropertychanged?view=net-8.0) und
[hier](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.inotifypropertychanging?view=net-8.0).

Wird an diversen Stellen verwendet, an denen Benachrichtigung von UI-Komponenten über Änderungen an verschiedenen Entities
oder anderen UI-Zuständen implementiert werden müssen.

## (Undo- & Redo-)Command und CommandStateManager

![](imageAuthoringToolCommandStateManager.png)

Alle Usecases wie Erstellen, Ändern oder Löschen von Entities in der Businesslogik werden über Commands dargestellt.
Commands werden durch Übergabe aller für die Ausführung relevanten Parameter an eine Factory Klasse erstellt und diese
Commands werden dann an den CommandStateManager übergeben, welcher die Ausführung des Commands übernimmt und diese auf
einen Undo-Stack ablegt, sofern es sich um ein umkehrbares IUndoCommand handelt. Nach Undo wird das Command auf den Redo
Stack abgelegt, von dem aus es entsprechend wieder ausgeführt werden kann (in aller Regel: Redo == Execute).

Da manche UI-Komponenten von dem Zustand des CommandStateManagers abhängen (z.B. Anzeige in HeaderBar, ob Undo/Redo möglich ist),
wird dies über get-only Properties und INotifyPropertyChanged abgebildet.


## Memento

![](imageAuthoringToolMemento.png)

Zum Sichern des Zustands von Objekten vor Ausführung von Commands verwenden wir das Memento Pattern um die Kapselung von
Objekten sicherzustellen. Jede Entity-Klasse (LearningWorld, LearningSpace, LearningElement, ...) hat ihre eigene private
nested Memento Klasse, die nur die Entity-Klasse selbst kennen kann. Gehalten werden die Referenzen zu den jeweiligen
Mementos in den Command Klassen, die die Änderungen durchgeführt haben. Im Undo dieser Commands werden dann lediglich die
relevanten Mementos der Entities wiederhergestellt.

Für mehr Informationen zu Memento siehe [hier](https://refactoring.guru/design-patterns/memento) oder GoF Buch.

## Mediator

Klassendiagramm mit Beispielen von abhängigen Klassen:

![](imageAuthoringToolMediator.png)

Diagramm aller von IMediator abhängigen Klassen (autogeneriert in Rider):

![](imageAuthoringToolMediatorUsages.png)


Wir verwenden das Mediator Pattern im Autorentool vor allem für das Zustandsmanagement der Sidebars in MasterLayout. 
Diese regeln, welcher Tab auf den beiden Seiten des Autorentools zu jeder Zeit geöffnet sind. Andere UI-Komponenten
können über den Mediator dann steuern, falls ein anderer Tab geöffnet werden soll (z.B. weil in der TreeView ein Space
angeklickt wurde).