Create Saves
===

Given a directory of ROMS create a folder of SAVES that is filled with a .SAV file compatible with expected save format
for the RetroZone PowerPak.

```
cd scripts/createSaves
npm install optimist async underscore fs findit
node createSaves.js -d ~/Dropbox/Games/nes/ROMS
```
