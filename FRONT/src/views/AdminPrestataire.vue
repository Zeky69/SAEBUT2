<template>
  <div class="admin-presta">
    <h1 id="tittle">Gestion des prestataires</h1>
    <div>
      <label for="filter">Filtrer par état:</label>
      <select id="filter" v-model="selectedState" @change="filterUsers">
        <option value="all">Tous</option>
        <option value="accepte">Accepté</option>
        <option value="refuse">Refusé</option>
        <option value="attente">En attente</option>
      </select>

      <table v-if="filteredUsers.length!==0">
        <thead>
        <tr>
          <th v-for="(value, key) in tablePresta[0]" :key="key">{{ key }}</th>
          <th>Operations</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in filteredUsers" :key="index">
          <td v-for="(value, key) in item" :key="key">{{ value }}</td>
          <td>
            <template v-if="item.etat_id === 2">
              <!-- État: Accepté -->
              <button>Edit</button>
            </template>

            <template v-else-if="item.etat_id === 3">
              <!-- État: Refusé -->
              <button @click="reAcceptUser(item)">Ré-Accepter</button>
            </template>

            <template v-else-if="item.etat_id === 1">
              <!-- État: En attente -->
              <button @click="manageUser(item.id_user, item.id_prestataire, 2)">Accepter</button>
              <button @click="manageUser(item.id_user, item.id_prestataire, 3)">Refuser</button>
            </template>

          </td>
        </tr>
        </tbody>
      </table>

      <div style="text-align: center;margin-top:5%;font-size: 20px;" v-if="filteredUsers.length === 0">Aucun prestataire</div>
    </div>
  </div>
</template>

<script>
import adminService from "@/services/admin.service";

export default {
  name: "AdminPrestataire",
  data: () => ({
    tablePresta: [],
    selectedState: "all",
    filteredUsers:[]
  }),
  computed: {
    filteredUserss() {
      if (this.selectedState === "all") {
        return this.tablePresta;
      } else {
        const filteredStateId = this.getStateIdByName(this.selectedState);
        return this.tablePresta.filter(
            (user) => user.etat_id === filteredStateId
        );
      }
    },
  },
  methods: {
    fetchUsers() {
      adminService
          .getAllUsers()
          .then((response) => {
            this.tablePresta = response;
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
          });
    },
    filterUsers() {

      console.log("Filtering users by state:", this.selectedState);
    },
    getStateIdByName(stateName) {
      const stateMapping = {
        accepte: 2,
        refuse: 3,
        attente: 1,
      };
      return stateMapping[stateName] || null;
    },
    async manageUser(user_id, prestataire_id, etat_id) {
      const data = {
        etat_id: etat_id,
        user_id: user_id,
      };


      try {
        await adminService.managePresta(data, prestataire_id);
        this.fetchUsers();
      } catch (error) {
        console.error("Error managing user:", error);
      }
    },
    reAcceptUser(user) {
      console.log("Re-accepting user:", user);
    },
  },
  created() {
    this.fetchUsers();
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

thead {
  font-size: 20px;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
  border-radius: 20px;
}

th,
td {
  padding: 8px;
  text-align: left;
}

td {
  border-bottom: #a5a4a4 1px solid;
}

table:first-of-type {
  margin: 15px 2px;
}
table:last-of-type {
  margin: 15px 2px;
}
</style>
