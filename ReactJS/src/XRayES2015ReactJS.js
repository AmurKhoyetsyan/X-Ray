/**
 * X-Ray by Amur
 * https://github.com/AmurKhoyetsyan/X-Ray
 */

'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import './xray.css';
export default class XRay extends Component {
    constructor(props) {
        super(props);

        _defineProperty(this, "componentDidMount", () => {
            this.updateWidthHeight();
            window.addEventListener('resize', this.updateWidthHeight);
        });

        _defineProperty(this, "getDiameter", () => {
            let {
                diameter,
                resize
            } = this.state;
            let getMaxResWidth = this.getMaxResize(resize);
            let newDiameter = this.matchesWindow(resize);

            if (this.state.responsive) {
                if (window.matchMedia(`(min-width: ${getMaxResWidth + 1}px)`).matches) {
                    return newDiameter > diameter ? newDiameter : diameter;
                } else {
                    return newDiameter;
                }
            } else {
                return diameter;
            }
        });

        _defineProperty(this, "updateWidthHeight", () => {
            let {
                beyond
            } = this.state;

            this.firstImg.onload = () => {
                let naturalWidth = this.firstImg.naturalWidth;
                let naturalHeight = this.firstImg.naturalHeight;
                let percent = naturalWidth / naturalHeight;
                let width = this.firstImg.clientWidth;
                let height = Math.round(width / percent);
                let dim = this.getDiameter();
                let sensor;

                if (beyond) {
                    sensor = {
                        width: width + dim,
                        height: height + dim,
                        top: -(dim / 2),
                        left: -(dim / 2)
                    };
                } else {
                    sensor = {
                        width: width,
                        height: height,
                        top: 0,
                        left: 0
                    };
                }

                this.setState({
                    width,
                    height,
                    dim,
                    sensor
                });
            };
        });

        _defineProperty(this, "getMaxResize", diameter => {
            let newDiameter = diameter[0].screen;

            for (let i = 0; i < diameter.length; i++) {
                if (diameter[i].screen > newDiameter) {
                    newDiameter = diameter[i].screen;
                }
            }

            return newDiameter;
        });

        _defineProperty(this, "matchesWindow", diameter => {
            let newDiameter = diameter[0].diameter;

            for (let i = 0; i < diameter.length; i++) {
                if (window.matchMedia(`(max-width: ${diameter[i].screen}px)`).matches) {
                    newDiameter = diameter[i].diameter;
                }
            }

            return newDiameter;
        });

        _defineProperty(this, "HoverSensor", event => {
            let positionX = event.nativeEvent.layerX;
            let positionY = event.nativeEvent.layerY;
            let {
                sensor,
                dim,
                beyond
            } = this.state;
            let position = {
                startY: 0,
                endY: sensor.height,
                startX: 0,
                endX: sensor.width
            };
            let coefficient = dim / 2;
            let zoomPosition;

            if (beyond) {
                zoomPosition = dim / 2;
            } else {
                zoomPosition = 0;
            }

            if (positionY >= position.startY + coefficient && positionY <= position.endY - coefficient) {
                this.zoom.style.top = `${positionY - coefficient - zoomPosition}px`;
                this.lastImg.style.top = `${-positionY + coefficient + zoomPosition}px`;
            } else if (positionY < position.startY + coefficient) {
                this.zoom.style.top = `${position.startY - zoomPosition}px`;
                this.lastImg.style.top = `${position.startY + zoomPosition}px`;
            } else if (positionY > position.endY - coefficient) {
                this.zoom.style.top = `${position.endY - dim - zoomPosition}px`;
                this.lastImg.style.top = `${-position.endY + dim + zoomPosition}px`;
            }

            if (positionX >= position.startX + coefficient && positionX <= position.endX - coefficient) {
                this.zoom.style.left = `${positionX - coefficient - zoomPosition}px`;
                this.lastImg.style.left = `${-positionX + coefficient + zoomPosition}px`;
            } else if (positionX < position.startX + coefficient) {
                this.zoom.style.left = `${position.startX - zoomPosition}px`;
                this.lastImg.style.left = `${position.startX + zoomPosition}px`;
            } else if (positionX > position.endX - coefficient) {
                this.zoom.style.left = `${position.endX - dim - zoomPosition}px`;
                this.lastImg.style.left = `${-position.endX + dim + zoomPosition}px`;
            }
        });

        _defineProperty(this, "move", event => {
            let {
                transform
            } = this.state;

            if (transform) {
                this.setState({
                    transform: false
                });
            }

            this.HoverSensor(event);
        });

        this.state = {
            backgroundColor: this.props.backgroundColor || 'transparent',
            transform: true,
            images: this.props.images,
            cursor: this.props.cursor || false,
            diameter: this.props.diameter || 150,
            beyond: this.props.beyond || false,
            width: null,
            height: null,
            dim: null,
            type: this.props.type || 'circle',
            sensor: {
                width: null,
                height: null,
                top: null,
                left: null
            },
            responsive: this.props.responsive || false,
            resize: this.props.resize || [{
                screen: 1199,
                diameter: 130
            }, {
                screen: 991,
                diameter: 100
            }, {
                screen: 767,
                diameter: 80
            }, {
                screen: 575,
                diameter: 50
            }]
        };
        this.move = this.move.bind(this);
    }

    render() {
        let {
            images,
            cursor,
            transform,
            width,
            height,
            dim,
            sensor,
            type,
            backgroundColor
        } = this.state;
        let parentClass = cursor ? 'x-ray-photo-parent' : 'x-ray-photo-parent cursor-none';
        let parentTransform = transform ? 'x-ray-last-photo transform' : 'x-ray-last-photo';
        let lastImage = transform ? 'x-ray-last-photo-img transform' : 'x-ray-last-photo-img';
        let lastStyle = {
            width: `${dim}px`,
            height: `${dim}px`,
            backgroundColor
        };
        return React.createElement("div", {
            className: parentClass
        }, React.createElement("img", {
            ref: img => {
                this.firstImg = img;
            },
            src: images[0],
            alt: "first-photo",
            className: "x-ray-first-photo"
        }), React.createElement("div", {
            ref: zoom => {
                this.zoom = zoom;
            },
            className: parentTransform,
            style: lastStyle
        }, type === 'magnifyingGlass' ? React.createElement("div", {
            className: "magnifyingGlass"
        }) : null, React.createElement("div", {
            className: "x-ray-last-photo-img-parent"
        }, React.createElement("img", {
            ref: img => {
                this.lastImg = img;
            },
            style: {
                width: `${width}px`,
                height: `${height}px`
            },
            src: images[1],
            alt: "last-photo",
            className: lastImage
        }))), React.createElement("div", {
            className: "x-ray-sensor",
            style: sensor,
            onMouseMove: this.move
        }));
    }

}