<template>
    <!-- Begin Login Page -->
    <div id="wrapper">
        <section>
             <div class="container">
                <div class="row">
                    <div class="col-sm-12">

                        <div class="wrapper-page">

                            <div class="account-pages">
                                <div class="account-box">
                                    <div class="account-logo-box">
                                        <h5 class="text-uppercase text-center font-bold headling">
                                           BULK SMS SYSTEM
                                        </h5>
                                    </div>
                                    <div class="account-content">
                                        <form class="form-horizontal" @submit="loginUser">
                                          <p :style="{color:errorMessageColor,textAlign:'center'}" v-if="unauthenticated">{{ unauthenticatedMessage | capitalize }}</p>

                                            <div class="form-group m-b-20 row">
                                                <div class="col-12">
                                                    <label for="emailaddress">Username or email address</label>
                                                    <input class="form-control" type="text" required v-model="email" placeholder="Enter your email address or username">
                                                </div>
                                            </div>

                                            <div class="form-group row m-b-20">
                                                <div class="col-12">
                                                   
                                                    <label for="password">Password</label>
                                                    <input class="form-control" type="password" required v-model="password" placeholder="Enter your password">
                                                </div>
                                            </div>

                                           

                                            <div class="form-group row text-center m-t-10">
                                                <div class="col-12">
                                                    <button class="btn btn-block btn-gradient waves-effect waves-light" type="submit">Login</button>
                                                </div>
                                            </div>

                                        </form>

                                        <div class="row m-t-50">
                                            <div class="col-sm-12 text-center">
                                                <p class="text-muted">Don't have an account? <a href="#" @click="$emit('sign-up')" class="text-dark m-l-5"><b>Create new account</b></a></p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <!-- end card-box-->


                        </div>
                        <!-- end wrapper -->

                    </div>
                </div>
            </div> 
        </section>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'Login',
    components:{

    },
    props:{

    },
    data (){
        return {
            email:'',
            password:'',
            baseApiUrl:process.env.VUE_APP_END_POINT,
            unauthenticated:true ,
            unauthenticatedMessage:"kindly login to proceed.",
            errorMessageColor:"black",
            config:null
        }
    },
    methods:{
        loginUser(e)
        {
            e.preventDefault();
            const obj = {
                email : this.email,
                password : this.password
            };
            if(this.email!==null && this.password!==null)
            {
                this.unauthenticatedMessage="Attempting to login,kindly wait!";
                this.errorMessageColor="blue";
                let currentObj = this;
                axios.post(this.baseApiUrl +"/login",obj,this.config)
                .then((res) => {
                    //console.log(res.data);
                    let response =res.data;
                    //console.log(response);
                    if(response.status == "success")
                    {
                        let loc = window.location.href;
                        window.location.href= loc+"dashboard";
                        this.unauthenticated = false
                    }
                    else if(response.status == "error")
                    {
                        currentObj.unauthenticatedMessage=response.message;
                        currentObj.errorMessageColor="red";
                    }
                    //console.log(res.data);
                }).catch(err => console.log(err));
            
            }
        }
    },
    created(){
        this.config = {
            headers:{
                //Authorization
                "Content-Type":'application/json',
                "Accept":"application/json"
            }
        };
    }
}
</script>