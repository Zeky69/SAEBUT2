<template>
  <div class="admin-presta">
    <h1 id="tittle">Gestion des prestataires</h1>
    <div>
      <table>
        <thead>
        <tr>
          <th v-for="(value, key) in tablePresta[0]" :key="key">{{ key }}</th>
          <th>Operations</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in tablePresta" :key="index">
          <td v-for="(value, key) in item" :key="key">{{ value }}</td>
          <td>
            <button>Edit</button>
            <button>Delete</button>
            <!-- You can add more buttons or actions here -->
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import adminService from "@/services/admin.service";

export default {
  name: "AdminPrestataire",
  data: () => ({
    tablePresta: [],
  }),
  computed: {
    getAdmin() {
      return this.tablePresta;
    },
  },
  methods: {
    fetchUsers() {
      adminService.getAllUsers()
          .then((response) => {
            this.tablePresta = response;
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
          });
    },
  },
  created() {
    this.fetchUsers(); // Fetch users when the component is created
  },
};
</script>

<style>
#tittle {
  text-align: left;
  background: linear-gradient(179deg, #543C64 -58.62%, #868CD1 99.12%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.admin-presta {
  display: flex;
  flex-direction: column;
  padding: 3% 6%;
}

.admin-presta h1 {
  text-align: left;
  font-family: "DM Sans";
  font-size: 50px;
  font-style: normal;
}

thead{
  border-radius: 20px;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
  border-radius: 20px;
}

th, td {
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

table:first-of-type{
  margin: 15px 2px;
  background: #ffffff !important;
}
table:last-of-type{
  margin: 15px 2px;
  background: #fdfdef !important;
}

tr:nth-child(even){background-color: #f2f2f2;}

</style>
