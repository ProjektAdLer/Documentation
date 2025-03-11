# Integration und E2E Testing

[//]: # (asdad)
## Voraussetzungen, um Integration und E2E Tests zu schreiben und auszuführen
- WSL (Windows Subsystem for Linux) installiert

  Dazu den Command `wsl --install` in der PowerShell ausführen.
- Eine JetBrains-IDE (am besten WebStorm) installiert
- Docker installiert (und bereits getestet, ob es läuft)
- Line-Endings in Git auf "input" gesetzt (Das ist sehr wichtig!)

  `git config --global core.autocrlf input`

## Schritt für Schritt Anleitung

### 1. WSL (Windows Subsystem for Linux) installieren
Um WSL zu installieren, zunächst das Terminal in Windows öffnen. Dann den Command `wsl --install` ausführen.
Dieser installiert WSL und die benötigten Komponenten. Nach der Installation muss der Computer neu gestartet werden.

Danach erneut das Terminal öffnen und den Befehl `wsl` ausführen. Damit wird die WSL-Shell geöffnet.
Nun kann ein Nutzer für die WSL-Shell erstellt werden. Dazu einfach dem Installationsprozess folgen.

Nun den Befehl `sudo apt install nodejs npm` ausführen, um Node.js und npm zu installieren. Dies wird benötigt, um die Tests auszuführen.

Danach die Befehle `npx playwright install` und `sudo npx playwright install-deps` ausführen. Damit installieren wir Browser, mit denen wir Tests ausführen können.

Der Befehl `npx playwright install` muss auch nochmal in einer Windows-Konsole ausgeführt werden.

> **Hinweis:** Wenn ihr Genaueres wissen wollt, warum wir WSL nutzen müssen, gerne Philipp oder Markus darauf ansprechen. :) Momentan ist das leider ein notwendiges Übel.

### 2. Die AdLer-Umgebung starten

**Schritt 1:** Docker-Compose generieren

Es muss mittels dem Befehl `docker compose -f docker-compose.base.yml -f docker-compose.test-adjustments.yml config > docker-compose.yml` zunächst eine `docker-compose.yml` Datei generiert werden.

**Schritt 2:** Docker-Compose starten

Das Kommando `docker compose up -d --build --force-recreate --wait` startet die Umgebung. Das kann einige Zeit dauern, da die Images erst gebaut und eingerichtet werden müssen.

![WebstormDockerCompose.png](WebstormDockerCompose.png)

### 3. Snapshot in WSL erstellen

Wir erstellen nun einen Snapshot, damit wir unsere Tests öfters ausführen können und nicht jedes Mal unsere Umgebung manuell neu aufsetzen müssen.
Dazu müssen wir allerdings in WSL arbeiten. Deshalb muss in die Konsole nun der Befehl `wsl` eingegeben werden. Von nun an habt ihr in dieser Konsole Zugriff auf die WSL-Shell.

Dort angekommen führen wir den Befehl `./docker-volumes-snapshot.sh snapshot` aus. Das erstellt einen Snapshot, den wir später wiederherstellen können. Sollte die Meldung kommen, dass die Datei nicht gefunden wurde, wurden vermutlich die
Line-Endings nicht auf "input" gesetzt. Dazu bitte die Voraussetzungen oben auf dieser Seite nochmal überprüfen.

> **Hinweis:** Wir werden weiterhin ab jetzt fast alles in dieser WSL-Umgebung machen, da die Integrationstests auf die Linux-Umgebung angewiesen sind.
>
> **Hinweis:** Bitte auch die Readme im Projekt-Repo beachten. Dort sind nochmal alle Schritte aufgelistet. Auch wie man die Umgebung aktualisiert und updated ist dort beschrieben.

### 4. Die IDE (WebStorm) einrichten
In WebStorm muss zunächst für das Projekt "Game" der Befehl `npm install` ausgeführt werden. Dazu zur Datei `package.json` navigieren. Nun müsste WebStorm einen Hinweis anzeigen, dass die Dependencies noch nicht installiert sind. Diesen Hinweis einfach bestätigen.
Sollte das nicht der Fall sein, muss in der Konsole in den Ordner "Game" navigiert werden und dort der Befehl `npm install` ausgeführt werden.

> **Hinweis:** Das Repo hat insgesamt 4 Projekte, in denen Komponenten getestet werden. Deshalb ist es wichtig, dass man sich im Ordner "Game" befindet.

Nun testen wir zunächst, ob die Tests funktionieren. Deshalb starten wir einen beliebigen Test einfach über das UI von WebStorm (siehe Screenshot). Die Tests befinden sich in
`Game/test/`. Dort den Test `login.spec.ts` auswählen und den Test über das UI starten. Dieser Test wird zwar fehlschlagen, aber WebStorm wird eine Konfiguration anlegen.

![FailingTest.png](FailingTest.png)

Sobald der Test fehlgeschlagen ist, können wir die Konfiguration öffnen. Dazu rechts oben bei WebStorm auf "Edit Configurations" klicken.
Dort können wir dann den "Node Interpreter" auf "WSL" umstellen. Dazu einfach auf das Dropdown-Menü klicken und dann "Add" auswählen. Dort können wir dann "Ubuntu" auswählen.

![UbuntuAsNodeInterpreter.png](UbuntuAsNodeInterpreter.png)

Jetzt können wir den Test nochmal starten. Jetzt wird er ungefähr 30 Sekunden laufen (während dieser Zeit wird die Umgebung aufgesetzt) und dann erfolgreich abschließen.

Ist das getan, dann können wir auch den Default Node Interpreter auf unsere WSL Umgebung stellen. Dafür 2x schnell hintereinander die "Shift"-Taste drücken. In dem Suchfeld, das dann erscheint,
"Node Interpreter" eingeben. In dem Menü, welches man dann öffnen kann, kann man standardmäßig WSL als seinen Node Interpreter setzen.

### 5. Einen neuen Test schreiben
> **Hinweis:** Bevor ein neuer Test geschrieben wird, bitte unbedingt das ReadMe des AdLer Stacks durchlesen. Vor allem der "writing_tests" Part ist sehr wichtig und hat ein paar grundlegende Infos.
> Vieles weitere kann auch in der Dokumentation von Playwright, welche sehr ausführlich ist, nachgelesen werden.

Wir konzentrieren uns hier auf UI-Tests. Es sind allerdings auch alle anderen Testarten mit Playwright zu realisieren.

Beispielhaft wollen wir einen Test implementieren, welcher eine echte Lernwelt in der AdLer Engine öffnet, einen Raum betritt und in der 3D-Umgebung ein Element öffnet und prüft, ob es erreichbar ist.
Dazu muss natürlich zunächst einmal eine Welt auf das Backend hochgeladen werden und der Studentenaccount eingeschrieben werden.

#### 5.1 Testfile erstellen und mit grundlegenden Daten füllen

```typescript
import {expect} from '@playwright/test';
import {enrollInMoodleCourse} from "./libs/moodle_helpers";
import {test} from "./libs/enhanced_test";

test.describe.serial("Access a Learning Element in 3D", () => {

    test.beforeAll(async ({request, resetEnvironment, uploadWorld}) => {
        // request: Objekt von Playwright, das HTTP-Anfragen senden kann

        // resetEnvironment: Funktion, die die Testumgebung zurücksetzt. Dazu haben wir WSL aufgesetzt

        // uploadWorld: Funktion, die eine Welt hochlädt und Informationen darüber zurückgibt
        await resetEnvironment();

        const uploadedWorld = await uploadWorld('testwelt');

        // Enroll student
        await enrollInMoodleCourse(
            request,
            process.env._PLAYWRIGHT_USER_STUDENT_USERNAME!,
            process.env._USER_STUDENT_PW!,
            uploadedWorld.worldNameInLms
        );
    });
})
```

Wenn wir das gemacht haben, dann haben wir einen Testaufbau, der schon mal automatisch eine Welt hochlädt und den Student-User einschreibt.

#### 5.2 Test-Code mittels Playwright generieren
Bevor wir den Test generieren können, fürhen wir kurz einen leeren Test aus, damit sich die Testumgebung einmalig aufbaut:

```typescript
test('Empty Test to trigger beforeAll', async ({page}) => {
    await page.goto('/');
});
```
Mit dem Command `npx playwright codegen <adresse der Engine>` können wir den Code für die Interaktion mit der Website generieren lassen. Dazu einfach den Command in der Konsole ausführen und die Schritte auf der Website durchführen, die sich öffnet.
Hier ist es auch egal, in welcher Konsole das gemacht wird.
Die Adresse der Engine kann in der ".env"-Datei im Root des Projekts gefunden werden. Stand jetzt ist es immer localhost:26877.

Auch andere Daten, wie z.B. die Login-Daten, sind in der ".env"-Datei zu finden.

> **Hinweis:** Der Code-Generator kann auch durchaus mit dem echten AdLer genutzt werden. Dazu einfach die Adresse des AdLer eingeben.

![PlaywrightCodegen.png](PlaywrightCodegen.png)

Auf dem Bild ist der Codegenerator zu sehen. Rechts wird der Test-Code automatisch generiert. Diesen Code können wir dann in unseren Test einfügen.

#### 5.3 Test-Code anpassen

Der Code, den wir vom Generator bekommen haben, bringt uns sehr weit. Allerdings müssen wir ihn von Hand noch ein wenig aufräumen oder erweitern.
Hier wurden beispielsweise doppelte Klicks, welche oben entstanden sind, entfernt.

Auch das Öffnen des Lernelements über die Accessibility-Funktion wurde manuell hinzugefügt.

```typescript
test('Student can Access first Learning Element in the Room', async ({page}) => {
// So kommt man zu der "BaseUrl", welche in den Projekteinstellungen gesetzt wurde. In unserem Fall die AdLer
// Engine
await page.goto('/');
// All das wurde von dem Codegenerator erstellt
await page.setViewportSize({width: 1920, height: 1080});
await page.getByTestId('userName').fill('integration_test_student');
await page.getByTestId('password').fill('Student1234!1234');
await page.getByTestId('loginButton').click();
await page.getByRole('button').filter({hasText: /^$/}).nth(1).click();
await page.getByRole('button', {name: 'testwelt'}).click();
await page.getByRole('button', {name: 'Lernwelt öffnen!'}).click();
await page.getByTestId('rf__node-1').getByRole('button', {name: 'testraum'}).click();
await page.getByRole('button', {name: 'Lernraum betreten!'}).click();
await page.getByRole('button', {name: 'Weiter zum Lernraum'}).click();

  // Das Lernelement über die Accessibility-Funktion öffnen
  await page.locator('#accessibility-host > button:nth-child(1)').dispatchEvent('click');

  // Ein Assert. Dieser ist ebenfalls mit dem Generator erstellt worden
  await expect(page.getByRole('paragraph')).toContainText('test');
});
```

Der Assert allerdings kann wieder über den Code-Generator gemacht werden. Dafür einfach über die obere Toolleiste im Generator den Knopf
"Assert Test" drücken und den Text auswählen, den man haben will.
