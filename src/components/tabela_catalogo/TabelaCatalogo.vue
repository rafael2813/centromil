<template>
  <v-card px-0 fluid>
    <v-data-table
      :page="page"
      :headers="headers"
      :items="items"
      :options.sync="options"
      :loading="loading"
      class="elevation-1"
    >
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "DatatableComponent",
  data() {
    return {
      page: 1,
      //totalAirlines: 592,
      numberOfPages: 1,
      items: [],
      loading: true,
      options: {},
      headers: [
        { text: "Name", value: "name" },
        { text: "ID", value: "id" },
      ],
    }
  },
  //this one will populate new data set when user changes current page. 
  watch: {
    options: {
      handler() {
        this.readDataFromAPI();
      },
    },
    deep: true,
  },
  methods: {
    //Reading data from API method. 
    readDataFromAPI() {
      this.loading = true
      //const { page, itemsPerPage } = this.options
      //let pageNumber = page
      axios
        .get(
          "https://jsonplaceholder.typicode.com/comments"
        )
        .then((response) => {
          //Then injecting the result to datatable parameters.
          this.loading = false;
          this.items = response.data
          //this.totalAirlines = response.data.totalAirlines
          //this.numberOfPages = response.data.totalPages
        })
    },
  },
  //this will trigger in the onReady State
  mounted() {
    this.readDataFromAPI();
  },
}
</script>

<style>

</style>