# Ports

Use Cases nutzen Ports, um mit Adaptern zu kommunizieren ohne die Abhängigkeitsregel zu brechen. Ein typischer Anwendungsfall ist hier z.B., dass Daten, die sich aus der Bearbeitung des Use Cases ergeben haben, an einen Presenter vermittelt werden sollen, um dem User angezeigt zu werden.

Ports werden nach Dependency Inversion Prinzip aufgebaut. Innerhalb der Application Schicht wird ein Interface für den Port definiert. Der Use Case kennt nur dieses Interface und verwendet es, um Daten an die äußeren Schichten weiterzugeben. Er ist dadurch unabhängig von äußeren Schichten. Dabei soll immer eine 1:1 Beziehung von Port Interface zu Implementierung bestehen.

![Port.png](imagePort.png){width="250"}

Abhängig von der Anzahl der vom Port abhängigen Presenter erfolgt die Implementierung des Port Interfaces in der Adapter Schicht meist auf eine der folgenden Weisen:
1. **Presenter**: Der verantwortliche Presenter implementiert das Interface direkt selbst. Verwendet wenn nur ein Presenter vom Port abhängig ist.
2. **Verteiler**: Der Port erhält eine dedizierte Implementierung, die die Verteilung der Calls meist an mehrere Presenter regelt. Verwendet wenn mehrere Presenter vom Port abhängig sind.