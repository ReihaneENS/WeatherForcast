<template>
  <div class="fav-cities-wrapper w-full py-8">
    <div class="title">
      <h1 class="text-white text-4xl text-center mb-12">Favorite Cities</h1>
    </div>
    <div class="inner w-full flex flex-wrap justify-center items-center">
      <div class="card mx-2 my-2 border border-4 rounded p-6 w-2/4 relative" v-for="(item,index) in likedCities"
           :key="index">
        <div class="like absolute top-2 right-2">
          <img class="w-10 cursor-pointer" @click="remove(index);" src="../assets/image/icons/remove2.png"
               alt="">
        </div>
        <ul class="leading-9">
          <li><span class="font-bold">City Name :</span> {{ item.name }}</li>
          <li class="flex items-center justify-start">
            <p class="mr-8"><span class="font-bold">Country Name :</span> {{ item.sys.country }}</p>
            <img :src="(`${imgURL}${item.sys.country}/flat/32.png`)" alt="flag">
          </li>
          <li><span class="font-bold">Temperature :</span> {{ item.main.temp }}</li>
          <li><span class="font-bold">Humidity :</span> {{ item.main.humidity }}</li>
          <li><span class="font-bold">Max Temperature :</span> {{ item.main.temp_max }}</li>
          <li><span class="font-bold">Min Temperature :</span> {{ item.main.temp_min }}</li>
          <li v-for="item in item.weather" :key="item.id">
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
  name: "FavCitiesMain",
  data() {
    return {
      AppId: '6c4c953cca9184356600f1252cf4d101',
      isLiked: false,
      imgURL: 'https://flagsapi.com/',
      cities: [],
      cityName: '',
      likedCities: [],
      removedItemId: null
    }
  },
  created() {
    this.getCities();
    this.fetchCitiesInfo();
  },
  methods: {
    getCities() {
      this.cities = JSON.parse(localStorage.getItem("likedCity"));
    },
    fetchCitiesInfo() {
      for (let i = 0; i <= this.cities.length; i++) {
        this.cityName = this.cities[i]
        axios.get('https://api.openweathermap.org/data/2.5/weather?',
            {params: {q: this.cityName, APPID: this.AppId}})
            .then(
                (res) => {
                  this.likedCities.push(res.data)
                }
            )
            .catch((err) => {
              console.log(err)
            })
      }
    },
    remove(index) {
      this.removedItemId = index;
      this.cities.splice(this.removedItemId, 1)
      localStorage.removeItem("likedCity");
      localStorage.setItem("likedCity", JSON.stringify(this.cities));
      this.likedCities.splice(this.removedItemId, 1)
    }
  }
}
</script>