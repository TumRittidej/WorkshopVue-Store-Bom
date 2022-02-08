<template>
  <div id="member">
    <v-container>
      <h1 class="pa-2">พนักงาน</h1>
      <v-divider class="my-4"></v-divider>
      <div class="d-flex justify-end mb-6" flat tile>
        <div class="pa-2" outlined tile>
          <v-dialog v-model="createDialogMember" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="success" dark v-bind="attrs" v-on="on">
                <v-icon left>mdi-plus-box</v-icon>เพิ่มพนักงาน
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <h3 class="bold">เพิ่มข้อมูลพนักงาน</h3>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="รหัสพนักงาน"
                          v-model="member.id"
                          :rules="[rules.required, rules.id]"
                          :error-messages="errorMessage"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          label="ชื่อ"
                          v-model="member.firstName"
                          :rules="[rules.required, rules.firstname]"
                          :error-messages="errorMessage"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          label="นามสกุล"
                          v-model="member.lastName"
                          :rules="[rules.required, rules.lastname]"
                          :error-messages="errorMessage"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="เบอร์โทรศัพท์"
                          v-model="member.phone"
                          :rules="[rules.required, rules.phone]"
                          :error-messages="errorMessage"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="อีเมล"
                          v-model="member.email"
                          :rules="[rules.required, rules.email]"
                          :error-messages="errorMessage"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="ตำแหน่ง"
                          v-model="member.position"
                          :rules="[rules.required, rules.position]"
                          :error-messages="errorMessage"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
                <small>*กรุณาตรวจสอบข้อมูลให้เรียบร้อย</small>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-around">
                <v-btn
                  color="blue darken-1"
                  text
                  @click="createDialogMember = false"
                >
                  Close
                </v-btn>
                <v-btn color="blue darken-1" text @click.prevent="submitMember">
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
                <th class="text-left">รหัสพนักงาน</th>
                <th class="text-left">ชื่อ-นามสกุล</th>
                <th class="text-left">เบอร์โทรศัพท์</th>
                <th class="text-left">อีเมล</th>
                <th class="text-left">ตำแหน่ง</th>
                <th class="text-left">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(data, index) in $store.getters.getMember"
                :key="index"
              >
                <td class="text-left">{{ data.id }}</td>
                <td class="text-left">
                  {{ data.firstName }} {{ data.lastName }}
                </td>
                <td class="text-left">{{ data.phone }}</td>
                <td class="text-left">{{ data.email }}</td>
                <td class="text-left">{{ data.position }}</td>
                <td class="text-left">
                  <v-dialog
                    v-model="editDialogMember"
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
                        @click.prevent="setIndexMember(index)"
                      >
                        แก้ไขข้อมูล
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <h3 class="bold">แก้ไขข้อมูลพนักงาน</h3>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-form ref="form2" v-model="valid2" lazy-validation>
                            <v-row>
                              <v-col cols="12">
                                <v-text-field
                                  label="รหัสพนักงาน"
                                  :rules="[rules.required, rules.id]"
                                  :error-messages="errorMessage"
                                  v-model="member.id"
                                ></v-text-field>
                                <!-- {{$store.state.members[indexMember].id}} -->
                              </v-col>
                              <v-col cols="6">
                                <v-text-field
                                  label="ชื่อ"
                                  :rules="[rules.required, rules.firstname]"
                                  :error-messages="errorMessage"
                                  v-model="member.firstName"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6">
                                <v-text-field
                                  label="นามสกุล"
                                  :rules="[rules.required, rules.lastname]"
                                  :error-messages="errorMessage"
                                  v-model="member.lastName"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  label="เบอร์โทรศัพท์"
                                  :rules="[rules.required, rules.phone]"
                                  :error-messages="errorMessage"
                                  v-model="member.phone"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  label="อีเมล"
                                  :rules="[rules.required, rules.email]"
                                  :error-messages="errorMessage"
                                  v-model="member.email"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  label="ตำแหน่ง"
                                  :rules="[rules.required, rules.position]"
                                  :error-messages="errorMessage"
                                  v-model="member.position"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-form>
                        </v-container>
                        <small>*กรุณาตรวจสอบข้อมูลให้เรียบร้อย</small>
                      </v-card-text>
                      <v-card-actions class="d-flex justify-space-around">
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="editDialogMember = false"
                        >
                          Close
                        </v-btn>
                        <v-btn color="blue darken-1" text @click.prevent="editMember()">
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
  name: "Member",
  data() {
    return {
      member: {
        id: null,
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        position: "",
      },
      rules: {
        required: (val) => !!val || "โปรดกรอกข้อความ",
        id: (val) => /^[0-9]+$/.test(val) || "ใส่ได้เฉพาะ 0-9",
        firstname: (val) =>
          /^[A-Za-zก-ฮะ-์]+$/.test(val) || "ใส่ได้เฉพาะ A-Z ,a-z ,ก-ฮ",
        lastname: (val) =>
          /^[A-Za-zก-ฮะ-์]+$/.test(val) || "ใส่ได้เฉพาะ A-Z ,a-z ,ก-ฮ",
        phone: (val) => /^[0-9]+$/.test(val) || "ใส่ได้เฉพาะ 0-9",
        email: (val) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(val) || "กรุณากรอกข้อมูลให้ครบถ้วน";
        },
        position: (val) =>
          /^[A-Za-zก-ฮะ-์]+$/.test(val) || "ใส่ได้เฉพาะ A-Z ,a-z ,ก-ฮ",
      },

      createDialogMember: false,
      editDialogMember: false,
      valid: false,
      valid2: false,
      errorMessage: "",
      indexMember: 0,
    };
  },
  methods: {
    async submitMember() {
      try {
        await this.$store.dispatch("addMember", { ...this.member });
      } finally {
        this.createDialogMember = false;
        this.clearStateMember()
      }
    },
    setIndexMember(index) {
      this.indexMember = index
    },
    async editMember() {
      try {
      const member = {...this.member}
      await this.$store.dispatch("editMember", {member, index: this.indexMember});
      } finally {
        this.editDialogMember = false;
        this.clearStateMember()
      }
    },
    clearStateMember() {
      this.member = {
        id: null,
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        position: "",
      }
      return
    }
  },
};
</script>

<style scoped>
</style>