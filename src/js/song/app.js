{
  let view = {
    el: '#page',
    init(){
      this.$el = $(this.el)
    },
    render(song){
      let {name,url,cover,lyrics} = song
      this.$el.find('.background').css(`background-image`,`url(${cover})`)
      this.$el.find('.cover').attr('src',cover)
      this.$el.find('audio').attr('src',url)
      this.$el.find('h1.songName')[0].textContent = name
      lyrics.split('\n').map((string)=>{
        let p = document.createElement('p')
        let regex = /\[([\d:.]+)\](.+)/
        let matches = string.match(regex)
        if(matches){
          let time = matches[1]
          p.textContent = matches[2]
          let parts = time.split(':')
          let minutes = parts[0]
          let seconds = parts[1]
          let newTime = parseInt(minutes,10) * 60 + parseFloat(seconds,10)
          p.setAttribute('data-time', newTime)
        }else{
          p.textContent = ''          
        }      
        this.$el.find('.lyrics > .lines').append(p)
      })
    },
    play(){
      this.$el.find('.icon').hide()
      this.$el.find('.cover').removeClass('paused')
      this.$el.find('audio')[0].play()
    },
    pause(){
      this.$el.find('.icon').show()
      this.$el.find('.cover').addClass('paused')
      this.$el.find('audio')[0].pause()
    },
    showLyrics(time){
      let allP = this.$el.find('.lyrics > .lines > p')
      for(let i = 0, len = allP.length; i < len;i++){
        if(i === allP.length - 1){
          allP.eq(i).addClass('active').siblings().removeClass('active')          
        }else{
          let prveTime = allP.eq(i).attr('data-time')
          let nextTime = allP.eq(i + 1).attr('data-time')
          if(prveTime <= time && time < nextTime){
            let pHeight = allP.eq(i).offset().top
            let linesHeight = this.$el.find('.lines').offset().top
            let height = pHeight - linesHeight
            this.$el.find('.lines').css('transform',`translateY(${-height + 35}px)`)
            allP.eq(i).addClass('active').siblings().removeClass('active')
            break
          }
        }
      }
    },
  }

  let model = {
    data:{
      song:{
        id: '',
        name: '',
        singer: '',
        url: '',
        cover: '',
        lyrics:'',
        clickAmount:undefined,
      },
      status: 'paused',
    },  
    setSongId(id){
      this.data.song.id = id
    },
    getSong(id){
      let query = new AV.Query('Song');
      return query.get(id).then((song)=>{
        Object.assign(this.data.song, song.attributes)
      })
    },
    addClickAmount(id){
      this.data.song.clickAmount = this.data.song.clickAmount + 1
      var song = AV.Object.createWithoutData('Song', id)
      song.set('clickAmount', this.data.song.clickAmount)
      song.save()
    },
  }

  let controller = {
    init(view, model){
      this.view = view  
      this.view.init()
      this.model = model
      this.getSongId()
      this.model.getSong(this.model.data.song.id)
        .then(()=>{
          this.view.render(this.model.data.song)
        })
          .then(()=>{
            this.model.addClickAmount(this.model.data.song.id)
          })
      this.bindEvents()
    },
    getSongId(){
      let search = window.location.search
      if(search.indexOf('?') === 0){
        search = search.slice(1)
      }
      let searchArray = search.split('&').filter(v=>v)  // 过滤掉空值
      let id = ''
      for(let i = 0;i < searchArray.length;i++){
        let keyValue = searchArray[i].split('=')
        if(keyValue[0] === 'id'){
          id = keyValue[1]
        }
        break
      }
      this.model.setSongId(id)
      return id
    },
    bindEvents(){
      this.view.$el.on('click','main',(e)=>{
        if(this.model.data.status === 'paused'){
          this.model.data.status = 'playing'
          this.view.play()
        }else{
          this.model.data.status = 'paused'
          this.view.pause()
        }
      })
      this.view.$el.find('audio').on('timeupdate',(e)=>{
        let time = e.currentTarget.currentTime
        this.view.showLyrics(time)
      })
    },
  }

  controller.init(view, model)
}