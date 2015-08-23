---
layout: post
title: Using spring boot for REST service using JPA
date: 27 October, 2014
update: 27 October, 2014
---

With [spring-boot](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/) it is incredibly easy to create a JavaEE project using embedded container. Unlike Spring-ROO it is very easy to migrate to production environment. Without any boiler plate code you can be sure of not using deprecated spring api's from wild. 

You can view complete source code on [github](https://github.com/dhval/spring-boot-rest).

##### How to run this sample.

1.**Using IDE.**

It is web (war) ```mvn package``` package that can easily be deployed using your favorite Java IDE with a web container.

You would need to create a JNDI Datasource, /var/lib/tomcat7/conf/context.xml. The JPA-Hibernate would take care of generating tables and sql-ddl. 

```
<Resource auth="Container" driverClassName="com.mysql.jdbc.Driver" maxActive="10" maxIdle="5" maxWait="1000" name="jdbc/earth" type="javax.sql.DataSource" maxAge="180000" testOnBorrow="true" testWhileIdle="true" validationInterval="0" url="jdbc:mysql://localhost:3306/motherearth?autoReconnect=true" username="user" password="password" />
```

2.**Command Line**

To run using spring boot, ```mvn spring-boot:run```. Embedded server do not have any JNDI by default, you can create it [programmatically](http://stackoverflow.com/questions/24941829/how-to-create-jndi-context-in-spring-boot-with-embedded-tomcat-container) or just use plain datasource as follows. 

Update pom.xml packaging to jar.

```
<packaging>jar</packaging>
```

Instead of using JNDI-Datasource ```spring.datasource.jndi-name```, define your connection parameters in application.properties file. 

```
spring.datasource.driverClassName=com.mysql.jdbc.Driver
spring.datasource.url=jdbc:mysql://${mysql.host}:${mysql.port}/${mysql.database-name}?autoReconnect=true
spring.datasource.username=${mysql.user}
spring.datasource.password=${mysql.pass}
```