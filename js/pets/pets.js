
class Pet {
  temperatureC 
  temperatureF
  constructor(){

  }
  async getWeather(){
    let data = await userWeather.getWeather()
    this.temperatureF = Number(data.fahrenheit.current)
    this.temperatureC = (this.temperatureF -32) * 5/9
  }
  async run(){
    console.log(this.petName)
    await this.getWeather()
  } 
}

class desertType extends Pet{
  t = 90
  loveWeather = [this.t-5, this.t-4, this.t-3, this.t-2, this.t-1, this.t, this.t+1, this.t+2, this.t+3, this.t+4, this.t+5]
  likeWeather = [this.t-15, this.t-14, this.t-13, this.t-12, this.t-11, this.t-10, this.t-9, this.t-8, this.t-7, this.t-6, this.t+6, this.t+7, this.t+8, this.t+9, this.t+10, this.t+11, this.t+12, this.t+13, this.t+14, this.t+15]
  dislikeWeather = [this.t-25, this.t-24, this.t-23, this.t-22, this.t-21, this.t-20, this.t-19, this.t-18, this.t-17, this.t-16, this.t+16, this.t+17, this.t+18, this.t+19, this.t+20, this.t+21, this.t+22, this.t+23, this.t+24, this.t+25]
  hateWeather 
  
  constructor(){
    super()
  }

  async setHateWeather(){
    await this.getWeather()
    let hateTemp = this.t
    this.hateWeather = this.temperatureF > hateTemp ? hateTemp + 26 : hateTemp - 26
  }
  
}

class Snake extends desertType{
  constructor(petName, love, like, dislike, hate){
    super()
    this.petName = petName
    this.loveQuip = love
    this.likeQuip = like
    this.dislikeQuip = dislike
    this.hateQuip = hate
    this.lastQuip
  }
  async makeQuip(){
    await this.setHateWeather()
    if(this.temperatureF > this.hateWeather && this.temperatureF > this.t){
      console.log(this.hateQuip)
      this.lastQuip = this.hateQuip
    }else if(this.loveWeather.indexOf(this.temperatureF) != -1){
      console.log(this.loveQuip)
      this.lastQuip = this.loveQuip
    }else if(this.likeWeather.indexOf(this.temperatureF) != -1){
      console.log(this.likeQuip)
      this.lastQuip = this.likeQuip
    }else if(this.dislikeWeather.indexOf(this.temperatureF) != -1){
      console.log(this.dislikeQuip)
      this.lastQuip = this.dislikeQuip
    }else if(this.temperatureF < this.hateWeather && this.temperatureF < this.t){
      console.log(this.hateQuip)
      this.lastQuip = this.hateQuip
    }else{
      console.log(this.hateWeather, this.temperatureF)
    }
  }
}


let frog = new Snake('Albert','perfect temp!', 'this temp works just fine', 'man, this temp sucks', 'i hate this temp with all my heart')
frog.makeQuip()


// window.onload = runIt()
