# React
**React** ist eine Bibliothek für die Erstellung von webbasierten Benutzeroberflächen und wird in der AdLer Engine für deren 
Darstellung und Interaktion für die [Lernenden](Lernende-GE.md) verwendet.


## Kurzbeschreibung
React ist eine von Meta (ehemals Facebook) bereitgestellte Javaskript/Typescript-Bibliothek für das Erstellen von 
webbasierten Applikationen.
Mit React lassen sich wiederverwendbare Komponenten für den Bau von Webseiten erstellen. So ist es möglich mit React die 
bekannten Webtechnologien HTML, CSS und Javascript in einer Codekomponente zu nutzen.

Für weitere Funktionalitäten stehen *Hooks* zur Verfügung, die z.B. User-Eingaben speichern, 
oder eine Funktion auslöst in Reaktion auf eine Änderung des Wertes einer Variablen.

React wird als Open-Source-Projekt und unter der MIT-Lizenz vertrieben. Dateien von React sind an der **.tsx**-Endung 
in der AdLer Engine zu erkennen.

## Codebeispiel
```Typescript
# TextComponent.tsx
export default function TextComponent({
  viewModel,
}: {
  viewModel: LearningElementModalViewModel;
}) {
  const [text, setText] = useState("");
  const [filepath] = useObservable(viewModel.filePath);

  useEffect(() => {
    if (filepath !== undefined) {
      fetch(filepath).then((response) =>
        response.text().then((text) => setText(text))
      );
    }
  }, [filepath]);

  return (
    <div className="flex justify-center max-h-[75vh] lg:max-h-[85vh] xl:max-h-[85vh] w-fit h-fit max-w-[99vw] font-medium text-black">
      <pre>
        <p className="w-[80vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] 2xl:[30vw] p-8 bg-white rounded-lg overflow-auto">
          {text}
        </p>
      </pre>
    </div>
  );
}
```

## Eigenschaften
### Vorteile
- Typsicherheit durch Verwendung von Typescript
- Weniger Serveranfragen aufgrund von React's Single Page Application
- Erweiterte Funktionalität durch React-Hooks

### Nachteile
- Zur Einbindung in die MVC-Architektur muss eigens geschriebene Hook (useBuilder) genutzt werden
- Keine objekt-orientierte Programmierung in UI-Komponenten aufgrund von Reacts funktionaler Programmierung

## Weitere Ressourcen
- [https://github.com/facebook/react](https://github.com/facebook/react)
- [https://react.dev/reference/react](https://react.dev/reference/react)