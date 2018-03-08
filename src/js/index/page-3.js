{
  let view = {
    el:'#page-3',
    init(){
      this.$el = $(this.el)
    },
    show(){
      this.$el.addClass('active')
    },
    hide(){
      this.$el.removeClass('active')
    },
    render(){
      let template = `
      <form>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-search"></use>
        </svg>
        <input id="search" type="text" placeholder="搜索歌曲、歌手">
        <svg class="icon clear" aria-hidden="true">
            <use xlink:href="#icon-clear"></use>
        </svg>
      </form>
      `
      this.$el.html(template)
    },
    renderA(inputValue, hasTagA){
      if(!hasTagA){ // a 标签不存在时，创建 a 标签
        let a = document.createElement('a')
        a.id = "searchButton"
        a.textContent = `搜索"${inputValue}"`
        this.$el.append(a)
      }else{  // a 标签存在时，修改 a 标签
        $('#searchButton').text(`搜索"${inputValue}"`)
      }
    },
    activeClear(){
      this.$el.find('svg.clear').eq(0).addClass('active')
    },
    deactiveClear(){
      this.$el.find('svg.clear').eq(0).removeClass('active')      
    },
    clearValue(){
      this.$el.find('input[type=text]').eq(0).val('')
    },
    removeTagA(){
      $('#searchButton').remove()
    },
    removeSearchOl(){
      if(this.$el.find('ol')){
        this.$el.find('ol').eq(0).remove()
      }
    },
    renderSongs(songs){
      let $ol = $('<ol></ol>')
      songs.map((song)=>{
        let {id,name,singer} = song
        let $li = `
        <li>
        <a href="./song.html?id=${id}">
          <h3>${name}</h3>
          <p>${singer}</p>
          <svg class="icon" aria-hidden="true">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-bofang"></use>
          </svg>
        </a>
        </li>
        `
        $ol.append($li)
      })
      this.$el.append($ol)
    },
    removeAll(){
      this.removeTagA()
      this.deactiveClear()
      this.clearValue()
    },
  }

  let model = {
    data:{
      songs:[]
    },
    inputValue:'',
    hasTagA:false,
    search(inputValue){
      let singerQuery = new AV.Query('Song');
      singerQuery.contains('singer', inputValue);
    
      let nameQuery = new AV.Query('Song');
      nameQuery.contains('name', inputValue);
    
      let query = AV.Query.or(singerQuery, nameQuery);

      return query.find().then((songs)=>{
        this.data.songs = songs.map((song)=>{
          return {
            id: song.id,
            name: song.attributes.name,
            clickAmount: song.attributes.clickAmount,
            singer: song.attributes.singer,
          }
        })
      })
    },
  }

  let controller = {
    init(view, model){
      this.view = view
      this.view.init()
      this.view.render()
      this.model = model
      this.bindEventHub()
      this.bindEvents()
    },
    bindEventHub(){
      window.eventHub.on('selectTab',(tabName)=>{
        if(tabName === this.view.$el.attr('id')){
          this.view.show()
        }else{
          this.view.hide()
        }
      })
    },
    bindEvents(){
      this.view.$el.on('input','input',(e)=>{
        if(!e.currentTarget.value){ // input 为空，清除a标签，清除X图标
          this.model.inputValue = ''
          this.view.deactiveClear()
          this.model.hasTagA = false
          this.view.removeTagA()
          this.view.removeSearchOl()
        }else{ // input 不为空，添加或修改a标签，添加X图标
          this.model.inputValue = e.currentTarget.value
          this.view.activeClear()
          this.view.renderA(this.model.inputValue, this.model.hasTagA)
          this.model.hasTagA = true
        }
      })
      this.view.$el.find('svg.clear').eq(0).on('click',(e)=>{
        this.view.removeAll()
        this.model.hasTagA = false
        this.view.removeSearchOl()
      })
      this.view.$el.on('click','#searchButton',(e)=>{
        this.model.search(this.model.inputValue).then(()=>{
          this.view.removeTagA()
          this.view.renderSongs(this.model.data.songs)
        })
      })
    },
  }

  controller.init(view, model)
}