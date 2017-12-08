<template>
    <div>
        <p>Please log in to git.int.avast.com</p>
        <p v-if="error" class="error">{{error}}</p>
        <form @submit="login">
            <label for="username">User name</label><br />
            <input type="text" v-model="username" /><br />

            <label for="password">Password</label><br />
            <input type="password" v-model="password" /><br />

            <input type="submit" value="Login" /><br />
        </form>
    </div>
</template>

<script>
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
            window.fetch('https://git.int.avast.com/api/v4/session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'login='+this.username+'&password='+this.password
            })
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                else {
                    return resp.json()
                        .then(err => Promise.reject(err.error));
                }
            })
            .then(loginData => {
                 this.$emit('login', { token: loginData.private_token });
            })
            .catch(err => {
                this.$emit('error', err);
            });
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
