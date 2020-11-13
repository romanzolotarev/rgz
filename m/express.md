# Create an HTTP server with Express

<pre>
$ <b>mkdir server</b>
$ <b>cd server</b>
$ <b>npm init -y</b>
$ <b>npm i -S express</b>
$ <b>echo '</b>
<i></i>const express = require('express')
<i></i>const app = express()
<i></i>const port = 3000
<i></i>app.get('/', (req, res) => res.send('Hello, World!'))
<i></i>app.listen(port, () => console.log(`listening on port ${port}`))
<i></i> &gt; index.js
$ <b>node index.js</b>
listening on port 3000
</pre>

[Run it as a daemon](od.html)
