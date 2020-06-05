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
                                  <h4 class="page-title float-left">Groups List</h4>

                                  <ol class="breadcrumb float-right">
                                      <li class="breadcrumb-item"><a href="#">BULK SMS</a></li>
                                      <li class="breadcrumb-item active">Groups</li>
                                  </ol>

                                  <div class="clearfix"></div>
                              </div>
                          </div>
                      </div>

                      <!-- Group -->
                      <div class="row" v-if="!displayEditForm">
                            <div v-if="deletionOutput" class="col-12 alert alert-success text-center" style="color:green;">{{ deletionOutputMessage }}</div>
                          <div class="col-12">
                              <div class="card-box table-responsive">
                                <button type="button" class="btn btn-primary btn-sm waves-effect waves-light" data-toggle="modal"
                                data-target="#new-contact">
                                  New Group</button>
                                <table id="datatable" class="table table-bordered text-center dataTable no-footer">
                                  <thead>
                                    <th>#</th>
                                    <!-- <th>Full names</th> -->
                                    <th>Group Name</th>
                                    <th style="text-align:center;">Action</th>
                                  </thead>
                                    <tbody>
                                      <tr v-for="(group , index) in groups" :key="group.id">
                                        <td>{{i =index+=1}}</td>
                                        <td>
                                          {{ group.name!==null ? group.name : "" }}
                                        </td>
                                        
                                        <td style="text-align:center;">
                                          <i class="fa fa-edit" style="margin:3px;cursor:pointer; color:blue;" @click="GetGroupInformation(group.id)"></i>&nbsp;&nbsp;
                                          <i class="fa fa-trash" style="margin:3px;cursor:pointer; color:red;"  @click="deleteGroup(group.id)"></i>
                                        </td>
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

                      <!-- update User -->
                      <div class="row" v-if="displayEditForm">
                          <div class="col-12">
                              <div class="card-box table-responsive">
                                <div class="row">
                                  <div class="col-6">
                                    <span class="text-info">Group  edit</span>
                                  </div>
                                  <div class="col-6 text-right">
                                    <span  @click="displayEditForm = !displayEditForm ; sendingUpdateRequest = false; " class="btn btn-info btn-sm" style="cursor:pointer;">View Groups</span>
                                  </div>
                                </div>

                                  <form class="form-horizontal" action="#"  @submit="UpdateGroupInfo">

                                      <div class="form-group m-b-25 row">
                                          <div class="col-12">
                                              <label for="groupName">Group Name</label>
                                              <input type="text" placeholder="groupName" name="groupName" v-model="egroupName" class="form-control" required>
                                          </div>
                                      
                                      
                                         
                                          
                                      </div>

                                      <div class="form-group account-btn text-center m-t-10 row">
                                        <div class="col-12">
                                          <button class="btn w-lg pull-right btn-sm btn-info waves-effect waves-light" type="submit">Update Group info</button>
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
            <!--   content -->
            <div id="new-contact" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="custom-width-modalLabel" aria-hidden="true" style="display: none;">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">

                        <div class="modal-body">
                            <h4 class="text-uppercase text-success text-center">
                                New Group
                            </h4>
                            <form class="form-horizontal" action="#"  @submit="NewGroup">

                                <div class="form-group m-b-25 row">
                                    <div class="col-12">
                                        <label for="groupName">Group Name</label>
                                        <input type="text" placeholder="Group Name" name="groupName" v-model="groupName" class="form-control" required>
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


            <!--   content -->
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
    name: 'Groups',
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
        groupName:'',
        egroupName:'',
        euser_key:'',
        sendingUpdateRequestMessage:'Updating...please wait!',
        sendingUpdateRequestMessageColor:'black',
        sendingUpdateRequest:false,
        displayEditForm:false,
        groups:[],
        dataNotAvailable:true,
        errorMessageU:'Action failed, Try again Later.',
        errorU:false,
        successU:false,
        successMessageU:'New Group added successfully.',
        baseApiUrl :process.env.VUE_APP_END_POINT,
        sendData:false,
        sendD:false,
        config:null,
        deletionOutputMessage:"",
        deletionOutput:false
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
        this.groupName='';
       
      },
      NewGroup(e){
        e.preventDefault();
        this.hideErrors();
            let obj = {
              groupName:this.groupName
            };
            let currentObj = this;
            this.sendData=true;
            axios.post(this.baseApiUrl+'/groups',obj, this.config).then(res => {
              currentObj.displayOutput(res.data.status,res.data.message,res.data.info);
            }).then(err=> {
              if(typeof err!=='undefined') {
                currentObj.displayOutput('error','Technical error ocurred, Contact administrator.');
              }
            });
        

      },
      deleteGroup(key){
        if (key!==""&&key!==null) {
          if (confirm("Are you sure you want to delete this contact?")) {
            let currentObj = this;

            let deleteUrl = this.baseApiUrl +`/groups/${key}`;
            this.sendData=true;
            this.deletionOutput=true;
            this.deletionOutputMessage ="Processing...kindly wait";
              axios.delete(deleteUrl,this.config).then(res => {
                currentObj.deletionOutputMessage =res.data.message;
                currentObj.groups =res.data.info;
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
      displayOutput(alertType,message,groupInformation){
        this.sendData=false;
        if(alertType=="error"){
            this.successU=false;
            this.errorU=true;
            this.errorMessageU=message;
        }
        if(alertType=="success"){
            this.clearFormData();
            this.hideErrors();
            if(groupInformation!== null ) this.groups=groupInformation;
            this.successU=true;
            this.errorU=false;
            this.dataNotAvailable=false;
            this.successMessageU=message;
        }
      },
      fetchGroups(){

        axios.get(this.baseApiUrl +"/groups",this.config)
          .then((res) => {
            if(res.data !== null && res.data.length > 0){
              this.dataNotAvailable=false;
              this.groups =res.data;
            }
          })
          .catch(err => console.log(err));
      },
      GetGroupInformation(key){
        if (key!==""&&key!==null) {
          this.euser_key="";
          let obj = {
            key:key
          };

          let currentObj = this;

          axios.post(this.baseApiUrl +"/groupInfo",obj,this.config)
          .then((res) => {
            let response =res.data;
            if (response.status=="success") {
              let userObj = response.info;
              currentObj.egroupName = userObj.groupName;
              currentObj.euser_key = userObj.id;
              currentObj.displayEditForm=true;
            }
            console.log(response);


          })
          .catch(err => console.log(err));
        }
      },
      UpdateGroupInfo(e){

        e.preventDefault();
        this.hideErrors();
        this.sendingUpdateRequestMessageColor="black";
        let obj = {
          groupName:this.egroupName
        };

        let currentObj = this;

        let updateUrl = this.baseApiUrl +`/groups/${this.euser_key}`;

        this.sendingUpdateRequest=true;

        axios.put(updateUrl,obj,this.config)
        .then((res) => {
          let response =res.data;

          console.log(response);

          if (response.status=="success") {
            currentObj.sendingUpdateRequestMessage=response.message;
            currentObj.groups =response.info;
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
      
        this.fetchGroups();
      
      
    }
  }
</script>

