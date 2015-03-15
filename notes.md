Coffee Shop Map
===============
A simple app to show the technology that can be used to create a map app from a static web page.

Technology Stack
----------------

### Base
* HTML 
* CSS  
* BootStrap - http://getbootstrap.com/
* jQuery
* Google Maps V3

### Helpers
* tkmap 4.0.0
* infobox
* tabletop

### Project Specific
* projects
* event

### Site Specific
* local.js

### Other
* JSON



Setup working environment
=========================

Create Repository in GitHub
---------------------------
Go to GitHub and create a repository, giving the following information:

* Repository name: my-map
* Description: Map of coffee shops I goto
* Select "Public - Anyone can see this repository. You choose who can commit."
* Select: "Initialize this repository with a README"
* Add .gitignore: Jekyll, this is closest to what we want
* Add a license: MIT License


Clone a copy of the repository on your laptop
---------------------------------------------

At the end of this

* Go to where you will want to put your Coffee Map project.  For myself I have a directory called "Projects" that I keep all of my projects.
* In your Projects directory clone your repositiory.  I used the command line

    git clone git@github.com:zmon/my-map-doc.git

You should endup with a directory called *my-map*



Create a index.html
-------------------

This is taken from http://getbootstrap.com/examples/navbar-static-top

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Static Top Navbar Example for Bootstrap</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <!-- Static navbar -->
    <nav class="navbar navbar-default navbar-static-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Project name</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li class="divider"></li>
                <li class="dropdown-header">Nav header</li>
                <li><a href="#">Separated link</a></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="../navbar/">Default</a></li>
            <li class="active"><a href="./">Static top <span class="sr-only">(current)</span></a></li>
            <li><a href="../navbar-fixed-top/">Fixed top</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>


    <div class="container">

      <!-- Main component for a primary marketing message or call to action -->
      <div class="jumbotron">
        <h1>Navbar example</h1>
        <p>This example is a quick exercise to illustrate how the default, static and fixed to top navbar work. It includes the responsive CSS and HTML, so it also adapts to your viewport and device.</p>
        <p>To see the difference between static and fixed top navbars, just scroll.</p>
        <p>
          <a class="btn btn-lg btn-primary" href="../../components/#navbar" role="button">View navbar docs &raquo;</a>
        </p>
      </div>

    </div> <!-- /container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <!-- <script src="../../assets/js/ie10-viewport-bug-workaround.js"></script> -->
  </body>
</html>
```

Now you should be able to view the `index.html` by opening it with your browser. 
It should be something like file:///..../my-map/index.html

Lets get some data
------------------
We are going to change the `index.html` so the jumbotron tells the user what they need to do and 
it includes the file with our "app" `js/app.js`.

Change to bottom of the `index.html` to the following:

```
    <div class="container">

      <!-- Main component for a primary marketing message or call to action -->
      <div class="jumbotron">
        <h1>311 Data Example - Use Your Debuger Console to see the data</h1>
        <p>Open up your debuger and it's console.  Then refreash this page.
        </p>
      </div>

    </div> <!-- /container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
    <script src="js/app.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <!-- <script src="../../assets/js/ie10-viewport-bug-workaround.js"></script> -->
  </body>
</html>
```

Place the following in `js/app.js`

```
/* From http://www.nczonline.net/blog/2010/05/25/cross-domain-ajax-with-cross-origin-resource-sharing/ */
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}


var d = new Date();
var month = d.getMonth() + 1;

if (d.getHours() < 7) {
    var day = d.getDate() - 2;
} else {
    var day = d.getDate() - 1;
}

var output = d.getFullYear() + '-' +
    (('' + month).length < 2 ? '0' : '') + month + '-' +
    (('' + day).length < 2 ? '0' : '') + day;
var yesterday = output + 'T00:00:00';

// See http://dev.socrata.com/docs/queries.html on SoQL Clauses

var request = createCORSRequest("get", "http://data.kcmo.org/resource/7at3-sxhp.json?$where=creation_date='" + yesterday + "'");
if (request) {
    request.onload = function () {
        var data = JSON.parse(request.responseText);
        console.dir( data );
    };
    request.send();
}
```


