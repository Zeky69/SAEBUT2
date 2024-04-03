<template>
  <div class="admin-presta">
    <PageTitre title="Gestion des Prestataires" />
    <div>
      <label for="filter">Filtrer par état:</label>
      <select id="filter" v-model="selectedState" @change="filterUsers">
        <option value="all">Tous</option>
        <option value="accepte">Accepté</option>
        <option value="refuse">Refusé</option>
        <option value="attente">En attente</option>
      </select>

      <table v-if="filteredUsers.length !== 0">
        <thead>
          <tr>
            <th v-for="(value, key) in rubriques" :key="key">{{ value }}</th>
            <th>Opérations</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredUsers" :key="index">
            <!--          <td v-for="(value, key) in item" :key="key">{{ value }}</td>-->
            <td>{{ item.first_name }}</td>
            <td>{{ item.last_name }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.email }}</td>
            <td class="state" :class="statusClass(item.etat_libelle)">{{ item.etat_libelle }}</td>


            <td>
              <template v-if="item.etat_id === 2">
                <!-- État: Accepté -->
                <button class="edit-btn">Edit</button>
              </template>

              <template v-else-if="item.etat_id === 3">
                <!-- État: Refusé -->
                <button class="accept-btn" @click="manageUser(item.id_user, item.id_prestataire, 2)">Re-Accepter</button>
              </template>

              <template v-else-if="item.etat_id === 1">
                <!-- État: En attente -->
                <button class="accept-btn" @click="manageUser(item.id_user, item.id_prestataire, 2)">Accepter</button><br>
                <button class="reject-btn" @click="manageUser(item.id_user, item.id_prestataire, 3)">Refuser</button>
              </template>

            </td>
          </tr>
        </tbody>
      </table>

      <div style="text-align: center;margin-top:5%;font-size: 20px;" v-if="filteredUsers.length === 0">Aucun prestataire
      </div>
    </div>
  </div>
</template>

<script>
import adminService from "@/services/admin.service";
import PageTitre from "@/components/Admin/PageTitre.vue";

export default {
  name: "AdminPrestataire",
  components: {
    PageTitre,
  },
  data: () => ({
    tablePresta: [],
    selectedState: "all",
    rubriques: ['Prénom', 'Nom', 'Description', 'Email', 'État'],
    statusColors: {
      accepté: 'green',
      refusé: 'red',
      "en attente": 'yellow'
    }
  }),
  computed: {
    filteredUsers() {
      if (this.selectedState === "all") {
        return this.tablePresta;
      } else {
        const filteredStateId = this.getStateIdByName(this.selectedState);
        return this.tablePresta.filter(
          (user) => user.etat_id === filteredStateId
        );
      }
    },
    statusClass() {
      return (status) => this.statusColors[status] || '';
    }
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
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans&display=swap');

$purple: #745f8f;
$dark-gray: black;

.admin-presta {
  font-family: "DM Sans Regular";
  display: flex;
  flex-direction: column;
  padding: 0 6%;
  height: 100vh;
  color: $dark-gray;

  & h1 {
    text-align: left;
    font-family: "DM Sans";
    font-size: 50px;
    font-weight: bold;
    line-height: 60px;
  }

  label {
    font-size: 20px;
    font-weight: bold;
    margin-right: 1em;
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    background: rgba(255, 255, 255, 0.21);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7px);
    -webkit-backdrop-filter: blur(7px);
    border: 1px solid rgba(255, 255, 255, 0.31);
    cursor: pointer;
    padding: 0.5rem;
    font-size: inherit;
    border-radius: 4px;
    text-align: center;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: rgba(255, 255, 255, 0.31);
    }
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 20px;
    background: rgba(255, 255, 255, 0.479);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8.5px);
    -webkit-backdrop-filter: blur(8.5px);
    border: 1px solid rgba(130, 23, 119, 0.43);
    overflow: hidden;

    tr {
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: rgba($color: #000000, $alpha: 0.05);

        td button {
          opacity: 1;
        }
      }
    }

    th,
    td {
      padding: 1rem;
      text-align: left;
    }

    th {
      position: sticky;
      top: 0;
      padding: 1.5rem;
      box-shadow: 0 2px 2px rgba(#000000, 0.1);
      z-index: 1;
      font-weight: normal;
      color: $purple;
      font-weight: bold;

    }



    table:first-of-type {
      margin: 15px 2px;
    }

    table:last-of-type {
      margin: 15px 2px;
    }
  }

  .green {
    color: green;
  }

  .red {
    color: red;
  }

  .yellow {
    color: rgb(147, 107, 56);
  }

  .accept-btn {
    background-color: $purple;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    opacity: 0.6;
    margin-top: auto;
    margin-bottom: auto;
    background: rgba(255, 255, 255, 0.23);
    border-radius: 10px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8.5px);
    -webkit-backdrop-filter: blur(8.5px);
    border: 1px solid rgba(116, 116, 116, 0.43);

    border-color: rgb(65, 147, 65);
    color: rgb(65, 147, 65);

    padding: 0.5rem 4rem;
    font-size: 16px;

    &:hover {
      background-color: rgb(67, 152, 70);
      color: white;
    }
  }

  .reject-btn {
    background-color: $purple;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    opacity: 0.6;
    margin-top: 5%;
    margin-bottom: auto;
    background: rgba(255, 255, 255, 0.23);
    border-radius: 10px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8.5px);
    -webkit-backdrop-filter: blur(8.5px);
    border: 1px solid rgba(116, 116, 116, 0.43);

    border-color: rgb(142, 58, 58);
    color: rgb(142, 58, 58);

    padding: 0.5rem 4rem;
    font-size: 16px;

    &:hover {
      background-color: rgb(173, 84, 84);
      color: white;
      transition: color 0.2s ease-in-out;
    }
  }

  .edit-btn {
    background-color: $purple;
    padding: 0.5rem 5rem;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    opacity: 0.6;
    margin-top: auto;
    margin-bottom: auto;
    background: rgba(255, 255, 255, 0.23);
    border-radius: 10px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8.5px);
    -webkit-backdrop-filter: blur(8.5px);
    border: 1px solid rgba(116, 116, 116, 0.43);

    &:hover {
      background-color: white;
    }
  }

  div {
    text-align: center;
    margin-top: 3%;
    font-size: 20px;
    color: $dark-gray;
  }
}
</style>