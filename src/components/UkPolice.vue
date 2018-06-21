<template>
  <div class="container">
    <div class="form-group wow animated zoomIn">
      <data-tables v-loading="loading" element-loading-text="Loading..."
                   element-loading-spinner="el-icon-loading"
                   element-loading-background="rgba(0.2, 0.1, 0, 0.8)" :data="names" :action-col-def="actionColDef"
                   style="margin: 70px 50px 0 50px">
        <el-table-column prop="id"   label="Id" align="left">
        </el-table-column>
        <el-table-column prop="name" label="Name" align="left">
        </el-table-column>
      </data-tables>
    </div>
    <div class="wow animated fadeInUp">
      <el-button style="margin-top: 30px" type="primary" @click="loadMore" icon="el-icon-caret-bottom" round>Load
        More
      </el-button>
    </div>
    <div class="form-group">
      <el-dialog v-loading="loading1" element-loading-text="Loading..."
                 element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.1, 0, 0.8)"
                 title="Detail of Police" width="70%" :visible.sync="modal">
        <el-row :gutter="20">
          <el-col :span="3">
            <div class="grid-content bg-purple" align="right"><b>Name</b> :</div>
          </el-col>
          <el-col :span="21">
            <div class="grid-content bg-purple" align="left">{{detailsNama}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3">
            <div class="grid-content bg-purple" align="right"><b>Description</b> :</div>
          </el-col>
          <el-col :span="21">
            <div class="grid-content bg-purple" align="left">{{detailsDescription}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3">
            <div class="grid-content bg-purple" align="right"><b>Telephone</b> :</div>
          </el-col>
          <el-col :span="21">
            <div class="grid-content bg-purple" align="left">{{detailsTelephone}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3">
            <div class="grid-content bg-purple" align="right"><b>Follow us on</b> :</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple" align="left"><a v-bind:href="detailsEM0.url">{{detailsEM0.title}}</a>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple" align="left"><a v-bind:href="detailsEM1.url">{{detailsEM1.title}}</a>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple" align="left"><a v-bind:href="detailsEM2.url">{{detailsEM2.title}}</a>
            </div>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {API} from "../api/apiUkPolice";

  export default {
    data() {
      return {
        modal: false,
        loading: true,
        loading1: false,
        detailsNama: "",
        detailsId: "",
        detailsDescription: "",
        detailsUrl: "",
        detailsTelephone: "",
        idPolice: "",
        detailsEM0: [{
          url: "",
          title: ""
        }],
        detailsEM1: [{
          url: "",
          title: ""
        }],
        detailsEM2: [{
          url: "",
          title: ""
        }],
        names: [],
        actionColDef: {
          label: 'Detail',
          width: 180,
          tableColProps: {
            align: 'center'
          },
          def: [{
            handler: row => {
              this.idPolice = row.id;
              console.log("id", this.idPolice);
              return this.getRowDetailPolice();
            },
            buttonProps: {
              type: 'primary'
            },
            name: 'Detail'
          }]
        }
      }
    },
    created() {
      this.getDataPolice();
    },
    methods: {
      getDataPolice() {
        API.request()
          .then(response => {
            let limitVal = 4;
            let sName = response.data;
            let hasil = sName.slice(0, limitVal);
            localStorage.setItem("Limit Load More", limitVal);
            this.names = hasil;
            this.loading = false;
            console.log("ini hasil", hasil);
          })
          .catch(error => {
            console.log(error);
          });
      },
      loadMore() {
        this.loading = true;
        API.request()
          .then(response => {
            let limitAdd = 2;
            let limitRes = localStorage.getItem("Limit Load More");
            let lim = parseInt(limitRes);
            let limitResult = limitAdd + lim;
            let sName = response.data;
            let hasil = sName.slice(0, limitResult);
            localStorage.setItem("Limit Load More", limitResult);
            this.names = hasil;
            this.loading = false;
            console.log("ini hasil", hasil);
          })
          .catch(error => {
            console.log(error);
          });
      },
      getRowDetailPolice() {
        let idDetail = this.idPolice;
        if (idDetail !== '' || idDetail !== null) {
          this.modal = true;
          this.loading1 = true;
          this.detailsNama = "";
          this.detailsId = "";
          this.detailsDescription = "";
          this.detailsUrl = "";
          this.detailsTelephone = "";
          API.request(idDetail)
            .then(response => {
              this.loading1 = false;
              this.detailsNama = response.data.name;
              this.detailsId = response.data.id;
              let detDes = response.data.description;
              this.detailsUrl = response.data.url;
              this.detailsTelephone = response.data.telephone;
              this.detailsEM0 = response.data.engagement_methods[0];
              this.detailsEM1 = response.data.engagement_methods[1];
              this.detailsEM2 = response.data.engagement_methods[2];

              let finalDetDes1 = detDes.replace(/<p>/g,"");
              let finalDetDes = finalDetDes1.replace(/p>/g,"");
              let final = finalDetDes.replace(/</g,"");

              this.detailsDescription = final;
              console.log("ini details", response.data);
              console.log("ini details EM", this.detailsEM0);
            })
            .catch(error => {
              this.loading1 = false;
              console.log(error);
            });
        } else {
          console.log("id tidak tersedia");
          this.loading1 = false;
          return null;
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
    margin: 0;
    padding: 0;
  }

  h3 {
    margin-left: 30px;
    margin-right: 30px;
  }
</style>
