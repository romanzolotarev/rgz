tested on [openbsd](/openbsd/) 6.8 with [node](/node.html) 12.16.1

# json-db

an node app stores data in json file

## usage

<pre>
npm i
npm run dev
npm run test:load:write
npm run test:load
</pre>

## source

<a href="lib/db.js">lib/db.js</a><br />
<a href="src/app.js">src/app.js</a>

## limitations

- reads whole database into memory,
- writes whole database into a file on every update,
- up to 300 rps (on cheap vm).
