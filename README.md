# CLOV4R Website 🍀

Hier gehts zur Website: [CLOV4R_Website](https://quietlean.github.io/clover-project/)

Hier werden erstmal ein paar hilfreiche Sachen dokumentiert, damit man das mit dem Vite-Projekt später nach kapiert.

## Hilfreiche Commands 🎀

Ein neues Vite Projekt wird initiert mit: 
``` 
$ npm create vite@latest project-name -- --template vanilla
```  

Bibliotheken/Dependencies werden alle in dem Projekt installiert, wodurch nichts davon global installiert werden muss. Nur **npm** muss global installiert sein. In der Three.js Doku steht ganz gut was man am Anfang braucht: [Three.js](https://threejs.org/manual/#en/installation)

Wenn das Repository geklont wurde und npm installiert ist, können die Dependencies lokal installiert werden mit: 
``` 
$ npm install
```

Ein lokaler Server kann gestartet werden mit:
``` 
$ npx vite
```

Soll der Server im lokalen Netzwerk erreichbar sein:
``` 
$ npx vite --host
``` 

Um einen "production-ready build" zu erzeugen, der im Dist Ordner ist:
``` 
$ npm run build
``` 

Der Inhalt dieses ordner ist quasi der Fertige Build wie er auf GitHub sein sollte. Der kann getest werden mit:
```
$ npx vite preview
``` 

Man kann den wohl auch anders starten ohne Node.js/npm, z.B. mit:
``` 
$ cd dist
$ python3 -m http.server 3000
``` 

Es kommt vor, dass **package-lock.json** und **node-modules** neu generiert werden müssen, weil die iwie abhängig sind von dem System auf dem sie generiert werden. Soweit ich das verstehe, ist das nur für GitHub Actions relevant, weil die Linux Server laufen haben. Die Dinger können jedenfalls neu generiert werden mit:
```
$ rm -rf node-modules package-lock.json 	
$ npm install 
``` 
