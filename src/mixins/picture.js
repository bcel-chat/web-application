const clear_pic = {
    data(){
        return {
            filepath: null,
            base64: null
        }   
    },
    methods: {
        getUrl(width) {
            this.$store.dispatch('userDetail/filepath', this.$refs.fi)
            const input = this.$store.state.userDetail.filepath

            let files = [];

            var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.ico|\.svg)$/i;
            if (!allowedExtensions.exec(input.value)) {
                this.$store.dispatch('chats/picture', this.alt)
                return
            }

            for(let i = 0; i < input.files.length; i++){
                files.push(input.files[i])               
            }

           files.forEach(e=>{
               this.fileConverse(e, width)
           })
        },
        fileConverse(input, width){
            var reader = new FileReader();
            reader.onload = (event) => {
                var img = new Image();
                img.onload = () => {
                    if (img.width > width) {
                        var oc = document.createElement('canvas'),
                            octx = oc.getContext('2d');
                        oc.width = img.width;
                        oc.height = img.height;
                        octx.drawImage(img, 0, 0);
                        while (oc.width * 0.5 > width) {
                            oc.width *= 0.5;
                            oc.height *= 0.5;
                            octx.drawImage(oc, 0, 0, oc.width, oc.height);
                        }
                        oc.width = width;
                        oc.height = oc.width * img.height / img.width;
                        octx.drawImage(img, 0, 0, oc.width, oc.height);
                        this.$store.dispatch('chats/picture', {file: oc.toDataURL()})
                    } else {
                        this.$store.dispatch('chats/picture', {file: img.src})
                    }
                };

                img.src = event.target.result
                this.panel(2)
            };
            reader.readAsDataURL(input)
        }
    }
}

export default clear_pic