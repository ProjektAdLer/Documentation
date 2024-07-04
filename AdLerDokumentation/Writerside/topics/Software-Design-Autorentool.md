# Software Design

## (Undo- & Redo-)Command und CommandStateManager
![](imageAuthoringToolCommandStateManager.png)
TODO
## Memento
![](imageAuthoringToolMemento.png)

Zum Sichern des Zustands von Objekten vor Ausführung von Commands verwenden wir das Memento Pattern um die Kapselung von
Objekten sicherzustellen. Jede Entity-Klasse (LearningWorld, LearningSpace, LearningElement, ...) hat ihre eigene private
nested Memento Klasse, die nur die Entity-Klasse selbst kennen kann.

Mehr Informationen siehe [hier](https://refactoring.guru/design-patterns/memento) oder GoF Buch.

## Mediator
TODO