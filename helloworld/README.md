Simplest Vue setup possible
===========================

No webpack, no node modules, plain JavaScript, HTML, CSS


Setup
-----

1. download Vue from https://vuejs.org/js/vue.js
2. include vue.js in your index.html
3. create an element that Vue component will start at `<div id="app>{{message}}</div>`
4. create your top-level component:

```
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
});

```
