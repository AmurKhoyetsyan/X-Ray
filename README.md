# X-Ray In JavaScript By Amur

<img src="gif/x-ray.gif" />

## Documentation

### Default options

	{
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

### Propotype and values

| Props                        | Type             | Value                                                                  |
| ---------------------------- | ---------------- | ---------------------------------------------------------------------- |
| magnifyingGlassBackground    | String           | "transparent" or color                                                 |
| typeShow                     | String           | "circle"  or "magnifyingGlass"                                         |
| beyondTheBoundary            | Boolean          | true  or false                                                         |
| diameter                     | Number           | exp 150 (size circle)                                                  |
| magnifyingGlassResponsive    | Boolean          | true  or false                                                         |
| cursor                       | Boolean          | true  or false                                                         |
| responsiveDiameter           | Array => object  | [{ size: 1199, diameter: 50}, ...,  { size: number, diameter: number}] |

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
    <script type="text/javascript" src="js/xray.min.js"></script>

    <!-- add in your script -->
    window.onload = function(){
        let xray = document.querySelectorAll('.your-class');
        new XRay(xray).run({
            type: 'x-ray',
            diameter: 100,
            magnifyingGlassResponsive: false
        });
	};
