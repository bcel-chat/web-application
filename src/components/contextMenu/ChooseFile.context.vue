<template>
   <div id="context-menu" class="context-menu">
        <nav class="context-file" v-show="contextFile" :style="[menuX, menuY]" ref="menu">
            <ul>
            <li role="button" class="list-menu">
                <i class="far fa-image"></i>
                <span>Media</span>
            </li>
            <li role="button" class="list-menu">
                <i class="far fa-file-alt"></i>
                <span>File</span>
            </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    data(){
  	return{
      contextFile: false,
      menuX: null,
      menuY: null,
      taskItemInContext: null,
      contextMenuLinkClassName: 'list-menu',
      taskItemClassName: 'context-menu'
    }
  },
  mounted(){
  document.addEventListener( "contextmenu", (e) => {
      this.taskItemInContext = this.clickInsideElement( e, this.taskItemClassName );
      
      if ( this.taskItemInContext ) {
        e.preventDefault();
        this.contextFile = true
        this.positionMenu(e);
      } else {
        this.taskItemInContext = null;
       this.contextFile = false
      }
    })
 		this.clickListener()
  },
  methods:{
  clickInsideElement( e, className ) {
    var el = e.srcElement || e.target;
    
    if ( el.classList.contains(className) ) {
      return el;
    } else {
      while ( el = el.parentNode ) {
        if ( el.classList && el.classList.contains(className) ) {
          return el;
        }
      }
    }
    return false;
  },
  contextListener(){
  	document.addEventListener( "click", (e) => {
      var clickeElIsLink = this.clickInsideElement( e, this.contextMenuLinkClassName );
      if ( clickeElIsLink ) {
        e.preventDefault();
        this.menuItemListener( clickeElIsLink );

      } else {
        var button = e.which || e.button;
        if ( button === 1 ) {
         this.contextFile = false
        }
      }
    })
  },
  clickListener() {
    document.addEventListener( "click", (e) => {
      var clickeElIsLink = this.clickInsideElement( e, this.contextMenuLinkClassName );
              console.log(clickeElIsLink)
      if ( clickeElIsLink ) {
        e.preventDefault();
        this.menuItemListener( clickeElIsLink );
      } else {
        var button = e.which || e.button;
        if ( button === 1 ) {
          this.contextFile = false
        }
      }
    });
  },
  	getPosition(e) {
      var posx = 0;
      var posy = 0;

      if (!e) var e = window.event;

      if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
      } else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }

      return {
        x: posx,
        y: posy
      }
  },
  positionMenu(e) {
    const clickCoords = this.getPosition(e);
    const clickCoordsX = clickCoords.x;
    const clickCoordsY = clickCoords.y;
    
    const menuWidth = this.$refs.menu.offsetWidth + 4;
    const menuHeight = this.$refs.menu.offsetHeight + 4;
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    if ( (windowWidth - clickCoordsX) < menuWidth ) {
      this.menuX = {left: windowWidth - menuWidth + "px"}
    } else {
      this.menuX = {left: clickCoordsX + "px"}
    }
    
    if ( (windowHeight - clickCoordsY) < menuHeight ) {
      this.menuY = {top: windowHeight - menuHeight + "px"}
    } else {
      this.menuY = {top: clickCoordsY + "px"}
    }
  },
  menuItemListener( link ) {
    console.log( "Task ID - " + this.taskItemInContext.getAttribute("data-id") + ", Task action - " + link.getAttribute("data-action"));
    this.contextFile
  }
  }
}
</script>

<style lang="scss" scoped>
    #app{
  position: relative;
  height: 500px;
}

.context-file{
  position: absolute;
  width: 10rem;
  height: 8rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  font-family: 'dosis';
  font-size: 1.4rem;
  box-shadow: 0px 0px 12px -6px #000;
  color: #474747;
}

.context-file ul li{
  padding: .5rem 1rem .5rem 1rem;
  border-bottom: 1px solid #ccc;
}

.context-file ul li:hover{
 background-color: #f75e5e;
 color: white;
}

.context-file ul li:last-child{
  border-bottom: none
 }
 
 .context-file ul li i{
  width: 20%;
 }
 
 [role="button"]{
   cursor: pointer;
 }
</style>
