# Install RabbitMQ on OpenBSD

<pre>
# pkg_add rabbitmq
# rcctl start rabbitmq
# cp /var/rabbitmq/.erlang.cookie /root/
# rcctl restart rabbitmq
# rabbitmq-plugins enable rabbitmq_management
# rabbitmqctl add_user full_access s3crEt
# rabbitmqctl set_user_tags full_access administrator
</pre>

<http://localhost:15672/><br>
login: full_access <br>
pasword: s3crEt<br>

## Troubleshooting

Check status

<pre>
# rabbitmqctl status
</pre>

Restart

<pre>
# rcctl restart rabbitmq
</pre>

Run attached

<pre>
# rabbitmq-server
</pre>

Check logs

<pre>
# tail -f /var/log/rabbitmq/*
</pre>

Set pemissions

<pre>
# chown -R  _rabbitmq:_rabbitmq /var/log/rabbitmq /var/rabbitmq
</pre>

Kill process

<pre>
# pkill rabbitmq
</pre>

Uninstall rabbitmq

<pre>
# rcctl stop rabbitmq
# pkill erl_child_setup
# pkg_delete rabbitmq
# pkg_delete -a
# rm -rf .erlang.cookie /var/rabbitmq /var/log/rabbitmq /etc/rabbitmq
# userdel _rabbitmq
# groupdel _rabbitmq
</pre>
