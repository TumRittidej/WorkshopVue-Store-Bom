<template>
  <div id="product">
    <v-container>
      <h1 class="pa-2">สินค้า</h1>
      <v-divider class="my-4"></v-divider>
      <div class="d-flex justify-end mb-6" flat tile>
        <div class="pa-2" outlined tile>
          <v-dialog v-model="createDialogProduct" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="success" dark v-bind="attrs" v-on="on">
                <v-icon left>mdi-plus-box</v-icon>เพิ่มสินค้า
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <h3 class="bold">เพิ่มสินค้า</h3>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        label="รหัสสินค้า"
                        v-model="product.id"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        label="ชื่อสินค้า"
                        v-model="product.name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="5">
                      <v-text-field
                        label="แบรนด์"
                        v-model="product.brand"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="ราคา"
                        v-model="product.price"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        label="สต็อก"
                        v-model="product.stock"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="วันที่ผลิต"
                        v-model="product.createdDate"
                      ></v-text-field>
                    </v-col>
                    <v-col class="pt-0" cols="1">
                      <v-switch
                        v-model="product.active"
                        inset
                        color="success"
                      ></v-switch>
                    </v-col>
                    <v-col cols="3" class="pa-5" v-if="product.active === true"
                      ><span class="align-center text-center"
                        >พร้อมส่ง</span
                      ></v-col
                    >
                    <v-col cols="3" class="pa-5" v-if="product.active === false"
                      ><span class="align-center text-center"
                        >ไม่พร้อมส่ง</span
                      ></v-col
                    >
                  </v-row>
                </v-container>
                <small>*กรุณาตรวจสอบข้อมูลให้เรียบร้อย</small>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-around">
                <v-btn
                  color="blue darken-1"
                  text
                  @click="createDialogProduct = false"
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click.prevent="submitProduct"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
      <v-card>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">รหัสสินค้า</th>
                <th class="text-left">ชื่อสินค้า</th>
                <th class="text-left">แบรนด์</th>
                <th class="text-left">สต็อก</th>
                <th class="text-left">วันที่ผลิต</th>
                <th class="text-left">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(data, index) in $store.getters.getProduct"
                :key="index"
              >
                <td class="text-left">{{ data.id }}</td>
                <td class="text-left">{{ data.name }}</td>
                <td class="text-left">{{ data.brand }}</td>
                <td class="text-left">{{ data.stock }}</td>
                <td class="text-left">{{ data.createdDate }}</td>
                <td class="text-left">
                  <v-dialog
                    v-model="editDialogProduct"
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
                        @click="setIndexProduct(index)"
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
                            <v-col cols="6">
                              <v-text-field
                                label="รหัสสินค้า"
                                v-model="product.id"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                              <v-text-field
                                label="ชื่อสินค้า"
                                v-model="product.name"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="5">
                              <v-text-field
                                label="แบรนด์"
                                v-model="product.brand"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                              <v-text-field
                                label="ราคา"
                                v-model="product.price"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="3">
                              <v-text-field
                                label="สต็อก"
                                v-model="product.stock"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                label="วันที่ผลิต"
                                v-model="product.createdDate"
                              ></v-text-field>
                            </v-col>
                            <v-col class="pt-0" cols="1">
                              <v-switch
                                v-model="product.active"
                                inset
                                color="success"
                              ></v-switch>
                            </v-col>
                            <v-col
                              cols="3"
                              class="pa-5"
                              v-if="product.active === true"
                              ><span class="align-center text-center"
                                >พร้อมส่ง</span
                              ></v-col
                            >
                            <v-col
                              cols="3"
                              class="pa-5"
                              v-if="product.active === false"
                              ><span class="align-center text-center"
                                >ไม่พร้อมส่ง</span
                              ></v-col
                            >
                          </v-row>
                        </v-container>
                        <small>*กรุณาตรวจสอบข้อมูลให้เรียบร้อย</small>
                      </v-card-text>
                      <v-card-actions class="d-flex justify-space-around">
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="editDialogProduct = false"
                        >
                          Close
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="editProduct">
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
export default {
  name: "Product",
  data() {
    return {
      product: {
        id: null,
        name: "",
        brand: "",
        price: null,
        stock: null,
        createdDate: "",
        active: true,
      },
      createDialogProduct: false,
      editDialogProduct: false,
      indexProduct: 0,
    };
  },
  methods: {
    async submitProduct() {
      try {
        await this.$store.dispatch("addProduct", { ...this.product });
      } finally {
        this.createDialogProduct = false;
        this.clearStateProduct();
      }
    },
    async editProduct() {
      try {
        const product = { ...this.product };
        const index = this.indexProduct;
        await this.$store.dispatch("editProduct", { product, index });
      } finally {
        this.editDialogProduct = false;
        this.clearStateProduct();
      }
    },
    setIndexProduct(index) {
      this.indexProduct = index;
    },
    clearStateProduct() {
      this.product = {
        id: null,
        name: "",
        brand: "",
        price: null,
        stock: null,
        createdDate: "",
        active: true,
      };
    },
  },
};
</script>

<style>
</style>