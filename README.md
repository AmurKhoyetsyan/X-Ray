# X-Ray In JavaScript By Amur

<img src="gif/x-ray.gif" />

## Documentation

### Default options

	{
		backgroundColor: 'transparent',
		type: 'circle',
		beyond: true,
		diameter: 150,
		responsive: true,
		cursor: false,
		resize: [
			{
				screen: 1199,
				diameter: 130
			},
			{
				screen: 991,
				diameter: 100
			},
			{
				screen: 767,
				diameter: 80
			},
			{
				screen: 575,
				diameter: 50
			}
		]
	};

### Propotype and values

| Props            | Type             | Value                                                                     |
| ---------------- | ---------------- | ------------------------------------------------------------------------- |
| backgroundColor  | String           | "transparent" or color                                                    |
| type             | String           | "circle"  or "magnifyingGlass"                                            |
| beyond           | Boolean          | true  or false                                                            |
| diameter         | Number           | exp 150 (size circle)                                                     |
| responsive       | Boolean          | true  or false                                                            |
| cursor           | Boolean          | true  or false                                                            |
| resize           | Array => object  | [{ screen: 1199, diameter: 50}, ..., { screen: number, diameter: number}] |

### Example

#### html

	<!-- add style -->

	<link rel="stylesheet" type="text/css" href="css/armxray.min.css" />
		or
	<link rel="stylesheet" type="text/css" href="css/armxray.css" />

	<!-- images -->

	<div class="ypur-clas">
        <img src="pat/image1" />
        <img src="pat/image2" />
    </div>

    <!-- add script -->

    <script type="text/javascript" src="js/xray.min.js"></script>
    	or
    <script type="text/javascript" src="js/xray.js"></script>

    <!-- add in your script -->

    window.onload = function(){
        let xray = document.querySelectorAll('.x-ray');
        new XRay(xray).run({
            diameter: 100,
            responsive: false
        });
    };
