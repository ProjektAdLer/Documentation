# Neue Kategorien zum Moodle Benutzerdaten-Export hinzufügen

Diese Dokumentation erklärt, wie man eine neue Kategorie mit Testdaten zum Moodle Benutzerdaten-Export hinzufügt.

## Überblick

Der Moodle Benutzerdaten-Export ist eine strukturierte Sammlung von HTML-, CSS- und JavaScript-Dateien, die exportierte Benutzerdaten in einem navigierbaren Format anzeigen. Der Export ist in einer baumartigen Struktur mit Kategorien und Unterkategorien organisiert, die jeweils Datendateien enthalten.

## Benötigte Dateien und Struktur

Um eine neue Kategorie hinzuzufügen, müssen Sie Folgendes erstellen:

1. Eine Verzeichnisstruktur für die Kategorie und ihre Unterkategorien
2. Datendateien im JavaScript (.js) und JSON (.json) Format
3. Verweise auf diese Dateien im Datenindex
4. Navigationseinträge in der HTML-Oberfläche

## Schritt-für-Schritt-Anleitung

### 1. Verzeichnisstruktur erstellen

Erstellen Sie ein Verzeichnis für Ihre neue Kategorie im Ordner `System _.1`. Die Namenskonvention beinhaltet typischerweise ein eindeutiges Identifikator-Suffix (z.B. `_.20`).

```bash
mkdir -p "/path/to/export/System _.1/Your Category _.XX/Your Subcategory"
```

### 2. Datendateien erstellen

Für jede Kategorie und Unterkategorie müssen Sie zwei Datendateien erstellen:

#### Kategorie-Datendateien

**data.js**

```javascript
var data_file_XX = {
  name: "Your Category",
  description: "Description of your category",
  items: [
    {
      id: 1,
      name: "Item 1",
      value: "Value 1",
    },
    {
      id: 2,
      name: "Item 2",
      value: "Value 2",
    },
  ],
};
```

**data.json**

```json
{
  "name": "Your Category",
  "description": "Description of your category",
  "items": [
    {
      "id": 1,
      "name": "Item 1",
      "value": "Value 1"
    },
    {
      "id": 2,
      "name": "Item 2",
      "value": "Value 2"
    }
  ]
}
```

#### Unterkategorie-Datendateien

Erstellen Sie ähnliche Dateien im Unterkategorie-Ordner mit entsprechenden Daten.

### 3. Datenindex aktualisieren

Bearbeiten Sie die Datei `js/data_index.js`, um Verweise auf Ihre neuen Datendateien einzufügen:

```javascript
var user_data_index = {
  // ...existing entries...
  data_file_XX: "System _.1/Your Category _.XX/data.js",
  data_file_YY: "System _.1/Your Category _.XX/Your Subcategory/data.js",
};
```

Verwenden Sie eindeutige Bezeichner für `data_file_XX`, die nicht mit bestehenden Einträgen in Konflikt stehen. In der Regel sollten Sie die nächsten verfügbaren Nummern verwenden.

### 4. Navigationsbaum aktualisieren

Bearbeiten Sie die Datei `index.html`, um Ihre neue Kategorie zum Navigationsbaum hinzuzufügen. Suchen Sie nach dem Abschnitt `<ul class="treeview parent block_tree list" id="my-tree">` und fügen Sie Ihre Kategorie an der entsprechenden Stelle ein:

```html
<li class="menu-item" role="treeitem" aria-expanded="false">
  Your Category
  <ul class="parent" role="group">
    <li class="menu-item" role="treeitem" aria-expanded="false">
      Your Subcategory
      <ul class="parent" role="group">
        <li class="item" role="treeitem" aria-expanded="false">
          <a data-var="data_file_YY" href="#">data.json</a>
        </li>
      </ul>
    </li>
    <li class="item" role="treeitem" aria-expanded="false">
      <a data-var="data_file_XX" href="#">data.json</a>
    </li>
  </ul>
</li>
```

Stellen Sie sicher, dass die Attribute `data-var` mit den Bezeichnern übereinstimmen, die Sie im Datenindex verwendet haben.

## Beispiel

### Verzeichnisstruktur

```
System _.1/
  └── Test Category _.20/
      ├── data.js
      ├── data.json
      └── Test Subcategory/
          ├── data.js
          └── data.json
```

### Inhalt der Datendateien

**Test Category data.js**

```javascript
var data_file_28 = {
  name: "Test Category",
  description: "This is a test category created on March 24, 2025",
  items: [
    {
      id: 1,
      name: "Test Item 1",
      value: "Sample value 1",
    },
    {
      id: 2,
      name: "Test Item 2",
      value: "Sample value 2",
    },
  ],
};
```

**Test Subcategory data.js**

```javascript
var data_file_29 = {
  name: "Test Subcategory",
  description: "This is a test subcategory with sample data",
  test_data: {
    string_value: "Sample string",
    number_value: 42,
    boolean_value: true,
    array_value: [1, 2, 3, 4, 5],
    nested_object: {
      key1: "value1",
      key2: "value2",
    },
  },
};
```

### data_index.js Aktualisierung

```javascript
var user_data_index = {
  // ...existing entries...
  data_file_28: "System _.1/Test Category _.20/data.js",
  data_file_29: "System _.1/Test Category _.20/Test Subcategory/data.js",
};
```

### Navigationsbaum Aktualisierung

```html
<li class="menu-item" role="treeitem" aria-expanded="false">
  Test Category
  <ul class="parent" role="group">
    <li class="menu-item" role="treeitem" aria-expanded="false">
      Test Subcategory
      <ul class="parent" role="group">
        <li class="item" role="treeitem" aria-expanded="false">
          <a data-var="data_file_29" href="#">data.json</a>
        </li>
      </ul>
    </li>
    <li class="item" role="treeitem" aria-expanded="false">
      <a data-var="data_file_28" href="#">data.json</a>
    </li>
  </ul>
</li>
```

## Bewährte Praktiken

1. **Eindeutige Bezeichner**: Stellen Sie sicher, dass alle Dateidatei-Bezeichner eindeutig sind, um Konflikte zu vermeiden
2. **Konsistente Benennung**: Folgen Sie der bestehenden Namenskonvention mit Unterstrich und Nummernendung
3. **Vollständiges Datenpaar**: Erstellen Sie immer sowohl .js- als auch .json-Dateien für jede Kategorie
4. **Datenstruktur**: Passen Sie die Datenstruktur an das erwartete Format im Viewer an
5. **Tests**: Nach dem Hinzufügen öffnen Sie den Export in einem Webbrowser, um zu überprüfen, ob die neue Kategorie korrekt angezeigt wird

## Fehlerbehebung

- Wenn die Kategorie nicht erscheint, überprüfen Sie die HTML-Navigationsbaum-Struktur
- Wenn die Daten nicht geladen werden, überprüfen Sie, ob die Pfade in data_index.js korrekt sind
- Stellen Sie sicher, dass die JavaScript-Variablennamen in den .js-Dateien mit den Referenzen in data_index.js übereinstimmen
- Überprüfen Sie auf Syntaxfehler in Ihren JSON- und JavaScript-Dateien
