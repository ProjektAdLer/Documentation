# Lernwelt hochladen

## Definition:

Das Autorentool muss Lehrenden die Möglichkeit bieten, eine Lernwelt über das [Backend](Backend-GE.md) hochzuladen.

## Akzeptanzkriterien:

- Es muss eine Lernwelt im Autorentool angewählt sein.
- Der Lehrende muss im Autorentool über das [Backend](Backend-GE.md) im [Learning Management Systems](Learning-Management-System-GE.md) angemeldet sein und über entsprechende Berechtigung zum Hochladen einer MBZ-Datei verfügen.
- Die angewählte Lernwelt muss die folgenden Kriterien erfüllen:
    - Es muss mindestens ein Lernraum mit mindestens einem Lernelement vorhanden sein.
    - Die Lernwelt muss abschließbar sein. Das heißt, dass die Summe der Punkte der Lernelemente eines Lernraums mindestens so groß sein müssen wie die Punkte des Lernraums.
    - Es darf kein Adaptivitätselement enthalten sein, welches eine Lernelement-Referenz auf ein nicht platziertes Lernelement beinhaltet.
    - Es darf kein Adaptivitätselement enthalten sein, welches eine Lernelement-Referenz auf ein nicht existierendes Lernelement beinhaltet.
    - Es darf kein Adaptivitätselement enthalten sein, welches eine Lernelement-Referenz auf ein noch nicht frei geschaltetes Lernelement im Lernpfad beinhaltet.

## Aktivitätsdiagramm:


