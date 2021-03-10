<template>
  <div id="app" class="container">
    <v-app>
      <v-card-title>
        <span class="headline">
          <span style="color: white" color="white"> Book details</span>
        </span>

        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="bookData"
        class="elevation-1"
        :items-per-page="10"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <!-- <v-btn
              style="margin-right: 16px"
              color="pink"
              class="mb-2"
              @click="generateData"
            >
              Generate Data
            </v-btn> -->
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn dark class="mb-2" color="pink" v-bind="attrs" v-on="on">
                  Add Book
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.title"
                          label="Title"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.author"
                          label="Author"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.read"
                          label="read"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="viewdialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">Book details</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.title"
                        label="Title"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.author"
                        label="Author"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.read"
                        label="read"
                      ></v-text-field>
                    </v-col>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDialog">
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>
<script>
export default {
  name: "About",
  data: () => ({
    employee: {},
    search: "",
    options: { groupBy: "jobTitle" },
    bookData: [],
    dialog: false,
    loading: false,
    dialogDelete: false,
    viewDialog: false,
    headers: [
      {
        text: "Title",
        align: "start",
        sortable: false,
        value: "title",
      },
      { text: "Author", value: "author", groupable: true },

      { text: "Read ?", value: "read" },

      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {},
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Book" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    viewdialog(val) {
      val || this.closeDialog();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.bookData = JSON.parse(localStorage.getItem("BookDetails") || "[]");
  },
  mounted() {
    console.log(this.bookData);
  },
  methods: {
    viewItem(item) {
      console.log(item);

      this.editedIndex = this.bookData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.viewdialog = true;
    },
    editItem(item) {
      console.log(item);
      this.editedIndex = this.bookData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.bookData.indexOf(item);
      console.log("delete", this.editedIndex);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.bookData.splice(this.editedIndex, 1);
      console.log("after delete", this.bookData);
      localStorage.setItem("BookDetails", JSON.stringify(this.bookData));
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDialog() {
      this.viewDialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.bookData[this.editedIndex], this.editedItem);
      } else {
        this.bookData.push(this.editedItem);
      }
      localStorage.setItem("BookDetails", JSON.stringify(this.bookData));
      this.close();
    },
  },
};
</script>