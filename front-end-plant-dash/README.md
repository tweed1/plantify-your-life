## Journal (work in progress)


#### Topic Research

TODO: project proposal info

<hr>

#### Set up

> ##### app creation with vite
> https://vite.dev/guide/

>`npm create vite@latest`
>
> select `react-ts`

##### react router
[React Router Docuementation](https://reactrouter.com/start/modes#framework)

> using framework mode in react router



##### CSS frameworks and resource links

https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout

> Bootstrap and React Bootstrap 
>
> `npm install react-bootstrap bootstrap`

https://react-bootstrap.netlify.app/docs/getting-started/introduction
https://getbootstrap.com/docs/4.0/getting-started/introduction/

<hr> 

# Session Journal

### Week 1

>Primarily set up. I explored how to set up a react app with vite, which mode of react router I wanted to use, and what CSS framework I wanted to go with. 
During this week I implemented a working navbar to ensure my routing was working. I based it off of my navbar for Homework 3.

### Week 2

>During this week I got the very basic color styling implemented and start to see what I could do with bootstrap and react bootstrap. I ran into some issues with trying to figure out bootstrap grid system and wether I should use the CSS Grid instead. This question came up because of how I originally imagined my homepage looking I was having a hard time achieving with bootstrap. 
I decided to put a pin in that for the time being and pivot to my search page. I used react bootstrap form elements in combination with basic html tags to create a search bar that works on click.

Trefle API is the first API I tried to fetch on button click from the search bar. 
https://docs.trefle.io/docs/guides/getting-started
I ran into this error 
> `Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at <https:api link> (Reason: CORS header ‘Access-Control-Allow-Origin’ missing). Status code: 200.`

And it would not return a response. This took some googling. mainly reading through stack overflow and looking through the github for trefle https://github.com/treflehq/documentation

Through some messing around with the cors mode settings I was able to get a response but there was still a CORS error and it would go no further in my code.

Perenual API is the next one I tried. Using `mode: cors` It worked immediately without any further errors. https://perenual.com/docs/api
That is the one I used to experiment with listing items on the screen this week.

### Week 3

>A lot of my struggles this week revolve around styling so mostly googling bootstrap specific questions and trialing out different things in the css. 
>
>I decided to add a footer and found this super helpful article that also brought to light how to use react bootstrap elements even better. 
> Footer reference: https://medium.com/@racosta323/create-a-simple-footer-using-react-bootstrap-58c4371a4ade
>
>I still need to complete some styling on it. I was working for awhile to align the columns in an eye catching way. It needs to be made smaller at this point.

> I also worked on fonts. 
>
>font source: https://fonts.google.com/selection

### Week 4

Map session
> A big part of what I wanted to do involved having specific geographic markers on a U.S. map that corresponded to hardiness zones. I had to google how the process even worked and discovered geojson and topojson files and React Leaflet
>
> So in this session I was working on getting my map set up with the right topography for hardiness zones. I found [this repo ](https://github.com/kgjenkins/ophz/blob/master/topojson/ophz.topojson)with the correct json files I needed
>
> I had to put the .topojson file through a [converter](https://mapshaper.org) for geojson because that is the format I needed it in to create a map using [React Leaflet](https://react-leaflet.js.org).
>
> I was able to get the map displaying with the zones. 
>
>Next I needed to implement the redirect to a new page when the user clicks on a zone and that page makes an api call to fetch all plants within that zone. I was able to do that using a on click type of interaction.
>
> On the zone-specific page, I will display the results in card form like all other search results and above that display an graph
>
>The user can click into a card and see more details on the plant

Chart session
> I knew I had a lot of different data points in my API to work with so part of the process was figuring out the best graph to represent the data, as well as how to get all the data points that I needed. First thing I realized was that I needed the data in a more accessible way than making thousands of API calls every time I wanted to load a graph. There is no way to do aggregations easily with the Perenual API. I prompted Co-Pilot to generate a python script that goes through and scrapes the api once and perform various calculations on it. This was then stored in a .json file for later use for my graphs.
>
> After I got the data in the format I needed I used [Chart.js](https://react-chartjs-2.js.org) [Radar Chart](https://www.chartjs.org/docs/latest/charts/radar.html) and Bar Chart (example from Caterina using the star wars swapi API) to show plant data. 
>
> Part of this process was also realizing the data was not very clean at all. I had to pivot certain ideas of data representation due to the time it would take to get the data in a usable form.
>
> colors for Bar chart: https://www.schemecolor.com/spring-monochromatic.php

Search pagination and plant session
> I implemented [bootstrap pagination](https://getbootstrap.com/docs/4.0/components/pagination/) since the API only returns 30 plants per-page. 
> [Image references](https://react-bootstrap.netlify.app/docs/components/images/) 

Refinement session
> During this session I spent time going through each file and page to refine the style by removing unnecessary elements, completing others, and resolving errors. This involved removing old code, unused variables, and fixing type errors.

deployment session
> When I attempted to deploy the first time using GitHub pages, it broke. One, because I had not resolved my errors prior to attempting, but two, because GitHub pages requires statics pages, not server-side rendered pages. So I needed to update react router to use hashrouter.  
> npm run deploy

Accessability session
Using wave, I stepped through the pages to see where I could improve. There we some typical headings and alt text errors. However, one of the warnings had to do with the alternate text on my cards which are the listed results from a search query. The alt text was the common name of the plant and the error is: "Suspicious alternative text. Alternative text is likely insufficient or contains extraneous information". I disagree with this and didn't see a way to fix it easily. 

On the page the displays the graphs I am getting this axe core error "[role="img"] elements must have alternative text https://dequeuniversity.com/rules/axe/4.11/role-img-alt?application=axeAPI". Some fixes I found did not resolve the error but I updated the aria labels regardless.

# Accessing the dashboard
>The Plantify dashbaord is deployed on GitHub pages here. To access the development version of it you can: 
>>`npm run dev`
>
>and include and additional `/#` to the url the first time you launch it.

to make updates the the deployment link. run `npm run deploy`
