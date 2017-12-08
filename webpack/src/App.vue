<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <GitLogin v-if="!gitToken" @login="login" @error="loginError" :error="gitError" />
    <ProjectList v-else :projects="projects" />
  </div>
</template>

<script>
import GitLogin from './GitLogin'
import ProjectList from './ProjectList'

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
      return window.fetch('https://git.int.avast.com/api/v4/projects' + '?private_token=' + this.gitToken)
        .then(resp => {
          if (!resp.ok) {
            return resp.json()
              .then(err => Promise.reject(err.error));
          }
          return resp.json();
        })
        .then(list => {
          return list.map(p => { return { name: p.path_with_namespace, id: p.id }; });
        })
        .catch(err => { console.log(err); return []; });
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
