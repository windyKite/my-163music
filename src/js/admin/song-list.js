{
  let view = {
    el: '.songList',
    init(){
      this.$el = $(this.el)
    },
    template:`
    <ol>
      <li>
        <span class="number">1</span>
        <span class="songName">刚好遇见你</span>
      </li>
      <li>
        <span class="number">2</span>
        <span class="songName">浪费</span>
      </li>
      <li>
        <span class="number">3</span>
        <span class="songName">小幸运</span>
      </li>
      <li>
        <span class="number">4</span>
        <span class="songName">热带雨林</span>
      </li>
      <li>
        <span class="number">5</span>
        <span class="songuplName">你就不要想起我</span>
      </li>
      <li>
        <span class="number">6</span>
        <span class="songName">说谎</span>
      </li>
      <li>
        <span class="number">7</span>
        <span class="songName">想念自己</span>
      </li>
      <li>
        <span class="number">8</span>
        <span class="songName">忽然之间</span>
      </li>
      <li>
        <span class="number">9</span>
        <span class="songName">一眼万年</span>
      </li>
      <li class="active">
        <span class="number">10</span>
        <span class="songName">一直很安静</span>
      </li>
      <li>
        <span class="number">11</span>
        <span class="songName">逍遥叹</span>
      </li>
    </ol>
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
    },
  }

  controller.init(view, model)
}