# Observable

Für viele Werte in den [ViewModels](MVC-Muster-Engine.md) wurde eine abgewandelte Form des Observer-Musters implementiert. Das **Observable** nimmt Funktionen ohne Return-Wert als Subscriber (statt Klassen, die ein Subsriber-Inferface implementieren), die als einzigen Parameter den neuen geänderten Wert erhalten. Wenn sich der intern gespeicherte Wert (`value`) ändert, werden alle angemeldeten Subscriber benachrichtigt.

Zur Einbindung in [React-Komponenten](React-Engine.md) wurde die Custom Hook `useObservable` implementiert, die das Observable in einen React-State wrappt.

![imageObservable.jpg](imageObservable.jpg)