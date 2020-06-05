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
                                <h4 class="page-title float-left">Dashboard</h4>

                                <ol class="breadcrumb float-right">
                                    <li class="breadcrumb-item"><a href="#">Hosp</a></li>
                                    <li class="breadcrumb-item active">Dashboard</li>
                                </ol>

                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="card-box tilebox-one">
                                <i class="fi-box float-right"></i>
                                <h6 class="text-muted text-uppercase mb-3">Contacts</h6>
                                <h4 class="mb-3" data-plugin="counterup">{{ contactsCount }}</h4>
                                <!-- <span class="badge badge-primary"> +11% </span>  -->
                                <span class="text-muted ml-2 vertical-middle">Number of contacts registered</span>
                            </div>
                        </div>

                        <div class="col-xs-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="card-box tilebox-one">
                                <i class="fi-layers float-right"></i>
                                <h6 class="text-muted text-uppercase mb-3">Groups</h6>
                                <h4 class="mb-3"><span data-plugin="counterup">{{ groupsCount }}</span></h4>
                                <!-- <span class="badge badge-primary"> -29% </span>  -->
                                <span class="text-muted ml-2 vertical-middle">Number of Groups</span>
                            </div>
                        </div>




<!--                         <div class="col-xs-12 col-md-6 col-lg-6 col-xl-3">
                            <div class="card-box tilebox-one">
                                <i class="fi-briefcase float-right"></i>
                                <h6 class="text-muted text-uppercase mb-3">Stock</h6>
                                <h4 class="mb-3" data-plugin="counterup">1,890</h4>
                                <span class="badge badge-primary"> +89% </span> 
                                <span class="text-muted ml-2 vertical-middle">Last year</span>
                            </div>
                        </div> -->
                    </div>
                  
                    </div> <!-- container -->

                </div>
                <!-- content -->

                <!-- footer -->
                <Footer/>
                <!-- footer -->

            </div>


            <!-- ============================================================== -->
            <!-- End Right content here -->
            <!-- ============================================================== -->


        </div>
        <!-- END wrapper -->
</template>


<script>
import TopNavbar from './TopNavbar.vue'
import Sidebar from './Sidebar.vue'
import Footer from './Footer.vue'
export default {
    name: 'Dashboard',
    components:{
        TopNavbar,
        Footer,
        Sidebar
    },
    props: {
        msg:String
    },
    data() {
        return {
            groupsCount:"0",
            contactsCount:"0"
        }
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css">


</style>
