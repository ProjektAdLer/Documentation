# Lernwelt löschen

## Definition:

Das Backend muss dem Dozenten die Möglichkeit bieten, eine Lernwelt zu löschen.

## Akzeptanzkriterien:

- Der Dozent kann eine Lernwelt löschen.
- Die Lernwelt wird aus der Datenbank gelöscht.
- Die Lernwelt wird aus dem LMS gelöscht.
- Dateien, die in der Lernwelt referenziert werden, werden gelöscht
- Sollte die Lernwelt nicht dem Autor zugewiesen sein, wird eine Fehlermeldung ausgegeben - er darf sie nicht löschen

## Aktivitätsdiagramm

![DeleteCourse.png](DeleteCourse.png)