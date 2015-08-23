---
layout: post
title: Install RabbitMQ on Ubuntu LTS
date: 3 March, 2015
update: 3 March, 2015
---

I was looking for a reliable and fast open source MQ for my personnel cloud. Here is upto date documentation for installing RabbitMQ on [Ubuntu](https://www.rabbitmq.com/install-debian.html)

![_config.yml]({{ site.baseurl }}/images/rabbitmq-screen.png)

RabbitMQ is included in Debain and Ubuntu but is v3.2 while the latest available is v3.5. You need to update APT repositoty. Make sure you get 'stable' branch.

```
echo "deb http://www.rabbitmq.com/debian/ stable main"  | sudo tee  /etc/apt/sources.list.d/rabbitmq.list > /dev/null
sudo wget http://www.rabbitmq.com/rabbitmq-signing-key-public.asc
sudo apt-key add rabbitmq-signing-key-public.asc
sudo apt-get update
sudo apt-get install rabbitmq-server -y
```

If there is an erlang already installed you might have to remove it manually `sudo apt-get remove erlang-nox`

Next you can check users, new 'rabbitmq' user would be added. Also if you do service `--status-all`, you should see `rabbitmq-server` service.

```
sudo service rabbitmq-server start | stop | restart
```

You can install management console on port 15672, default user is guest and passord is guest.

```
sudo rabbitmq-plugins enable rabbitmq_management
sudo rabbitmq-plugins enable rabbitmq_stomp
sudo service rabbitmq-server restart
```

You can monitor usage on command line using `rabbitmqctl status`. You can use web console if you do not like rabbitmqctl CLI. 

```
sudo rabbitmqctl stop | restart | status
sudo rabbitmqctl add_user user_name password_for_this_user
sudo rabbitmqctl set_user_tags user_name administrator
sudo rabbitmqctl set_permissions -p / user_name ".*" ".*" ".*"
```

Delete guest user 

```
sudo rabbitmqctl delete_user guest
```

##### Read ...

1. [Install RabbitMQ on Ubuntu](https://www.rabbitmq.com/install-debian.html)
2. [RabbitMQ on DZone](http://java.dzone.com/category/tags/rabbitmq)
3. [RabbitMQ samples on github](https://github.com/rabbitmq)