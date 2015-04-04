Angular / Java Script Playground
===================================

#### Play around with your local angular apps with all angular modules.

Many times I found myself fumbling and wanted to see how things work isolated from the web application that I am working on. With Grunt's live reload and build in server I can now easily test/hack my individual components outside of the application. You can simply clone this [repository](https://github.com/dhval/ng-grunt) and get started in no time.

Bower makes it possible to quickly assemble all required dependencies from their repositories. There might be better tools but these are most main stream in web development with answers to every setup questions on Stack overflow. So anyone can just fork this project and start in no time. 

I would personnaly recommend [codepen.io](http://codepen.io/dhval/public-list/), if you are not familiar with npm, grunt and Java Script. It is great for HTML and CSS but slows down a lot if you are using heavy javascript frameworks as linter and web workers try to parse your code with every key up event. There is paid options starting with $5/mo or better try [Plnkr](http://plnkr.co/users/dhval), but soon as your playground grows you will be hit by a wall.

#### Setup

* Using npm, install npm on your machine and clone this [repository](https://github.com/dhval/ng-grunt). 

```
cwd:~/github/ng-grunt> 

npm init
npm install -g grunt-cli		
npm install 					// Install local grunt dependencies

grunt download-resources 		// Download vendor resources using bower
grunt build						// Run build task on resources
grunt serve 					// Launch your browser with live reload.
```

* No Setup, just open file index.html in chrome after cloning this [repository](https://github.com/dhval/ng-grunt), chrome serves local file resources and you can live edit in developer tools.


You can file any issues here, [issues](https://github.com/dhval/dhval.github.io/issues) 

If you have any suggesitons please send me [here](http://dhval.github.io/suggestions/)

#### Hosted Java backend for your local angular apps.

You can use hosted Rest services using localhost or github.io for CORS origin check. The rest backend is running on UBUNTU LTS 14.4 with ng-inx, mysql, apache tomcat 8, Rabbit MQ, Java Rest 2.1 and Hibernate JPA. You can look complete source code [here](http://dhval.github.io/spring-boot-rest) or file an [issue](http://dhval.github.io/spring-boot-rest/issues).



##### Resources 

1. [codepen.io](http://codepen.io/dhval/public-list/)
2. [Java Rest Backend] (http://dhval.github.io/services)
3. [Suggestions form] (http://dhval.github.io/suggestions/)


##### Copyright and license

[The MIT License (MIT)](https://github.com/dhval/dhval.github.io/blob/master/LICENSE.md)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

