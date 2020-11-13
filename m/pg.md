# Install PostgreSQL

<pre>
# <b>pkg_add postgresql-server</b>
quirks-3.124 signed on 2019-04-15T12:10:16Z
postgresql-server-11.2p1: ok
The following new rcscripts were installed: /etc/rc.d/postgresql
See rcctl(8) for details.
New and changed readme(s):
        /usr/local/share/doc/pkg-readmes/postgresql-server
# <b>su - _postgresql</b>
$ <b>mkdir /var/postgresql/data</b>
$ <b>initdb -D /var/postgresql/data -U postgres \</b>
<i></i><b>-A scram-sha-256 -E UTF8 -W</b>
# <b>rcctl start postgresql</b>
postgresql(ok)
# <b>psql postgres postgres</b>
Password for user postgres:
psql (11.2)
Type "help" for help.

postgres=# <b>CREATE DATABASE <em>db</em>;</b>
CREATE DATABASE
postgres=# <b>CREATE USER <em>user</em> WITH ENCRYPTED PASSWORD '<em>pwd</em>';</b>
CREATE ROLE
postgres=# <b>GRANT ALL PRIVILEGES ON DATABASE <em>db</em> TO <em>user</em>;</b>
GRANT
postgres=# <b>exit</b>
# <b>psql <em>db</em> <em>user</em></b>
Password for user user:
psql (11.2)
Type "help" for help.

user=&gt; <b>exit</b>
#
</pre>
