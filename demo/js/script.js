/**
 * X-Ray by Amur
 * https://github.com/AmurKhoyetsyan/X-Ray
 */

window.onload = function(){
    let xray = document.querySelectorAll('.x-ray');
    new XRay(xray).run({
        diameter: 100,
        magnifyingGlassResponsive: false
    });
};