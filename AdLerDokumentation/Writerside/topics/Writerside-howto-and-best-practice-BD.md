# Writerside HowTo and Best Practice

Hier befinden sich wichtige Informationen zum Umgang und Start mit Writerside im Rahmen des
[Adler-Projekts](AdLer-Projekt-GE.md).

Bitte beachtet die best practice Bereiche:
<tip>
    <p>
        Ich bin ein Best Practice Bereich
    </p>
</tip>

## Writerside Topic anlegen

In Writerside können zwei Dateiarten als Topics angelegt werden: XML und Markdown.md.
Genaueres zu [Writerside Topics](https://www.jetbrains.com/help/writerside//topics.html)

<tip>
    <p>
        Im AdLer-Projekt wird empfohlen Markdown.md Dateien zu bevorzugen,
        da die XML-Dateien in der Regel unübersichtlicher sind. Zudem wird so versucht ein wenig
        Einheitlichkeit in der AdLer-Dokumentation herzustellen.
    </p>
</tip>



Beim Anlegen eines neuen Topics muss ein **Topic Title** und ein **Topic Filename** angegeben werden.

- Der **Topic Title** ist eine beliebig zu wählende Bezeichnung.
- Der **Topic Filename** muss eine Writerside weite ID sein. Die Eindeutigkeit wird auch von Writerside überprüft.

Speziell für die Vergabe einer Anforderungs-ID beachtet bitte:
[Writerside ID-Vergabe für Anforderungen](https://wiki.projekt-adler.eu/de/Organisation/Writerside-ID-Vergabe)

![image-AnlegenEinesNeuenTopicsInWriterside.png](image-AnlegenEinesNeuenTopicsInWriterside.png)

## Writerside Topic umbenennen

<tip>
    <p>
        Der Topic Title kann beliebig geändert werden.  
    </p>
    <p>
        Der <control>Topic Filename</control> muss wie folgt geändert werden:
        <a href="https://www.jetbrains.com/help/writerside//topics.html#change-topic-title"> 
        Change topic filename
        </a>
    </p>
</tip>

## Writerside Topic löschen

<tip>
    <p>
        Topics müssen sicher gelöscht werden daher:
        Unbedingt das Vorgehen zum Löschen
        von <a href="https://www.jetbrains.com/help/writerside//add-a-topic.html">Writerside</a>
        beachten.
    </p>
</tip>

## Templates

**Template anlegen**

**Template verwenden**

## Tabellen

In Writerside können verschiedene Arten von Tabellen verwendet werden:
[Writerside Tabellen](https://plugins.jetbrains.com/plugin/20158-writerside/docs/tables.html)

<tip>
    <p>
        Im AdLer-Projekt wird empfohlen XML-Tabellen gegenüber Markdown.md Tabellen zu bevorzugen,
        da die XML-Tabellen robuster in der Verwendung sind.
        XML-Tabellen können auch in Markdown.md Dateien erstellt werden.
    </p>
</tip>

## Glossar Eintrag anlegen

Klicke mit rechter Maustaste an die Position in den
[table of contents](https://www.jetbrains.com/help/writerside//table-of-contents.html)
an der ein neuer Glossareintrag erstellt werden soll und dann:

![imageMitHilfeEinesWritersideTemplatesEinNeuesWritersideTopicErstellen.png](imageMitHilfeEinesWritersideTemplatesEinNeuesWritersideTopicErstellen.png)

<tip>
    <p>
        Bei der Namensvergabe eines Glossareintrags muss der Topic Title
        dem Begriff entsprechen, der ins Glossar aufgenommen wird.
    </p>
    <p>
         Der Topic Filename muss wie folgt aufgebaut sein: "Begriff" + GE
    </p>
    <p>
         Hierbei steht GE für Glossareintrag. Mit dieser Vorgehensweise wird sichergestellt,
         dass Glossareinträge als solche beim Einfügen von Links erkennbar sind.
    </p>
</tip>

### Richtlinien zum Anlegen von Glossareinträgen:

- Je Glossareintrag muss ein eigenes Writerside Topic erstellt werden!
- Zur Erstellung muss ein Glossar Template verwendet werden!
- Das Glossar muss primär aus Begriffsdefinitionen bestehen!
- Alle Topics unterhalb des Topics Glossar
  müssen Glossareinträge sein! Einzige Ausnahme sind die Topics
  die für die alphabetische Strukturierung verwendet werden.
- Weiterführende Erklärungen der Begriffe bitte auf eigene Dokumentationsseiten auslagern.
- Die ausgelagerten Dokumentationsseiten dürfen gerne mit dem Glossar verlinkt werden.
- Die im Glossareintrag angegebenen Synonyme sollten weder schriftlich noch sprachlich verwendet werden.
- [Glossar Templates gibt es hier.](Glossar-Templates.md)
- [Anleitung zum Erstellen eines Glossar Eintrags gibt es hier.](Writerside-howto-and-best-practice-BD.md#glossar-eintrag-anlegen)

## Bilder

Benennung

## Links in Writerside

[Generelles zu Links in Writerside.](https://www.jetbrains.com/help/writerside//links-and-references.html)

<note>
  <p>
    Beachtet bitte, dass in
    <a  href="https://www.jetbrains.com/help/writerside//links-and-references.html#markdown">
    Markdown.md</a>
    das Verlinken anders funktioniert als in 
    <a  href="https://www.jetbrains.com/help/writerside//links-and-references.html#link" >
    XML</a> .
  </p>
</note>

<tip>
  <p> Die Links auf Überschriften etc. müssen wie unten aufgeführt direkt auf die Überschriften
      Bezeichnung getätigt werden.
  </p>
  <p>Demonstration eines XML-Links auf ein Writerside Topic mit Navigation zu einem Anchor:</p>
  <code-block lang="xml">
      <![CDATA[
          <a  href="Writerside-howto-and-best-practice-BD.md"
             anchor="glossar-eintrag-anlegen"></a>
      ]]>
  </code-block>
  <p>Demonstration eines Markdown.md-Links auf ein Writerside Topic mit Navigation zu einem Anchor:</p>
  <code-block lang="xml">
      <![CDATA[
        [Link auf Anchor](NameDesWritersideTopics.md#NameDesAnchors)
    ]]>
  </code-block>
</tip>

## Wichtige Short-Cuts:

Neu formatieren: STRG + ALT + L

