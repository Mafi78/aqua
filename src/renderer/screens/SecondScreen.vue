<template>
  <v-container class="my-5">
    <!-- Upper Third - "Hello" Text -->
  <div class="d-flex justify-center">
    <v-card width="300px">
      <v-card-title class="text-h6 text-md-h5 text-lg-h4">Hello</v-card-title>
      <v-card-text>
        What would you like to do today?
      </v-card-text>
    </v-card>
  </div>
   
    <!-- Lower Third - Three Square Buttons -->
    <v-row justify="center" align="end">
      <v-col cols="12" md="4">
        <!-- Button 1 -->
        <v-btn color="graphite" dark class="white--text" tile>
          <v-text class="font-weight-bold">B1</v-text>
        </v-btn>
        <v-row justify="center">
          <v-col>
            <v-text class="caption text-center">Run a scenario</v-text>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="4">
        <!-- Button 2 -->
        <v-btn color="graphite" dark class="white--text" tile>
          <v-text class="font-weight-bold">B2</v-text>
        </v-btn>
        <v-row justify="center">
          <v-col>
            <v-text class="caption text-center">Prepare on-the-go</v-text>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="4">
        <!-- Button 3 -->
        <v-btn color="graphite" dark class="white--text" tile>
          <v-text class="font-weight-bold">B3</v-text>
        </v-btn>
        <v-row justify="center">
          <v-col>
            <v-text class="caption text-center">Work on a database</v-text>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>
