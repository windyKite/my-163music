{
  let view = {
    el: '.songList',
    init(){
      this.$el = $(this.el)
    },
    template:`<ol></ol>`,
    render(data){
      $(this.$el).html(this.template)
      let songs = data.songs
      let liList = songs.map((song,index)=>{
        let {id,name} = song
        return $(`<li data-song-id="${id}" title="${name}"><span class="number">${index+1}</span><span class="songName">${name}</span></li>`)
      })
      this.$el.find('ol').empty()
      liList.map((li)=>{
        this.$el.find('ol').append(li)
      })
    },
    active(element){
      $(element).addClass('active')
        .siblings('.active').removeClass('active')
    },
  }

  let model = {
    data:{
      songs:[

      ]
    },
    find(){
      let query = new AV.Query('Song')
      return query.find().then((songs)=>{
        this.data.songs = songs.map((song)=>{
          return {
            id: song.id,
            name: song.attributes.name,
            url: song.attributes.url,
            singer: song.attributes.singer,
            cover: song.attributes.cover,
            lyrics: song.attributes.lyrics,
          }
        })
      })
    },
  }

  let controller = {
    init(view, model){
      this.view = view
      this.view.init()
      this.model = model
      this.getAllSongs()
      this.bindEventHub()
      this.bindEvents()
    },
    getAllSongs(){
      this.model.find().then(()=>{
        this.view.render(this.model.data)
      })
    },
    bindEventHub(){
      window.eventHub.on('create',(song)=>{
        this.model.data.songs.push(song)
        this.view.render(this.model.data)

        let liNumber = this.model.data.songs.length - 1
        let li = this.view.$el.find('ol > li')[liNumber]
        this.view.active(li)
      })
      window.eventHub.on('update',(song)=>{
        let liNumber
        let songs = this.model.data.songs
        for(let i = 0; i < songs.length; i++){
          if(songs[i].id === song.id){
            liNumber = i
            Object.assign(songs[i], song)
          }
        }
        this.view.render(this.model.data)
        let li = this.view.$el.find('ol > li')[liNumber]
        this.view.active(li)
      })
      
    },
    bindEvents(){
      this.view.$el.on('click','li',(e)=>{
        let songId = $(e.currentTarget).attr('data-song-id')
        this.view.active(e.currentTarget)
        let selectedSong = this.model.data.songs.filter((song)=>{
          return song.id === songId
        })[0]
        
        let object = JSON.parse(JSON.stringify(selectedSong))
        window.eventHub.emit('selected',object)
      })
    }
  }

  controller.init(view, model)
}