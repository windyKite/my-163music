{
  let view = {
    el: '.form',
    init(){
      this.$el = $(this.el)
    },
    template:`
      <form>
        <div class="row">
          <div class="songName">
            <label>歌名</label>
            <input type="text" placeholder="音乐标题" name="name" value="{{name}}">
          </div>
          <div class="singer">
            <label>歌手</label>
            <input type="text" placeholder="音乐演唱者" name="singer" value="{{singer}}">
          </div>
        </div>
        <div class="row">
          <label>封面</label>
          <input type="text" placeholder="音乐封面外链" name="cover" value="{{cover}}">
        </div>
        <div class="row">
          <label>外链</label>
          <input type="text" placeholder="音乐外链" name="url" value="{{url}}">
        </div>
        <div class="row">
          <label>歌词</label>
          <textarea name="lyrics" id="" placeholder="音乐歌词" cols="67" rows="15">{{lyrics}}</textarea>
        </div>
        <div class="row">
          <input type="submit" value="保存音乐">
        </div>
      </form>
    `,
    render(song={}){
      let placeholders = 'name singer url cover lyrics'.split(' ')
      let html = this.template
      placeholders.map((string)=>{
        html = html.replace(`{{${string}}}`,song[string] || '')
      })

      this.$el.html(html)
    },
  }

  let model = {
    data:{
      song:{
        name:'',
        singer:'',
        url:'',
        cover:'',
        lyrics:'',
        id:'',
      }
    },
    create(data){
      let Song = AV.Object.extend('Song')
      let song = new Song()

      song.set('name',data.name)
      song.set('singer',data.singer)
      song.set('url',data.url)
      song.set('cover',data.cover)
      song.set('lyrics',data.lyrics)

      return song.save().then((song)=>{
        alert('保存成功')
        this.data.song.id = song.id
      })
    },
    update(data){
      let song = AV.Object.createWithoutData('Song', this.data.song.id);
      song.set('name', data.name)
      song.set('singer', data.singer)
      song.set('url', data.url)
      song.set('cover', data.cover)
      song.set('lyrics', data.lyrics)
      song.save()
    },
  }

  let controller = {
    init(view, model){
      this.view = view
      this.view.init()
      this.model = model
      this.view.render()
      this.bindEventHub()
      this.bindEvents()
    },
    bindEventHub(){
      window.eventHub.on('musicUpload',(musicData)=>{
        this.model.data.song = {} //xxxxxxxx
        let {song} = this.model.data
        let {name, url} = musicData
        song.name = name
        song.url = url
        this.view.render(this.model.data.song)
      })
      window.eventHub.on('selected',(song)=>{
        this.model.data.song = song
        this.view.render(this.model.data.song)
      })
    },
    bindEvents(){
      this.view.$el.on('submit','form',(e)=>{
        e.preventDefault()
        if(this.model.data.song.id){
          this.update()
          alert('保存成功！')
        }else{
          this.create()
        }
        
      })
    },
    formCheck(data){
      if(data.name === ''){
        alert('歌曲名不能为空')
        return false
      }else if(data.url === ''){
        alert('歌曲外链不能为空')
        return false
      }else{
        return true
      }
    },
    create(){
      // 从表单中获取数据
      let needs = 'name singer url cover lyrics'.split(' ')
      let data = {}
      needs.map((string)=>{
        data[string] = this.view.$el.find(`[name=${string}]`).val()
      })
      // 表单校验
      if(!this.formCheck(data)){
        return
      }
      // 往数据库保存数据
      this.model.create(data).then(()=>{
        Object.assign(this.model.data.song, data)
        let object = JSON.parse(JSON.stringify(this.model.data.song))
        window.eventHub.emit('create', object)
      
      })
      // 将表单中数据保存到内存
    },
    update(){
      // 从表单中获取数据
      let needs = 'name singer url cover lyrics'.split(' ')
      let data = {}
      needs.map((string)=>{
        data[string] = this.view.$el.find(`[name=${string}]`).val()
      })
      // 表单校验
      if(!this.formCheck(data)){
        return
      }
      // 修改数据库
      this.model.update(data)
      // 将更新后的数据存到内存
      Object.assign(this.model.data.song, data)
      let object = JSON.parse(JSON.stringify(this.model.data.song))
      window.eventHub.emit('update',object)
    }
  }

  controller.init(view, model)
}