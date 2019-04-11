const url = 'http://localhost:3000/'
const jokesUrl = 'https://icanhazdadjoke.com/'

new Vue({
    el: '#app',
    data: {
        isLoggedIn: localStorage.getItem('token') ? true : false,
        showLoginForm: true,
        showRegisterForm: false,
        registerEmail: '',
        registerPassword: '',
        loginEmail: '',
        loginPassword: '',
        favoritJokes: [],
        joke: '',
    },
    created() {
        axios
            .get(jokesUrl, {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then(({ data }) => {
                this.joke = data.joke
            })
            .catch(err => {
                swal(err.response.data.message);
            })

        if (this.isLoggedIn) {
            this.getUserJokes()
        }
    },
    methods: {
        getJoke: function () {
            this.joke = '...'
            axios
                .get(jokesUrl, {
                    headers: {
                        Accept: 'application/json'
                    }
                })
                .then(({ data }) => {
                    this.joke = data.joke
                })
                .catch(err => {
                    swal(err.response.data.message);
                })
        },
        getUserJokes: function () {
            axios
                .get(url + 'favorites/', {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(({ data }) => {
                    this.favoritJokes = data
                })
                .catch(err => {
                    swal(err.response.data.message);
                })
        },
        saveJoke: function () {
            axios
                .post(url + 'favorites/', {
                    joke: this.joke
                }, {
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                .then(({ data }) => {
                    this.favoritJokes.push(data)
                    swal('Yess', 'Joke added to my favorites', 'success')
                    this.getJoke()
                })
                .catch(err => {
                    swal(err.response.data.message);
                })
        },
        deleteJoke: function (i) {
            swal({
                title: "Are you sure?",
                text: "Once remove, you will not be able to recover this joke!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        axios
                            .delete(url + 'favorites/' + this.favoritJokes[i]._id, {
                                headers: {
                                    token: localStorage.getItem('token')
                                }
                            })
                            .then(({ data }) => {
                                swal(data.message, {
                                    icon: "success",
                                });
                                this.getUserJokes()
                            })
                            .catch(err => {
                                swal(err.response.data.message);
                            })
                    } else {
                        swal("Fyuh, you got me there");
                    }
                });

        },
        login: function () {
            axios
                .post(url + 'users/login', {
                    email: this.loginEmail,
                    password: this.loginPassword
                })
                .then(({ data }) => {
                    localStorage.setItem('token', data.token);
                    this.isLoggedIn = true;
                    swal(data.message, 'Hei, welcome back!', 'success');
                    this.resetForm();
                    this.getUserJokes();
                })
                .catch(err => {
                    swal(err.response.data.message);
                })
        },
        register: function () {
            axios
                .post(url + 'users/register', {
                    email: this.registerEmail,
                    password: this.registerPassword
                })
                .then(({ data }) => {
                    swal('Wohoo', 'Register success!', 'success');
                    this.showRegisterForm = !this.showRegisterForm;
                    this.resetForm();
                })
                .catch(err => {
                    swal(err.response.data.message);
                })
        },
        logout: function () {
            localStorage.clear();
            this.isLoggedIn = false;
            swal('Log out succes', 'Bye! see you later!', 'success')
        },
        resetForm: function () {
            this.registerEmail = '';
            this.registerPassword = '';
            this.loginEmail = '';
            this.loginPassword = '';
        }
    }
})