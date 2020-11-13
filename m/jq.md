# jq

<pre>
$ <b>echo '{ "name": "Luke Skywalker" }' | jq '.name'</b>
"Luke Skywalker"
$
</pre>

Let's extract property value from an object.

<pre>
$ <b>echo '{ "name": "Luke Skywalker" }' | jq '.name'</b>
"Luke Skywalker"
$
</pre>

Sometimes we need values without quotation marks. Use `-r` to switch to
raw format.

<pre>
$ <b>echo '{ "name": "Luke Skywalker" }' | jq -r '.name'</b>
Luke Skywalker
$
</pre>

Filling `luke.json` with arbitrary JSON.

<pre>
$ <b>echo '</b>
<i></i>{
<i></i>  "name": "Luke Skywalker",
<i></i>  "films": [
<i></i>    "http://swapi.co/api/films/2/",
<i></i>    "http://swapi.co/api/films/6/",
<i></i>    "http://swapi.co/api/films/3/",
<i></i>    "http://swapi.co/api/films/1/",
<i></i>    "http://swapi.co/api/films/7/",
<i></i>  ]
<i></i>}
<i></i><b>' > luke.json</b>
$
</pre>

Extract from the list.

<pre>
$ <b>jq '.films | .[]' < luke.json</b>
"http://swapi.co/api/films/2/"
"http://swapi.co/api/films/6/"
"http://swapi.co/api/films/3/"
"http://swapi.co/api/films/1/"
"http://swapi.co/api/films/7/"
$
</pre>

Sort and then reverse.

<pre>
$ <b>jq '.films | sort | reverse | .[]' < luke.json</b>
"http://swapi.co/api/films/7/"
"http://swapi.co/api/films/6/"
"http://swapi.co/api/films/3/"
"http://swapi.co/api/films/2/"
"http://swapi.co/api/films/1/"
$
</pre>

Call predicate for every element of the list.

<pre>
$ <b>jq '.films | sort | reverse | .[] | contains("1")' < luke.json</b>
false
false
false
false
true
$
</pre>

Keep elements of the list if `contains("1") == true`.

<pre>
$ <b>jq '.films | .[] | select(. | contains("1"))' < luke.json</b>
"http://swapi.co/api/films/1/"
$
</pre>

Or you can use `map`:

<pre>
$ <b>jq '.films | map(select(. | contains("1"))) | .[]' < luke.json</b>
"http://swapi.co/api/films/1/"
$
</pre>
