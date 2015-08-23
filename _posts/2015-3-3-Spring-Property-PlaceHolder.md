---
layout: post
title: Using spring property place holder
date: 3 March, 2014
update: 3 March, 2014
---

We all freqently, use spring property holder in our spring based applications. But there are few cavets that are worth revisiting.

Old Way

```
<context:property-placeholder location="application.properties"/>
```

Spring 3.1

```
---spring.xml---

<bean class="org.springframework.context.support.PropertySourcesPlaceholderConfigurer">
  <property name="locations">
   <list>
    <value>classpath:application.properties</value>
    <value>classpath:rabbitmq.properties</value>
   </list>
</property>
  <property name="ignoreUnresolvablePlaceholders" value="true"/>
</bean>
```

The real goodness happens below. The @Autowired together with @Value let spring initilize component with w/o no argument constructor. Note ':' in @Value is used to specify default value.

```
@Component
public class QueueConsumer extends EndPoint implements Runnable, Consumer {

    @Autowired
    public QueueConsumer( @Value("${rabbit.host:192.168.0.112}") String host,
                          @Value("${rabbit.endpoint:queue}") String endPointName) throws IOException{
        super(host, endPointName);
    }

...
}    
```

And lastly, obtaining properties via the new Environment APIs.

```
@Autowired
private Environment env;

dataSource.setUrl(env.getProperty("jdbc.url"));
````

[Read ...](http://www.baeldung.com/2012/02/06/properties-with-spring/)

