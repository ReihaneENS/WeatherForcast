<template>
  <div class="home-wrapper w-full h-screen">
    <div class="inner w-full h-full flex flex-col justify-center items-center pb-8">
      <div class="search mb-20 w-full flex flex-col justify-center items-center">
        <h1 class="text-white text-4xl text-center mb-24">Search your city's name</h1>
        <form class="w-full flex justify-center" @submit.prevent>
          <input class="rounded-l-3xl w-2/5 py-3 px-5 focus:outline-none" type="text" placeholder="City name ..."
                 v-model="cityName">
          <button type="submit" @click="fetchWeather()" class="px-4 rounded-r-3xl duration-300 hover:pl-8">
            <img class="h-8" src="../assets/image/icons/search.png" alt="search">
          </button>
        </form>
      </div>
      <div class="loading" v-if="loading === true">
        <img class="w-28" src="../assets/image/icons/loading.png" alt="loading">
      </div>
      <div class="card text-xl card-err border border-4 rounded p-6 w-2/4" v-if="err404===true">
        <p class="">City is not found.</p>
        <p class="">Please check the city name you entered.</p>
      </div>
      <div class="card border border-4 rounded p-6 w-2/4 relative" v-if="Object.keys(cityDetail).length">
        <div class="like absolute top-2 right-2">
          <img class="w-10 cursor-pointer" @click="isLiked=false;disliked()" v-if="isLiked===true"
               src="../assets/image/icons/isliked.png" alt="">
          <img class="w-10 cursor-pointer" @click="isLiked=true;liked()" v-else src="../assets/image/icons/like.png"
               alt="">
        </div>
        <ul class="leading-9 text-lg">
          <li><span class="font-bold">City Name :</span> {{ cityDetail.name }}</li>
          <li class="flex items-center justify-start">
            <p class="mr-8"><span class="font-bold">Country Name :</span> {{ cityDetail.sys.country }}</p>
            <img :src="(`${imgURL}${cityDetail.sys.country}/flat/32.png`)" alt="flag">
          </li>
          <li><span class="font-bold">Temperature :</span> {{ cityDetail.main.temp }}</li>
          <li><span class="font-bold">Humidity :</span> {{ cityDetail.main.humidity }}</li>
          <li><span class="font-bold">Max Temperature :</span> {{ cityDetail.main.temp_max }}</li>
          <li><span class="font-bold">Min Temperature :</span> {{ cityDetail.main.temp_min }}</li>
          <li v-for="item in cityDetail.weather" :key="item.id">
            <p><span class="font-bold">Weather Condition :</span> {{ item.main }}</p>
            <p><span class="font-bold">Weather Description :</span> {{ item.description }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeMain",
  data() {
    return {
      cityName: '',
      AppId: '6c4c953cca9184356600f1252cf4d101',
      cityDetail: {},
      err404: false,
      loading: false,
      isLiked: false,
      imgURL:'https://flagsapi.com/',
      cities:[],
      likedCity:'',
      citiesObj:{}
    }
  },
  methods: {
    fetchWeather() {
      this.loading = true;
      this.err404 = false;
      this.isLiked= false;
      axios.get('https://api.openweathermap.org/data/2.5/weather?',
          {params: {q: this.cityName, APPID: this.AppId}})
          .then(
              (res) => {
                this.loading = false;
                this.cityDetail = (res.data)
              }
          )
          .catch((err) => {
            console.log(err)
            if (err.response.status === 404) {
              this.err404 = true;
              this.loading = false;
            }
          })
    },
    liked(){
        this.likedCity = this.cityDetail.name
        this.cities.push(this.likedCity);
        localStorage.setItem("likedCity", JSON.stringify(this.cities));
        this.likedCity = "";
    },
    disliked(){
      this.cities.splice(-1)
      console.log(this.cities)
      localStorage.setItem("likedCity", JSON.stringify(this.cities));
    }
  }
}
</script>