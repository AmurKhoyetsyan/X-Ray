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