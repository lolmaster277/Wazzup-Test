Vue.component('sel-user', {
    props: ['name', 'adress_info'],
    template: `
        <div class='container'>
            <h1>Имя {{name}}</h1>
            <p v-for='(value,key) in adress_info'>{{key}}: {{value}}</p>
        </div>`
})

Vue.component('user-table', {
    props: ['data', 'colums'],
    data: function() {
        return {
            lastSortColum: -1,
            flagAsc: true,
            curPage: 0,
            perPage: 50,
            filter: [],
            pages: [],
        }
    },
    template: `
    <div class="container-fluid">
        <div class="row">
            <div class="col-6"><button class="btn btn-primary mt-2 mb-2" @click="filterPage">Найти</button></div>
            <div class="col-6 text-right p-3">
                <button @click="firstPage" class="btn btn-outline-dark"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-double-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
              </svg></button> 
                <button @click="prevPage" class="btn btn-outline-dark"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-compact-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/>
              </svg></button> 
                <span class="p-3">{{curPage+1}}</span>
                <button @click="nextPage" class="btn btn-outline-dark"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-compact-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/>
              </svg></button> 
                <button @click="lastPage" class="btn btn-outline-dark"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-double-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
                <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
              </svg></button> 
            </div>
            
        </div>
        
        <table class="table table-hover">
            <thead class="thead-light">
                <tr>
                    <th v-for='(colum,index) in colums' class="hover-elem" @click=sortBy(index+1)>
                        <div class="row">
                            <div class="col-8">
                                {{colum}}
                            </div>
                            <div class="col-4" v-if="lastSortColum==index+1">
                                <span v-if="flagAsc"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                            </svg></span>
                                <span v-if="!flagAsc"> <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                            </svg></span>
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="no-hover">
                    <td v-for='(colum,index) in colums' ><input type="text" class="form-control" v-model="filter[index]"></td>
                </tr>
                <tr v-for="(row,index) in pages[curPage]" :key="index" class="pointer" @click="showModal(row[0])">
                    <td v-for='col in row.slice(1)'>{{col}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    
    `,
    methods: {
        showModal: function(index) {
            this.$emit('showmodal', index);
        },
        sortBy: function(colum) {
            if (this.flagAsc) {
                this.pages[this.curPage].sort((a, b) => a[colum] < b[colum] ? 1 : -1);
                this.flagAsc = !this.flagAsc;
            } else {
                this.pages[this.curPage].sort((a, b) => a[colum] > b[colum] ? 1 : -1);
                this.flagAsc = !this.flagAsc;
            }
            this.lastSortColum = colum;
        },
        nextPage: function() {
            if (this.curPage + 1 < Math.ceil(this.data.length / this.perPage)) {

                this.curPage++;
                this.lastSortColum = -1;
                this.pages[this.curPage - 1] = this.data.slice((this.curPage - 1) * this.perPage, (this.curPage) * this.perPage);
            }

        },
        prevPage: function() {
            if (this.curPage - 1 >= 0) {

                this.curPage--;
                this.lastSortColum = -1;
                this.pages[this.curPage + 1] = this.data.slice((this.curPage + 1) * this.perPage, (this.curPage + 2) * this.perPage);


            }
        },
        firstPage: function() {
            let i = this.curPage;
            this.curPage = 0;
            this.lastSortColum = -1;
            this.pages[i] = this.data.slice(i * this.perPage, (i + 1) * this.perPage);


        },
        lastPage: function() {
            let i = this.curPage;

            this.curPage = Math.ceil(this.data.length / this.perPage) - 1;
            this.pages[i] = this.data.slice(i * this.perPage, (i + 1) * this.perPage);

            this.lastSortColum = -1;

        },
        filterPage: function() {
            //Дописать фильтр И условия возможно придется переписать

            if (this.filter.join("") == "") {
                this.pages[this.curPage] = this.data.slice(this.curPage * this.perPage, (this.curPage + 1) * this.perPage);
            } else {
                var new_page = [];
                var old_page = this.data.slice(this.curPage * this.perPage, (this.curPage + 1) * this.perPage);
                for (let i = 0; i < this.filter.length; i++) {
                    if (this.filter[i] == "") {
                        continue;
                    } else {
                        var filter_page = [];
                        for (let j = 0; j < old_page.length; j++) {
                            if ((old_page[j][i + 1].toLowerCase().indexOf(this.filter[i].toLowerCase()) != -1) && (!filter_page.includes(old_page[j]))) {
                                filter_page.push(old_page[j]);
                            }
                        }
                        if (filter_page.length == 0) {
                            new_page = [];
                            break;
                        } else {
                            if (this.filter.slice(0, i).join("") == "") {
                                new_page = filter_page;
                            } else {
                                var update = [];
                                for (let j = 0; j < filter_page.length; j++) {
                                    if (new_page.includes(filter_page[j])) {
                                        update.push(filter_page[j]);
                                    }
                                }
                                new_page = update;
                            }
                        }
                    }

                }

                if (new_page.length != 0) {
                    this.pages[this.curPage] = new_page;
                } else {
                    this.pages[this.curPage] = [];
                }
            }



            this.$forceUpdate();

        },

    },
    mounted() {
        for (let i in this.colums) {
            this.filter.push("");
        }

    },
    watch: {
        data: function() {
            this.pages = [];
            this.lastSortColum = -1;
            this.flagAsc = true;
            this.curPage = 0;
            for (let i = 0; i < Math.ceil(this.data.length / this.perPage); i++) {
                this.pages.push(this.data.slice(i * this.perPage, (i + 1) * this.perPage));
            }
        }
    }

})

const app = new Vue({
    el: '#app',
    data: {
        users: [],

        columstable: ['ФИО', 'Логин', 'Компания', 'Email', 'Штат'],
        viewModal: false,
        selName: "",
        selAdress: {},
    },
    methods: {

        getUsers: function() {
            let app = this;
            app.datatable = [];



            axios.get('http://www.filltext.com/?rows=1000&id={index}&fullname={firstName}~{lastName}&company={business}&email={email}&uname={username}&address={addressObject}').then(function(response) {
                if (response.status == '200') {
                    app.users = response.data;
                } else {
                    alert("Упс! Что-то не так :(");
                }
            });
        },

        showModal: function(index) {
            this.selName = this.users.find(element => element.id == index).fullname;
            this.selAdress = this.users.find(element => element.id == index).address;
            this.viewModal = true;
        },

        closeModal: function() {
            this.viewModal = false;
        },
    },
    mounted() {
        //this.getUsers(); Для загрузки данных сразу

    },
    created() {
        var app = this;
        window.addEventListener('keyup', function(event) {
            if (event.keyCode == 27) {
                app.closeModal();
            }
        });
    },
    computed: {
        datatable: function() {
            var arr = [];
            for (let user in this.users) {
                arr.push([this.users[user].id, this.users[user].fullname, this.users[user].uname, this.users[user].company, this.users[user].email, this.users[user].address.state]);
            }
            return arr;
        }
    }
})