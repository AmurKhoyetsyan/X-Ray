/**
 * X-Ray by Amur
 * https://github.com/AmurKhoyetsyan/X-Ray
 */

/**
 * set state with ES 5 Object prototype
 * @param option
 */

Object.prototype.setState = function(option){
    if(typeof option === 'object'){ // if type option object
        if(Object.keys(option).length > 0){ // get length object
            for(var key in option){
                if(this.hasOwnProperty(key)){
                    this[key] = option[key];
                }
            }
        }
    }
};

var object = {
    magnifyingGlassBackground: '#00AAFF',
    typeShow: 'circle',
    beyondTheBoundary: false,
    diameter: 50,
    magnifyingGlassResponsive: false,
    cursor: true
};

var state = {
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

state.setState(object);

console.log(state);