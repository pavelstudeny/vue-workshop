<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <GitLogin v-if="!gitToken" @login="login" @error="loginError" :error="gitError" />
    <ProjectList v-else :projects="projects" />
  </div>
</template>

<script>
import GitLogin from './GitLogin.vue'
import ProjectList from './ProjectList.vue'
import fetch from './fetch.js';

export default {
  name: 'app',
  components: {
    GitLogin,
    ProjectList
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      gitToken: '',
      gitError: '',
      projects: []
    }
  },
  methods: {
    login(credentials) {
      this.gitError = '';
      this.gitToken = credentials.token;
      this.listProjects()
        .then(list => this.projects = list);
    },
    loginError(error) {
      this.gitToken = '';
      this.gitError = error;
    },
    listProjects() {
      return fetch('https://git.int.avast.com/api/v4/projects' + '?access_token=' + this.gitToken)
        .then(resp => {
          if (!resp.ok) {
            return resp.json()
              .then(err => Promise.reject('api error ' + (err.error || err).toString()));
          }
          return resp.json();
        })
        .then(list => {
          return list.map(p => { return { name: p.path_with_namespace, id: p.id }; });
        })
        .catch(err => { console.log(err); return [{name: 'unexpected error:', id: err.toString() }]; });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
