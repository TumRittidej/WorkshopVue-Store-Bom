<template>
  <div id="order">
    <v-container>
      <h1 class="pa-2">ออเดอร์</h1>
      <v-divider class="my-4"></v-divider>
      <div class="d-flex justify-end mb-6" flat tile>
        <div class="pa-2" outlined tile>
          <v-dialog v-model="createDialogOrder" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="success" dark v-bind="attrs" v-on="on">
                <v-icon left>mdi-plus-box</v-icon>เพิ่มออเดอร์
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <h3 class="bold">เพิ่มออเดอร์</h3>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="4">
                      <v-text-field
                        label="รหัสออเดอร์"
                        v-model="order.id"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="8">
                      <v-select
                        :items="selectMembers"
                        label="ชื่อพนักงาน"
                        v-model="order.memberId"
                      ></v-select>
                      {{order.memberId}} <br>
                    </v-col>
                    <v-col cols="8">
                      <v-select
                        :items="selectProducts"
                        label="สินค้า"
                        v-model="order.products[0].productId"
                      ></v-select>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="จำนวน"
                        v-model="order.products[0].quantity"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-btn color="success" dark>
                        <v-icon left>mdi-plus-box</v-icon>เพิ่มสินค้า
                      </v-btn>
                    </v-col>
                    <v-col cols="12">
                      <span class="black--text">ยอดรวม : บาท</span>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*กรุณาตรวจสอบข้อมูลให้เรียบร้อย</small>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-around">
                <v-btn
                  color="blue darken-1"
                  text
                  @click="createDialogOrder = false"
                >
                  Close
                </v-btn>
                <v-btn color="blue darken-1" text @click.prevent="submitOrder">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
      <v-card>
        <v-simple-table >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">รหัสออเดอร์</th>
                <th class="text-center">ชื่อพนักงาน</th>
                <th class="text-center">ยอดรวม</th>
                <th class="text-center">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data ,index) in orders" :key="index">
                <td class="text-center">{{data.id}}</td>
                <td class="text-center">{{selectMembers}}</td>
                <td class="text-center">{{data.total}}</td>
                <td class="text-center" width="30%">
                  <v-dialog v-model="listDialogOrder" width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        small
                        v-bind="attrs"
                        v-on="on"
                        class="mr-2 primary"
                      >
                        <v-icon left>mdi-sprout</v-icon> ดูรายการสินค้า
                      </v-btn>
                    </template>

                    <v-card>
                      <v-card-title> รายการสินค้า </v-card-title>

                      <v-divider></v-divider>

                      <v-card-text class="pa-5"> ฟหกฟหกกห </v-card-text>

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          text
                          @click="listDialogOrder = false"
                        >
                          <v-icon small>mdi-window-close</v-icon>ปิด
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                  <v-dialog
                    v-model="editDialogOrder"
                    persistent
                    max-width="600px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="warning"
                        small
                        dark
                        v-bind="attrs"
                        v-on="on"
                        @click="setIndexOrder(index)"
                      >
                        <v-icon left>mdi-plus-box</v-icon>แก้ไขสินค้า
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <h3 class="bold">แก้ไขสินค้า</h3>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="4">
                              <v-text-field label="รหัสออเดอร์"></v-text-field>
                            </v-col>
                            <v-col cols="8">
                              <v-select
                                :items="selectMembers"
                                label="ชื่อพนักงาน"
                              ></v-select>
                            </v-col>
                            <v-col cols="8">
                              <v-select
                                :items="selectProducts"
                                label="สินค้า"
                              ></v-select>
                            </v-col>
                            <v-col cols="4">
                              <v-text-field label="จำนวน"></v-text-field>
                            </v-col>
                            <v-col>
                              <v-btn color="success" dark>
                                <v-icon left>mdi-plus-box</v-icon>เพิ่มสินค้า
                              </v-btn>
                            </v-col>
                            <v-col cols="12">
                              <span class="black--text">ยอดรวม : บาท</span>
                            </v-col>
                          </v-row>
                        </v-container>
                        <small>*กรุณาตรวจสอบข้อมูลให้เรียบร้อย</small>
                      </v-card-text>
                      <v-card-actions class="d-flex justify-space-around">
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="editDialogOrder = false"
                        >
                          Close
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="editDialogOrder = false"
                        >
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import moment from "moment"
export default {
  name: "order",

  data() {
    return {
      orders: [],
      order: {
        id: null,
        memberId: [],
        products: [
          {
            productId: null,
            quantity: null,
          },
        ],
        total: null,
        createdOrder: "",
        active: true,
      },
      createDialogOrder: false,
      editDialogOrder: false,
      listDialogOrder: false,

      selectMembers: [],
      members: [],
      firstName: "",
      lastName: "",
      fullName: "",

      selectProducts: [],
      products: [],
      productName: "",
      indexOrder: 0
    };
  },
  created() {
    this.dataInfoOrder()
  },
  methods: {
    dataInfoOrder() {
      this.members = this.$store.getters.getMember;
      for (let index = 0; index < this.members.length; index++) {
        this.firstName = this.members[index].firstName
        this.lastName = this.members[index].lastName
        this.fullName = `${this.firstName} ${this.lastName}`
        // console.log(this.fullName);
        this.selectMembers.push(this.fullName)
      }

      this.products = this.$store.getters.getProduct;
      for (let index = 0; index < this.products.length; index++) {
        this.productName = this.products[index].name
        this.selectProducts.push(this.productName)

        this.order.products.productId = this.products[index].id
        console.log(this.order.products.productId);
      }

      this.order.createdOrder = moment().format('YYYY-MM-DD, h:mm');
    },
    submitOrder() {
      this.$store.dispatch("addOrder", {...this.order})

      this.orders = this.$store.getters.getOrder
      // console.log(this.orders);
      this.createDialogOrder = false;
    },
    setIndexOrder(index){
      this.indexOrder = index
      // console.log(index);
    }
  },
};
</script>

<style>
</style>