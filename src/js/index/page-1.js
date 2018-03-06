{
  let view = {
    el: '#page-1',
    init(){
      this.$el = $(this.el)
    },
    show(){
      this.$el.addClass('active')
    },
    hide(){
      this.$el.removeClass('active')
    }
  }

  let model = {}

  let controller = {
    init(view,model){
      this.view =  view
      this.view.init()
      this.model = model
      this.loadModule1()
      this.loadModule2()
      this.bindEventHub()
    },
    loadModule1(){
      let script = document.createElement('script')
      script.src = './js/index/page-1-1.js'
      document.body.appendChild(script)
    },
    loadModule2(){
      let script = document.createElement('script')
      script.src = './js/index/page-1-2.js'
      document.body.appendChild(script)
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