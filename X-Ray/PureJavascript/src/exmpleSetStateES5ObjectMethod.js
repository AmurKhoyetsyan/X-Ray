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
    backgroundColor: '#00AAFF',
    type: 'circle',
    beyond: false,
    diameter: 50,
    responsive: false,
    cursor: true,
};

var state = {
    backgroundColor: 'transparent',
    type: 'circle',
    beyond: true,
    diameter: 150,
    responsive: true,
    cursor: false,
};

state.setState(object);

console.log(state);