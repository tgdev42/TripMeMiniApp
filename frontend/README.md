# Frontend

## Commands:

- ### 1) PRE
Install dependencies.
`npm ci`

- ### 2) DEVELOP
1. `npm start`
2. open in browser: http://[IP]:[PORT] (check console message)

*[IP] and [PORT] are specified in [package.json](package.json#L12):*
`"config": {
    "IP": "127.0.0.1",
    "PORT": "8080",
  },
`
*If start on port 80 or 443 on Linux, then need start with sudo.*

- ### 3) BUILD
Build project.
1. `chmod 740 build.sh`
2. `npm run build`

- ### 4) RUN BUILDED
Start builded project for tests.
1. `npm run dist-start`
2. open in browser: http://[IP]:[PORT] (check console message)

------------

## Main four principles for frontend:

- ### Use HTML instead JS!
For example, if you want add a new item, you should not use createElement and generate HTML a new item in JS. You should use cloneNode and ready-made HTML item.

- ### Make it as simple as possible!
No need to exaggerate with the OOP in JS, with extra folders in project, etc.

- ### Less code!
Use our special functions. For example, use hide() our function for hide HTML elements.

- ### Use smaller libraries!
Take the smaller library, but updated. For example, use [Day.js](https://github.com/iamkun/dayjs "Day.js") instead Moment.js.

------------

## Frontend uses JavaScript libraries
| Name | GitHub | jsDelivr | Version |
|------|--------|----------|---------|
| Bootswatch | [GitHub](https://github.com/thomaspark/bootswatch) | [jsDelivr](https://www.jsdelivr.com/package/npm/bootswatch?path=dist%2Fflatly&tab=files) | 4.6.2 |
| SweetAlert2 | [GitHub](https://github.com/sweetalert2/sweetalert2) | [jsDelivr](https://www.jsdelivr.com/package/npm/sweetalert2?path=dist&tab=files) | 11.7.32
| Animate.css | [GitHub](https://github.com/daneden/animate.css) | [jsDelivr](https://www.jsdelivr.com/package/npm/animate.css?tab=files) | 4.1.1
| lightgallery.js | [GitHub](https://github.com/sachinchoolur/lightgallery.js) | [jsDelivr](https://www.jsdelivr.com/package/npm/lightgallery.js?path=dist&tab=files) | 1.4.0
| lg-zoom.js | [GitHub](https://github.com/sachinchoolur/lg-zoom.js) | [jsDelivr](https://www.jsdelivr.com/package/npm/lg-zoom.js?path=dist&tab=files) | 1.3.0
| lg-autoplay.js | [GitHub](https://github.com/sachinchoolur/lg-autoplay.js) | [jsDelivr](https://www.jsdelivr.com/package/npm/lg-autoplay.js?path=dist&tab=files) | 1.2.0

------------
