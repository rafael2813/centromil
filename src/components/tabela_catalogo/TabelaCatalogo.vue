<template>
  <v-container px-0 fluid>
    <v-data-table
      :page="page"
      :pageCount="numberOfPages"
      :headers="headers"
      :items="passengers"
      :options.sync="options"
      :server-items-length="totalPassengers"
      :loading="loading"
      class="elevation-1"
    >
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "DatatableComponent",
  data() {
    return {
      page: 0,
      totalPassengers: 0,
      numberOfPages: 0,
      passengers: [],
      loading: true,
      options: {},
      headers: [
        { text: "Passenger Name", value: "name" },
        { text: "Number Of Trips", value: "trips" },
        { text: "Airline", value: "airline[0].name" },
        { text: "Logo", value: "logo" },
        { text: "Website", value: "website" },
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
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;
      axios
        .get(
          "https://api.instantwebtools.net/v1/passenger?size=" +
            itemsPerPage +
            "&page=" +
            pageNumber
        )
        .then((response) => {
          //Then injecting the result to datatable parameters.
          this.loading = false;
          this.passengers = response.data.data;
          this.totalPassengers = response.data.totalPassengers;
          this.numberOfPages = response.data.totalPages;
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