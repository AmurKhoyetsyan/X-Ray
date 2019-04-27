/**
 * X-Ray by Amur
 * https://github.com/AmurKhoyetsyan/X-Ray
 */

/**
 * function set state
 * @param option
 * @param state
 */

function setState(option, state){
    if(typeof option === 'object'){ // if type option object
        if(Object.keys(option).length > 0){ // get length object
            for(var key in option){
                if(state.hasOwnProperty(key)){
                    state[key] = option[key];
                }
            }
        }
    }
}

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

setState(object, state);

console.log(state);