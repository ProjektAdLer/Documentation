# Kommandozeilenschnittstelle um Nutzer einer Rolle im Kontext einer Kurskategorie zuzuweisen

## Definition:

Die Plugins müssen eine Kommandozeilenschnittstelle bereitstellen, welche von Administratoren genutzt werden kann, um einem Nutzer eine Rolle im Kontext einer Kurskategorie zuzuweisen.


## Akzeptanzkriterien:
- Parameter:
    - `username`
    - `role`
    - `category_path`: optional, falls nicht angegeben wird eine neue Kategorie erstellt
- Der Nutzer erhält die Rolle im Kontext der Kurskategorie
