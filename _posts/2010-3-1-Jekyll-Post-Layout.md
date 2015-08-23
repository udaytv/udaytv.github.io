---
layout: post
title: Building this blog with Jekyll & Evernote
date: 1 March, 2009
update: 20 August, 2015
excerpt: I was able to build this blog using Jekyll templating in couple of hours. If you are interested, hit the link below.
permalink: Setup
---

I was able to build this blog using [Jekyll](http://jekyllrb.com/) templating in couple of hours, it is far from pixel perfect but simple enough to get running. Thanks to Evernote & hints from [Geeknote](https://github.com/VitaliyRodnenko/geeknote), I pull all 'blog' tagged notes from evernote and publish to this site. So after setup everything is automated and free :) yah! 

Evernote has a python SDK that allows automating various note things, ofcourse when evernote is online, which is :( sadly not all the time.   
Run into setting up posts using Jekyll and found quick answer on Stack Overflow. Below are the things I used for setting this blog -

1. Used [Grunt](http://gruntjs.com/) to automate Jekyll templating and organizing static html resources.

2. Published on github using similar work flow as mentioned in this [post](http://www.aymerick.com/2014/07/22/jekyll-github-pages-bower-bootstrap.html). 

3. Hadn't used Jekyll [Documentation](http://jekyllrb.com/docs/home/) before so ran into some issues but it is a wonderful templating framework. Below is yml markup for this pages' meta data.

	```
	---
	layout: post
	title: Building this blog with Jekyll & Evernote
	date: 1 March, 2009
	update: 20 August, 2015
	excerpt: I was able to build this blog using Jekyll templating in couple of hours. If you are interested, hit the link below.
	permalink: Setup
	---
	```

4. Modified [Geeknote](https://github.com/VitaliyRodnenko/geeknote) Python SDK and used [Evernote API](https://dev.evernote.com/doc/reference) to generate pages from my evernote's notebook. I am great fan of evernote, it is the most functional note taking software I have came across. I rely heavily on it for my work and home notes.

All the notes here get updated automatically as I update in my evernote and run grunt task (weekly) to publish them.
