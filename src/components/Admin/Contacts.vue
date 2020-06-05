<template>

        <!-- Begin page -->
        <div id="wrapper">

          <TopNavbar/>


          <Sidebar/>
            <!-- ============================================================== -->
            <!-- Start right Content here -->
            <!-- ============================================================== -->
            <div class="content-page">
                <!-- Start content -->
                <div class="content">
                    <div class="container-fluid">
                      <div class="row">
                          <div class="col-12">
                              <div class="page-title-box">
                                  <h4 class="page-title float-left">Contacts List</h4>

                                  <ol class="breadcrumb float-right">
                                      <li class="breadcrumb-item"><a href="#">BULK SMS</a></li>
                                      <li class="breadcrumb-item active">Contacts</li>
                                  </ol>

                                  <div class="clearfix"></div>
                              </div>
                          </div>
                      </div>

                      <!-- user -->
                      <div class="row" v-if="!displayEditForm && !displayAssignForm">
                            <div v-if="deletionOutput" class="col-12 alert alert-success text-center" style="color:green;">{{ deletionOutputMessage }}</div>
                          <div class="col-12">
                              <div class="card-box table-responsive">
                                <button type="button" class="btn btn-primary btn-sm waves-effect waves-light" data-toggle="modal"
                                data-target="#new-contact">
                                  New Contact</button>
                                <table id="datatable" class="table table-bordered text-center dataTable no-footer">
                                  <thead>
                                    <th>#</th>
                                    <!-- <th>Full names</th> -->
                                    <th>Contact Number</th>
                                    <th>Contact Name</th>
                                   
                                    <th style="text-align:center;">Action</th>
                                     <th style="text-align:center;">Send Sms</th>
                                  </thead>
                                    <tbody>
                                      <tr v-for="(user , index) in users" :key="user.id">
                                        <td>{{i =index+=1}}</td>
                                        <td>
                                          {{ user.name!==null ? user.name : "" }}
                                        </td>
                                        <td>{{  user.phone_no!==null ? user.phone_no: '----' }}</td>
                                        <td style="text-align:center;">
                                           <i class="fa fa-pencil" style="margin:3px;cursor:pointer; color:blue;" @click="GetAssignInformation(user.id)"></i>&nbsp;&nbsp;
                                          <i class="fa fa-edit" style="margin:3px;cursor:pointer; color:blue;" @click="GetUserInformation(user.id)"></i>&nbsp;&nbsp;
                                          <i class="fa fa-trash" style="margin:3px;cursor:pointer; color:red;"  @click="deleteUser(user.id)"></i>
                                        </td>
                                       
                                        <td> <b class="btn btn-primary btn-sm waves-effect waves-light"  data-toggle="modal"
                                data-target="#new-message"><i class="fa fa-paper-plane" style="margin:3px;cursor:pointer; color:blue;" @click="GetSmsInformation(user.id)"></i></b>&nbsp;&nbsp; </td>
                                      </tr>
                                      <tr style="text-align:center;" v-if="dataNotAvailable">
                                        <td colspan="11">No data available.</td>
                                      </tr>
                                    </tbody>
                                </table>
                              </div>
                          </div>
                      </div>
                      <!-- user -->
                      <!-- Assign Group -->
                      <div class="row" v-if="displayAssignForm">
                          <div class="col-12">
                              <div class="card-box table-responsive">
                                <div class="row">
                                  <div class="col-6">
                                    <span class="text-info">Assign Group</span>
                                  </div>
                                  <div class="col-6 text-right">
                                    <span  @click="displayAssignForm = !displayAssignForm ; sendingUpdateRequest = false; " class="btn btn-info btn-sm" style="cursor:pointer;">View Contacts</span>
                                  </div>
                                </div>

                                  <form class="form-horizontal" action="#" @submit="AssignGroup">
                                         
                                      <div class="form-group m-b-25 row">
                                          <div class="col-12">
                                              <label for="fullnames">Group</label>
                                             <select class="form-control" name="group_contact_id" id="group_contact_id" v-model="group_contact_id">
                                          <option value="">--Select--</option>
                                          <option :value="group.id" :key="group.id" v-for="group of groups">
                                            {{ jsUcfirst(group.name) }}
                                          </option>
                                        </select>
                                          </div>
                                      
                                      
                                      
                                          
                                      </div>

                                      <div class="form-group account-btn text-center m-t-10 row">
                                        <div class="col-12">
                                          <button class="btn w-lg pull-right btn-sm btn-info waves-effect waves-light" type="submit">Assign</button>
                                        </div>
                                          <div class="col-12">
                                            <p style="text-align:center;" :style="{color:sendingUpdateRequestMessageColor}" v-if="sendingUpdateRequest">{{ sendingUpdateRequestMessage }}</p>
                                          </div>
                                      </div>

                                  </form>
                              </div>
                          </div>
                      </div>
                      <!-- update User -->
                      <!-- update User -->
                      <div class="row" v-if="displayEditForm">
                          <div class="col-12">
                              <div class="card-box table-responsive">
                                <div class="row">
                                  <div class="col-6">
                                    <span class="text-info">Contact  edit</span>
                                  </div>
                                  <div class="col-6 text-right">
                                    <span  @click="displayEditForm = !displayEditForm ; sendingUpdateRequest = false; " class="btn btn-info btn-sm" style="cursor:pointer;">View Contacts</span>
                                  </div>
                                </div>

                                  <form class="form-horizontal" action="#"  @submit="UpdateContactInfo">

                                      <div class="form-group m-b-25 row">
                                          <div class="col-4">
                                              <label for="fullnames">Fullnames</label>
                                              <input type="text" placeholder="fullnames" name="fullnames" v-model="efullnames" class="form-control" required>
                                          </div>
                                      
                                      
                                          <div class="col-4">
                                              <label for="phonenumber">Contact</label>
                                              <input type="text" placeholder="0712000000" name="phonenumber" v-model="ephonenumber" class="form-control" required>
                                          </div>
                                          
                                      </div>

                                      <div class="form-group account-btn text-center m-t-10 row">
                                        <div class="col-12">
                                          <button class="btn w-lg pull-right btn-sm btn-info waves-effect waves-light" type="submit">Update user info</button>
                                        </div>
                                          <div class="col-12">
                                            <p style="text-align:center;" :style="{color:sendingUpdateRequestMessageColor}" v-if="sendingUpdateRequest">{{ sendingUpdateRequestMessage }}</p>
                                          </div>
                                      </div>

                                  </form>
                              </div>
                          </div>
                      </div>
                      <!-- update User -->
                    </div> <!-- container -->

                </div>
                <!-- content -->

                <!-- Footer -->
                <Footer/>
                <!-- Footer -->

            </div>


            <!-- ============================================================== -->
            <!-- End Right content here -->
            <!-- ============================================================== -->
            <!-- Contacts visit content -->
            <div id="new-contact" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="custom-width-modalLabel" aria-hidden="true" style="display: none;">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">

                        <div class="modal-body">
                            <h4 class="text-uppercase text-success text-center">
                                New Contact
                            </h4>
                            <form class="form-horizontal" action="#"  @submit="NewContact">

                                <div class="form-group m-b-25 row">
                                    <div class="col-6">
                                        <label for="fullnames">Fullnames</label>
                                        <input type="text" placeholder="fullnames" name="fullnames" v-model="fullnames" class="form-control" required>
                                    </div>
                                
                                    <div class="col-6">
                                        <label for="phonenumber">Phone number</label>
                                        <input type="text" placeholder="0712000000" name="phonenumber" v-model="phonenumber" class="form-control" required>
                                    </div>
                                </div>

                                <div class="form-group account-btn text-center m-t-10 row">
                                  <div class="col-12">
                                    <button type="button" class="btn pull-left btn-sm btn-secondary waves-effect" data-dismiss="modal">Close</button>
                                    <button class="btn w-lg pull-right btn-sm btn-primary waves-effect waves-light" type="submit">Submit</button>
                                  </div>
                                    <div class="col-12">
                                      <p style="color:blue;text-align:center;" v-if="sendData">Sending data .... please wait.</p>
                                      <p style="color:green;text-align:center;" v-if="successU">{{successMessageU}}</p>
                                      <p style="color:red;text-align:center;" v-if="errorU">{{errorMessageU}}</p>
                                    </div>
                                </div>

                            </form>


                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->

 <!-- Contacts visit content -->
            <div id="new-message" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="custom-width-modalLabel" aria-hidden="true" style="display: none;">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">

                        <div class="modal-body">
                            <h4 class="text-uppercase text-success text-center">
                                Send Message
                            </h4>
                            <form class="form-horizontal" action="#"  @submit="sendSms">
                                <input type="hidden"  name="hiddenfullnames" v-model="hiddenfullnames">
                                <input type="hidden"  name="hiddenphonenumber" v-model="hiddenphonenumber">
                                <div class="form-group m-b-25 row">
                                    <div class="col-6">
                                        <label for="message">Type Message</label>
                                        <textarea cols="100" placeholder="message" name="message" v-model="message" class="form-control" required> </textarea>
                                    </div>
                                
                                   
                                </div>

                                <div class="form-group account-btn text-center m-t-10 row">
                                  <div class="col-12">
                                    <button type="button" class="btn pull-left btn-sm btn-secondary waves-effect" data-dismiss="modal">Close</button>
                                    <button class="btn w-lg pull-right btn-sm btn-primary waves-effect waves-light" type="submit">Send</button>
                                  </div>
                                    <div class="col-12">
                                      <p style="color:blue;text-align:center;" v-if="sendData">Sending data .... please wait.</p>
                                      <p style="color:green;text-align:center;" v-if="successU">{{successMessageU}}</p>
                                      <p style="color:red;text-align:center;" v-if="errorU">{{errorMessageU}}</p>
                                    </div>
                                </div>

                            </form>


                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->
            <!-- Contacts visit content -->
        </div>
        <!-- END wrapper -->
</template>

<script>

  import TopNavbar from '../TopNavbar.vue'
  import Footer from '../Footer.vue'
  import Sidebar from '../Sidebar.vue'
  import axios from 'axios'
  import 'jquery/src/jquery.js'
  import 'bootstrap/dist/js/bootstrap.min.js'
  export default {
    name: 'Users',
    components:{
      TopNavbar,
      Footer,
      Sidebar
    },
    props: {
      // msg: String
    },
    data() {
      return {
        fullnames:'',
        phonenumber:'',
        efullnames:'',
        ephonenumber:'',
        euser_key:'',
        sendingUpdateRequestMessage:'Updating...please wait!',
        sendingUpdateRequestMessageColor:'black',
        sendingUpdateRequest:false,
        displayEditForm:false,
        displayAssignForm:false,
        users:[],
        groups:[],
        dataNotAvailable:true,
        errorMessageU:'Action failed, Try again Later.',
        errorU:false,
        successU:false,
        successMessageU:'New Contact added successfully.',
        baseApiUrl :process.env.VUE_APP_END_POINT,
        sendData:false,
        sendD:false,
        config:null,
        deletionOutputMessage:"",
        message:"",
        deletionOutput:false,
        group_contact_id:'',
        hiddenfullnames:"",
        hiddenphonenumber:""
      }
    },
    methods:{

      jsUcfirst(string)
      {
          return string.charAt(0).toUpperCase() + string.slice(1);
      },
      hideErrors(){
        this.errorU=false;
        this.successU=false;
        this.sendData=false;
      },
      clearFormData(){
        this.fullnames='';
        this.phonenumber='';
      },
      NewContact(e){
        e.preventDefault();
        this.hideErrors();
            let obj = {
              fullnames:this.fullnames,
              phonenumber:this.phonenumber,
            };
            let currentObj = this;
            this.sendData=true;
            axios.post(this.baseApiUrl+'/contacts',obj, this.config).then(res => {
              currentObj.displayOutput(res.data.status,res.data.message,res.data.info);
            }).then(err=> {
              if(typeof err!=='undefined') {
                currentObj.displayOutput('error','Technical error ocurred, Contact administrator.');
              }
            });
        

      },
      deleteUser(key){
        if (key!==""&&key!==null) {
          if (confirm("Are you sure you want to delete this contact?")) {
            let currentObj = this;

            let deleteUrl = this.baseApiUrl +`/users/${key}`;
            this.sendData=true;
            this.deletionOutput=true;
            this.deletionOutputMessage ="Processing...kindly wait";
              axios.delete(deleteUrl,this.config).then(res => {
                currentObj.deletionOutputMessage =res.data.message;
                currentObj.users =res.data.info;
                setTimeout(()=>{
                  currentObj.deletionOutput=false;
                }, 3000);
              }).then(err=> {
                if(typeof err!=='undefined') {
                  currentObj.displayOutput('error','Technical error ocurred, Contact administrator.');
                }
              });

          }
        }else{
          this.displayOutput('error','Technical error ocurred, Contact administrator.');
        }
      },
      displayOutput(alertType,message,userInformation){
        this.sendData=false;
        if(alertType=="error"){
            this.successU=false;
            this.errorU=true;
            this.errorMessageU=message;
        }
        if(alertType=="success"){
            this.clearFormData();
            this.hideErrors();
            if(userInformation!== null ) this.users=userInformation;
            this.successU=true;
            this.errorU=false;
            this.dataNotAvailable=false;
            this.successMessageU=message;
        }
      },
      fetchContacts(){

        axios.get(this.baseApiUrl +"/contacts",this.config)
          .then((res) => {
            if(res.data !== null && res.data.length > 0){
              this.dataNotAvailable=false;
              this.users =res.data;
            }
          })
          .catch(err => console.log(err));
      },
      GetUserInformation(key){
        if (key!==""&&key!==null) {
          this.euser_key="";
          let obj = {
            key:key
          };

          let currentObj = this;

          axios.post(this.baseApiUrl +"/contactInfo",obj,this.config)
          .then((res) => {
            let response =res.data;
            if (response.status=="success") {
              let userObj = response.info;
              currentObj.efullnames = userObj.fullnames;
              currentObj.ephonenumber = userObj.phonenumber;
              currentObj.euser_key = userObj.id;
              currentObj.displayEditForm=true;
            }
            console.log(response);


          })
          .catch(err => console.log(err));
        }
      },
      
       GetAssignInformation(key){
        if (key!==""&&key!==null) {
          this.euser_key="";
          let obj = {
            key:key
          };

          let currentObj = this;

          axios.post(this.baseApiUrl +"/contactInfo",obj,this.config)
          .then((res) => {
            let response =res.data;
            if (response.status=="success") {
              let userObj = response.info;
              currentObj.efullnames = userObj.fullnames;
              currentObj.ephonenumber = userObj.phonenumber;
              currentObj.euser_key = userObj.id;
              currentObj.displayAssignForm=true;
            }
            console.log(response);


          })
          .catch(err => console.log(err));
        }
      },
       GetSmsInformation(key){
        if (key!==""&&key!==null) {
          this.euser_key="";
          let obj = {
            key:key
          };

          let currentObj = this;

          axios.post(this.baseApiUrl +"/contactInfo",obj,this.config)
          .then((res) => {
            let response =res.data;
            if (response.status=="success") {
              let userObj = response.info;
              currentObj.hiddenfullnames = userObj.name;
              currentObj.hiddenphonenumber = userObj.phone_no;
              currentObj.euser_key = userObj.id;
              
            }
            console.log(response);


          })
          .catch(err => console.log(err));
        }
      },
       fetchGroupsData(){
      axios.get(this.baseApiUrl +"/groups",this.config)
        .then((res) => {
          if(res.data !== null && res.data.length > 0){
            this.groups =res.data;
            this.dataNotAvailable=false;
          }
        })
        .catch(err => console.log(err));
    },
      UpdateContactInfo(e){

        e.preventDefault();
        this.hideErrors();
        this.sendingUpdateRequestMessageColor="black";
        let obj = {
          fullnames:this.efullnames,
          phonenumber:this.ephonenumber
        };

        let currentObj = this;

        let updateUrl = this.baseApiUrl +`/users/${this.euser_key}`;

        this.sendingUpdateRequest=true;

        axios.put(updateUrl,obj,this.config)
        .then((res) => {
          let response =res.data;

          console.log(response);

          if (response.status=="success") {
            currentObj.sendingUpdateRequestMessage=response.message;
            currentObj.users =response.info;
            currentObj.sendingUpdateRequestMessageColor="green";

            // currentObj.sendingUpdateRequest=false;
          }
          if (response.status=="error") {
            currentObj.sendingUpdateRequestMessage=response.message;
            currentObj.sendingUpdateRequestMessageColor="red";
          }
        })
        .catch(err => console.log(err));


      },
        sendSms(e){

        e.preventDefault();
        this.hideErrors();
        this.sendingUpdateRequestMessageColor="black";
        let obj = {
          hiddenfullnames:this.hiddenfullnames,
          hiddenphonenumber:this.hiddenphonenumber,
          message:this.message
        };

        let currentObj = this;

        let updateUrl = this.baseApiUrl +'/sendSms';

        this.sendingUpdateRequest=true;

        axios.post(updateUrl,obj,this.config)
        .then((res) => {
          let response =res.data;

          console.log(response);

          if (response.status=="success") {
            currentObj.sendingUpdateRequestMessage=response.message;
            // currentObj.users =response.info;
            currentObj.sendingUpdateRequestMessageColor="green";

            // currentObj.sendingUpdateRequest=false;
          }
          if (response.status=="error") {
            currentObj.sendingUpdateRequestMessage=response.message;
            currentObj.sendingUpdateRequestMessageColor="red";
          }
        })
        .catch(err => console.log(err));


      },
       AssignGroup(e){

        e.preventDefault();
        this.hideErrors();
        this.sendingUpdateRequestMessageColor="black";
        let obj = {
          group_contact_id:this.group_contact_id
        };

        let currentObj = this;

        let updateUrl = this.baseApiUrl +`/users/${this.euser_key}`;

        this.sendingUpdateRequest=true;

        axios.put(updateUrl,obj,this.config)
        .then((res) => {
          let response =res.data;

          console.log(response);

          if (response.status=="success") {
            currentObj.sendingUpdateRequestMessage=response.message;
            currentObj.users =response.info;
            currentObj.sendingUpdateRequestMessageColor="green";

            // currentObj.sendingUpdateRequest=false;
          }
          if (response.status=="error") {
            currentObj.sendingUpdateRequestMessage=response.message;
            currentObj.sendingUpdateRequestMessageColor="red";
          }
        })
        .catch(err => console.log(err));


      }
    },
    created(){
      
        this.config = {
            headers:{
              "Content-Type":"application/json",
              "Accept":"application/json"
            }
        };
      
        this.fetchContacts();
        this.fetchGroupsData();
      
    }
  }
</script>

