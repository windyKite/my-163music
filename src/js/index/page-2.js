{
  let view = {
    el:'#page-2',
    init(){
      this.$el = $(this.el)
    },
    show(){
      this.$el.addClass('active')
    },
    hide(){
      this.$el.removeClass('active')
    },
    render(songs){
      songs.map((song,index)=>{
        let {id,name,singer,clickAmount} = song
        index = index + 1 + ''
        let number = index.length === 1 ? '0' + index : '' + index
        let li
        if(Math.random() > 0.5){
          li = `
          <li>
            <a href="./song.html?id=${id}">
              <div class="number">${number}</div>
              <div class="song">
                <div class="songInfo">
                  <div class="songName">${name}</div>
                  <div class="singer">
                    <i class="sq"></i>
                    ${singer}
                  </div>
                </div>
                <svg class="icon" aria-hidden="true">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-bofang"></use>
                </svg>
              </div>
            </a>
          </li>
          `
        }else{
          li = `
          <li>
            <a href="./song.html?id=${id}">
              <div class="number">${number}</div>
              <div class="song">
                <div class="songInfo">
                  <div class="songName">${name}</div>
                  <div class="singer">
                    ${singer}
                  </div>
                </div>
                <svg class="icon" aria-hidden="true">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-bofang"></use>
                </svg>
              </div>
            </a>
          </li>
          `
        }
        $ol = this.$el.find('ol').eq(0)
        $ol.append(li)
      })
    },
  }

  let model = {
    data: {
      songs:[]
    },
    getSongs(){
      var query = new AV.Query('Song')
      query.addDescending('clickAmount')
      query.limit(20)
      return query.find().then((songs)=>{
        this.data.songs = songs.map((song)=>{
          return {
            id: song.id,
            name: song.attributes.name,
            clickAmount: song.attributes.clickAmount,
            singer: song.attributes.singer,
          }
        })
      }).catch((error)=>{
        console.log(error)
      })
    },
  }

  let controller = {
    init(view, model){
      this.view = view
      this.view.init()
      this.model = model
      this.bindEventHub()
      this.model.getSongs()
        .then(()=>{
          this.view.render(this.model.data.songs)
        })
    },
    bindEventHub(){
      window.eventHub.on('selectTab',(tabName)=>{
        if(tabName === this.view.$el.attr('id')){
          this.view.show()
        }else{
          this.view.hide()
        }
      })
    }
  }

  controller.init(view, model)
}