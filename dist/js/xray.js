/**
 * X-Ray by Amur
 * https://github.com/AmurKhoyetsyan/X-Ray
 */

class XRay{
    constructor(elem){
        this.elem = elem;
        // default options
        this.state = {
            magnifyingGlassBackground: 'transparent',
            typeShow: 'circle',
            beyondTheBoundary: true,
            diameter: 150,
            magnifyingGlassResponsive: true,
            cursor: false,
            responsiveDiameter: [
                {
                    size: 1199,
                    diameter: 130
                },
                {
                    size: 991,
                    diameter: 100
                },
                {
                    size: 767,
                    diameter: 80
                },
                {
                    size: 575,
                    diameter: 50
                }
            ]
        };
    };

    /**
     * set state or replace default options
     * @param object
     */

    setState(object){
        for(let key in object){
            if(object.hasOwnProperty(key)){
                this.state[key] = object[key];
            }
        }
    };

    /**
     * hide original images
     * @param photos
     */

    dNone(photos){
        for(let i = 0; i < photos.length; i++){
            photos[i].style.display = 'none';
        }
    };

    /**
     * create effect divs
     * @param photos
     * @param width
     * @param height
     * @returns {Element}
     */

    addPhotos(photos, width, height){
        // parent photos
        let parentShow = document.createElement('div');
        parentShow.classList.add('x-ray-photo-parent');
        if(!this.state.cursor){
            parentShow.classList.add('cursor-none');
        }
        // first photo
        let firstPhoto = document.createElement('img');
        firstPhoto.classList.add('x-ray-first-photo');
        firstPhoto.src = photos[0].getAttribute('src');
        //last photo or circle
        let lastPhoto = document.createElement('div');
        lastPhoto.classList.add('x-ray-last-photo');
        lastPhoto.classList.add('transform');
        // diameter
        let {responsiveDiameter, diameter} = this.state;
        let getMaxResWidth = this.getMaxResponsiveDiameter(responsiveDiameter);
        let newDiameter = this.matchesWindow(responsiveDiameter);
        if(this.state.magnifyingGlassResponsive){
            if(window.matchMedia(`(min-width: ${getMaxResWidth + 1}px)`).matches){
                lastPhoto.style.width = `${diameter}px`;
                lastPhoto.style.height = `${diameter}px`;
            }else{
                lastPhoto.style.width = `${newDiameter}px`;
                lastPhoto.style.height = `${newDiameter}px`;
            }
        }else{
            lastPhoto.style.width = `${diameter}px`;
            lastPhoto.style.height = `${diameter}px`;
        }
        if(this.state.typeShow === 'magnifyingGlass'){
            let handle = document.createElement('div');
            handle.classList.add('magnifyingGlass');
            lastPhoto.appendChild(handle);
        }
        lastPhoto.style.backgroundColor = this.state.magnifyingGlassBackground;
        // last photo parent
        let lastPhotoParent = document.createElement('div');
        lastPhotoParent.classList.add('x-ray-last-photo-img-parent');
        // last photo images
        let lastPhotoImg = document.createElement('img');
        lastPhotoImg.classList.add('x-ray-last-photo-img');
        lastPhotoImg.classList.add('transform');
        lastPhotoImg.src = photos[1].getAttribute('src');
        lastPhotoImg.style.width  = `${width}px`;
        lastPhotoImg.style.height = `${height}px`;
        lastPhotoParent.appendChild(lastPhotoImg);
        lastPhoto.appendChild(lastPhotoParent);
        // display none photos
        this.dNone(photos);
        parentShow.appendChild(firstPhoto);
        parentShow.appendChild(lastPhoto);
        return parentShow;
    };

    /**
     * get max width for diameter
     * @param diameter
     * @returns {number|string|Number|*}
     */

    getMaxResponsiveDiameter(diameter){
        let newDiameter = diameter[0].size;
        for(let i = 0; i < diameter.length; i++){
            if(diameter[i].size > newDiameter){
                newDiameter = diameter[i].size;
            }
        }
        return newDiameter;
    };

    /**
     * return diameter
     * @param diameter
     * @returns {number|string|Number|*}
     */

    matchesWindow(diameter){
        let newDiameter = diameter[0].size;
        for(let i = 0; i < diameter.length; i++){
            if(window.matchMedia(`(max-width: ${diameter[i].size}px)`).matches){
                newDiameter = diameter[i].diameter;
            }
        }
        return newDiameter;
    };

    /**
     * windowResize this plugin
     * @param parent
     */

    windowResize(parent){
        let firstPhoto = parent.getElementsByClassName('x-ray-first-photo')[0];
        let lastPhoto = parent.getElementsByClassName('x-ray-last-photo')[0];
        let lastPhotoImages = lastPhoto.getElementsByClassName('x-ray-last-photo-img')[0];
        lastPhotoImages.style.width = `${firstPhoto.clientWidth}px`;
        lastPhotoImages.style.height = `${firstPhoto.clientHeight}px`;
        let {responsiveDiameter, diameter} = this.state;
        let getMaxResWidth = this.getMaxResponsiveDiameter(responsiveDiameter);
        let newDiameter = this.matchesWindow(responsiveDiameter);
        if(this.state.magnifyingGlassResponsive){
            if(window.matchMedia(`(min-width: ${getMaxResWidth + 1}px)`).matches){
                lastPhoto.style.width = `${diameter}px`;
                lastPhoto.style.height = `${diameter}px`;
            }else{
                lastPhoto.style.width = `${newDiameter}px`;
                lastPhoto.style.height = `${newDiameter}px`;
            }
        }else{
            lastPhoto.style.width = `${diameter}px`;
            lastPhoto.style.height = `${diameter}px`;
        }
    };

    /**
     * width first image of width with position mouse if beyond the boundary true
     * @param event
     * @param elem
     */

    trueHover(event, elem){
        let zoom = elem.getElementsByClassName('x-ray-last-photo')[0];
        let img = zoom.getElementsByTagName('img')[0];
        let {width, height} = elem.getBoundingClientRect();
        let left = elem.offsetLeft;
        let top = elem.offsetTop;

        let position = {
            startY: top,
            endY: top + height,
            startX: left,
            endX: left + width
        };

        let zoomPartHeight = (zoom.clientHeight / 2);
        let zoomPartWidth = (zoom.clientWidth / 2);

        if((event.pageY >= position.startY) && (event.pageY <= position.endY)){
            zoom.style.top = `${event.pageY - (top + zoomPartHeight)}px`;
            img.style.top = `${-event.pageY + (top + zoomPartHeight)}px`;
        }else if(event.pageY < position.startY){
            zoom.style.top = `${position.startY - (top + zoomPartHeight)}px`;
            img.style.top = `${position.startY - (top - zoomPartHeight)}px`;
        }else if(event.pageY > position.endY){
            zoom.style.top = `${position.endY - (top + zoomPartHeight)}px`;
            img.style.top = `${-position.endY + (top + zoomPartHeight)}px`;
        }

        if((event.pageX >= position.startX) && (event.pageX <= position.endX)){
            zoom.style.left = `${event.pageX - (left + zoomPartWidth)}px`;
            img.style.left = `${-event.pageX + (left + zoomPartWidth)}px`;
        }else if(event.pageX < position.startX){
            zoom.style.left = `${position.startX - (left + zoomPartWidth)}px`;
            img.style.left = `${position.startX - (left - zoomPartWidth)}px`;
        }else if(event.pageX > position.endX){
            zoom.style.left = `${position.endX - (left + zoomPartWidth)}px`;
            img.style.left = `${-position.endX + (left + zoomPartWidth)}px`;
        }
    };

    /**
     * width first image of width with position mouse if beyond the boundary false
     * @param event
     * @param elem
     */

    falseHover(event, elem){
        let zoom = elem.getElementsByClassName('x-ray-last-photo')[0];
        let img = zoom.getElementsByTagName('img')[0];
        let {width, height} = elem.getBoundingClientRect();
        let left = elem.offsetLeft;
        let top = elem.offsetTop;

        let position = {
            startY: top,
            endY: top + height,
            startX: left,
            endX: left + width
        };

        let zoomPartHeight = (zoom.clientHeight / 2);
        let zoomPartWidth = (zoom.clientWidth / 2);

        if((event.pageY >= (position.startY + zoomPartHeight)) && (event.pageY <= (position.endY - zoomPartHeight))){
            zoom.style.top = `${event.pageY - (top + zoomPartHeight)}px`;
            img.style.top = `${-event.pageY + (top + zoomPartHeight)}px`;
        }else if(event.pageY < (position.startY + zoomPartHeight)){
            zoom.style.top = `${position.startY - top}px`;
            img.style.top = `${position.startY - top}px`;
        }else if(event.pageY > (position.endY - zoomPartHeight)){
            zoom.style.top = `${position.endY - (top + (zoomPartHeight * 2))}px`;
            img.style.top = `${-position.endY + (top + ((zoomPartHeight * 2)))}px`;
        }

        if((event.pageX >= (position.startX + zoomPartWidth)) && (event.pageX <= (position.endX - zoomPartWidth))){
            zoom.style.left = `${event.pageX - (left + zoomPartWidth)}px`;
            img.style.left = `${-event.pageX + (left + zoomPartWidth)}px`;
        }else if(event.pageX < (position.startX + zoomPartWidth)){
            zoom.style.left = `${position.startX - left}px`;
            img.style.left = `${position.startX - left}px`;
        }else if(event.pageX > (position.endX - zoomPartWidth)){
            zoom.style.left = `${position.endX - (left + (zoomPartWidth * 2))}px`;
            img.style.left = `${-position.endX + (left + (zoomPartWidth * 2))}px`;
        }
    };

    /**
     * remove classes transform in HTML
     * @param elem
     */

    removeTransform(elem){
        let zoom = elem.getElementsByClassName('x-ray-last-photo')[0];
        let img = elem.getElementsByClassName('x-ray-last-photo-img')[0];
        if(zoom.classList.contains('transform')){
            zoom.classList.remove('transform');
        }
        if(img.classList.contains('transform')){
            img.classList.remove('transform');
        }
    };

    /**
     * create X-Ray
     * @param elem
     */

    createXRay(elem){
        let addThis = this;
        let photos = elem.getElementsByTagName('img');
        let width = photos[0].clientWidth;
        let height = photos[0].clientHeight;
        let parentShow = addThis.addPhotos(photos, width, height);
        elem.appendChild(parentShow);
        window.onmousemove = function(event){
            elem.onmousemove = function(){
                addThis.removeTransform(elem);
                if(addThis.state.beyondTheBoundary){
                    addThis.trueHover(event, elem);
                }else{
                    addThis.falseHover(event, elem);
                }
            };
        };
        window.onresize = function(event){
            addThis.windowResize(elem);
        };
    };

    run(option = {}){
        if(Object.keys(option).length > 0){
            this.setState(option);
        }
        if(this.elem.length > 0){
            for(let i = 0; i < this.elem.length; i++){
                this.createXRay(this.elem[i]);
            }
        }
    };
}