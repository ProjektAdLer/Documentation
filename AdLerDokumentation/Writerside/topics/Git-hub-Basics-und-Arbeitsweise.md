# Git(hub) Basics und Arbeitsweise

## Git Nachschlagewerk

### Atlassian

[Learn Git Startseite](https://www.atlassian.com/git)

[Git Commits](https://www.atlassian.com/git/tutorials/saving-changes/git-commit)

[Git Push](https://www.atlassian.com/git/tutorials/syncing/git-push)

[Git Pull](https://www.atlassian.com/git/tutorials/syncing/git-pull)

[Git Commands Cheatsheet](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet)

## Git(hub) Arbeitsweise auf dem Documentation Repository

### Für Entwickler (Autorentool, Engine, Backend, Moodle)

Entwickler dürfen direkt auf `main` arbeiten. Bitte achtet bei eurer Arbeitsweise auf rasches und häufiges Committen und
Pushen auf den Branch. Ihr dürft, sofern ihr es bevorzugt, auch gerne mit Branches und Pull Requests arbeiten.

<warning>
<p>
Sollte nach eurem Push auf main die Publish-Pipeline fehlschlagen, dann behebt diese Fehler bitte <b>sofort</b>,
entweder durch ein Revert des fehlerhaften Commits oder manuell.
Ansonsten erschwert ihr den Workflow für alle anderen Beteiligten.
</p>
</warning>

Alle Entwickler sind zudem dazu aufgefordert, zusätzlich zu euren eigenen Dokumentationsaufgaben die Pull Requests eurer
Kollegen, natürlich vor allem aus euren Teams aber auch teamübergreifend, zu Mergen.

### Für nicht-Entwickler

Nicht-Entwickler dürfen **nicht** direkt auf `main` arbeiten. Bitte erstellt für eure Änderungen Branches (Benennung ist
euch freigestellt, entweder nach Namen der Beteiligten oder Aufgabe/Sinnabschnitt). Committet und pusht eure Änderungen
bitte häufig. Wenn ihr mit eurem Branch/Aufgabe/Sinnabschnitt fertig seid, erstellt ihr bitte wie gezeigt auf Github
einen Pull Request von eurem Branch auf `main`. Bei Erstellung des Pull Requests werden die Entwickler benachrichtigt
und kümmern sich baldmöglichst um das Mergen eures Pull Requests.

GitHub-Dokumentation [zur Erstellung von Pull Requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)
und [zu Pull Requests allgemein.](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests)