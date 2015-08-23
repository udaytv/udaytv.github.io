---
layout: post
title: From Java web jar to bower registry
date: 2 August, 2014
update: 2 August, 2014
---

Java web jars provide static resources for web projects, it supports very good integration with maven (or gradle) by creating overlays that can be unzipped and used inside war. Maven war plugin makes this drop-dead simple.

By using [bower](http://bower.io/) you can manage all your web resources much easier, it is significantly easier to update dependecies to newer versions. It start to make more sense if you use node-grunt tooling instead of hacking your way around maven with bunch of odd custom shell scripts. 

Once you start using bower then it is time to eat your own dog food. Bower facilitates you to publish your web resources (internally or externally) to a git server, all you have to do is 'git tag' and push your files. Bower look at tarballs associted with tags to infer version.

```
"dependencies": {
	"json3": "^3.3.0",
		....
	"common": "git://github.com/user/base-web.git"
}
```

You can reference dependency from another git project like below, notice .git/ at end.

```
"dependencies": {
	"json3": "^3.3.0",
		....
	"common": "/Users/dhval/java/git-repository/jnet/base-web/.git/"
}
```

Here is a sample flow of publishing a existing github project as npm registry.

```
git tag "v0.0.0"
git push origin --tags

bower register common git://github.com/user/base-web.git
```

To automate above steps you can use [grunt-bump](https://github.com/vojtajina/grunt-bump).

```
grunt.initConfig({
bump: {
    options: {
        files: [
            "package.json",
            "bower.json"
        ],
        push: "true",
        pushTo: 'origin'
    }
}
});
```

Time to tell [maven-war-plugin](http://maven.apache.org/plugins/maven-war-plugin/index.html) to copy all resources from Project_Root/dist into exploded-war directory. So that all maven based IDE like IntelliJ can create war naturally. Note web resources are different from regular resources like xml, properties, schema beans etc. You use [maven-resources-plugin](https://maven.apache.org/plugins/maven-resources-plugin/index.html) and ```mvn resources:copy-resources``` for them.

**Before** ```mvn war:exploded```

```
Root
|---dist
	|---common <!-- Bower created internal resources here-->
	|---....
	|---json3
```

**After** I need my internal dependencies in web/{ js| css} and external dependencies in web/dist/dependency-name/ with their licenses.

```
target
|---<app-name>
	|
	|----dist/json3
	|----js/common
	|----css/common
	|----css/img
```

We need to add ```webReources``` element in our war-plugin config.

```
<build>
<plugins>	
<plugin>
<groupId>org.apache.maven.plugins</groupId>
<artifactId>maven-war-plugin</artifactId>
<version>2.3</version>
<configuration>
    <archive>
        <manifest>
            <classpathPrefix>WEB-INF/lib/</classpathPrefix>
            <addClasspath>true</addClasspath>
        </manifest>
    </archive>
    <!-- Filter, replace properties with values. -->
    <filters>
        <filter>src/main/resources/application.properties</filter>
    </filters>
    <nonFilteredFileExtensions>
        <!-- default value contains jpg,jpeg,gif,bmp,png -->
        <nonFilteredFileExtension>pdf</nonFilteredFileExtension>
    </nonFilteredFileExtensions>
    <!-- Copy resources to different directories. -->
    <webResources>
        <resource>
            <excludes>
                <exclude>**/common/**</exclude>
            </excludes>
            <directory>dist</directory>
            <targetPath>dist</targetPath>
            <!-- it's not a good idea to filter binary files -->
            <filtering>false</filtering>
        </resource>
        <resource>
            <directory>dist/common/js</directory>
            <targetPath>js/common</targetPath>
            <filtering>false</filtering>
        </resource>
        <resource>
            <directory>dist/common/css</directory>
            <targetPath>css/common</targetPath>
            <filtering>false</filtering>
        </resource>
        <resource>
            <directory>dist/common/img</directory>
            <targetPath>css/img</targetPath>
            <filtering>false</filtering>
        </resource>
    </webResources>
</configuration>
</plugin>
</plugins>
</build>
```