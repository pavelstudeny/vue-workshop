<template>
    <div>
        <p>Please log in to git.int.avast.com</p>
        <p v-if="error" class="error">{{error}}</p>
        <form @submit="login">
            <label for="username">User name</label><br />
            <input type="text" v-model="username" /><br />

            <label for="password">Password</label><br />
            <input type="password" v-model="password" /><br />

            <button @click="login">Login</button><br />
        </form>
    </div>
</template>

<script>
import fetch from './fetch.js';

export default {
    name: 'GitLogin',
    props: ['error'],
    data () {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login(event) {
            try {
                fetch('https://git.int.avast.com/oauth/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: 'grant_type=password&username='+this.username+'&password='+this.password
                })
                .then(resp => {
                    if (resp.ok) {
                        return resp.json();
                    }
                    else {
                        return resp.json()
                            .then(err => Promise.reject('network error ' + (err.error || err).toString()));
                    }
                })
                .then(loginData => {
                    this.$emit('login', { token: loginData.access_token });
                })
                .catch(err => {
                    this.$emit('error', 'login error ' + err.toString());
                });
            }
            catch (ex) {
                this.$emit('error', 'login exception ' + ex.toString());
            }
            event.preventDefault();
        }
    }
}
</script>

<style scoped>
.error {
    color: red;
}
form input {
    margin-top: 0.5em;
    margin-bottom: 1em;
}
</style>
