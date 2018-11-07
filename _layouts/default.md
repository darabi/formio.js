<!DOCTYPE html>
<html lang="en">
<head>

  <base href="{{ site.baseUrl }}/"></base>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JavaScript Powered Forms and Form.io SDK</title>
  <link href="{{ site.baseUrl }}/app/syntax.css" rel="stylesheet">
  <link href="{{ site.baseUrl }}/app/main.css" rel="stylesheet">
  <link href="{{ site.baseUrl }}/app/fontawesome/css/font-awesome.min.css" rel="stylesheet">
  <link href="{{ site.baseUrl }}/app/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  {% if page.template %}
    <link href="{{ site.baseUrl }}/app/bootswatch/{{ page.template }}/bootstrap.min.css" rel="stylesheet">
  {% endif %}
  {% if page.template == nil %}
    <link href="{{ site.baseUrl }}/app/bootswatch/yeti/bootstrap.min.css" rel="stylesheet">
  {% endif %}
  <link href="{{ site.baseUrl }}/dist/formio.full.min.css" rel="stylesheet">
  <script src="{{ site.baseUrl }}/app/jquery/jquery.slim.min.js"></script>
  <script src="{{ site.baseUrl }}/app/bootstrap/js/bootstrap.min.js"></script>
  <script src="{{ site.baseUrl }}/dist/formio.full.js"></script>
  {% if page.contrib %}
    <script src="{{ site.baseUrl }}/dist/formio.contrib.min.js"></script>
  {% endif %}
  <script type="text/javascript">Formio.icons = 'fontawesome';</script>
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <a class="navbar-brand" href="#">
      <img height="25px;" style="display: inline;" alt="Form.io" src="{{ site.baseUrl }}/app/assets/images/formio-logo.png"> | JavaScript SDK Library
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <ul class="navbar-nav nav-fill">
        <li class="nav-item px-3 {% if page.section == 'home' %}active bg-white border{% endif %}"><a class="nav-link" href="{{ site.baseUrl }}"><i class="fa fa-home"></i></a></li>
        <li class="nav-item px-3 {% if page.section == 'builder' %}active bg-white border{% endif %}"><a class="nav-link" href="app/builder"><i class="fa fa-th-list"></i> Form Builder</a></li>
        <li class="nav-item px-3 {% if page.section == 'examples' %}active bg-white border{% endif %}"><a class="nav-link" href="app/examples"><i class="fa fa-check-square-o"></i> Examples</a></li>
        <li class="nav-item px-3"><a class="nav-link" target="_blank" href="https://github.com/formio/formio.js/wiki"><i class="fa fa-book"></i> Documentation</a></li>
        <li class="nav-item px-3 {% if page.section == 'sdk'%}active bg-white border{% endif %}"><a class="nav-link" href="app/sdk"><i class="fa fa-list-alt"></i> SDK</a></li>
      </ul>
    </div>
  </div>
</nav>
<div class="{% if page.fluid %}container-fluid{% endif %}{% if page.fluid == nil %}container{% endif %}">
  {{ content }}
</div>
</body>
</html>
