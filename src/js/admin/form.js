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
            <input type="text" placeholder="音乐标题" name="songName">
          </div>
          <div class="singer">
            <label>歌手</label>
            <input type="text" placeholder="音乐演唱者" name="singer">
          </div>
        </div>
        <div class="row">
          <label>封面</label>
          <input type="text" placeholder="音乐封面外链" name="cover">
        </div>
        <div class="row">
          <label>外链</label>
          <input type="text" placeholder="音乐外链" name="url">
        </div>
        <div class="row">
          <label>歌词</label>
          <textarea name="lyrics" id="" placeholder="音乐歌词" cols="67" rows="15"></textarea>
        </div>
        <div class="row">
          <input type="submit" value="保存音乐">
        </div>
      </form>
    `,
    render(data){
      this.$el.html(this.template)
    }
  }

  let model = {}

  let controller = {
    init(view, model){
      this.view = view
      this.view.init()
      this.model = model
      this.view.render()
    }
  }

  controller.init(view, model)
}