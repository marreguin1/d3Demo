//execute script when window is loaded
window.onload = function(){
    //svg dimension variables
    var w = 900, h = 500;
    
    //container block
    var container = d3.select("body") // get body element from  DOM
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("class", "container")
        .style("background-color", "rgba(0,0,0,0.2)");
    
    //innerRect block
    var innerRect = container.append("rect") // put a new rectangle in the svg
        .datum(400)
        .attr("width", function(d){
            return d * 2; //400 * 2 = 800
        })
        .attr("height", function(d){
            return d; //400
        })
        .attr("class", "innerRect")//class name
        .attr("x", 50)//position from left on x (horizontal) axis
        .attr("y", 50) //position on y (vertical) axis
        .style("fill", "#FFFFFF"); //fill color
    
    
    
    //assigning array of city data to cityPop variable
    //used in circles block
    var cityPop = [
        {
            city: 'Sacramento',
            population: 466488
        },
        {
            city: 'San Francisco',
            population: 870887
        },
        {
            city: 'Modesto',
            population: 312842
        },
        {
            city: 'San Jose',
            population: 945942
        }
    ];
    
    
    
    //find the minimum value of the array
    var minPop = d3.min(cityPop, function(d){
        return d.population;
    });

    //find the maximum value of the array
    var maxPop = d3.max(cityPop, function(d){
        return d.population;
    });

    //scale for circles center y coordinate
    var y = d3.scaleLinear()
        .range([450, 50])
        .domain([0,1200000]);
    
    var x = d3.scaleLinear() //create the scale
        .range([95,1000]) //output min and max
        .domain([0,4.5]); //input min and max
    
    //assign color scheme based on range of colors and domain of minimum and maximum population
    var color = d3.scaleLinear()
        .range([
            "#FDBE85",
            "#D94701"
        ])
        .domain([
            minPop,
            maxPop
        ]);

    //create y axis generator
    var yAxis = d3.axisLeft(y)
        .scale(y)
        //.orient("left");
    
    //create axis g element and add axis
    var axis = container.append("g")
        .attr("class","axis")
        .attr("transform", "translate(50, 0)")
        .call(yAxis);
    
    //create title
    var title = container.append("text")
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("x", 450)
        .attr("y", 30)
        .text("City Populations");
    
    //create circle labels
    var labels = container.selectAll(".labels")
        .data(cityPop)
        .enter()
        .append("text")
        .attr("class", "labels")
        .attr("text-anchor", "left")
        .attr("y", function(d){
            //vertical position of circle labels
            return y(d.population) + 0;
        });

    //first line of circle labels
    var nameLine = labels.append("tspan")
        .attr("class", "nameLine")
        .attr("x", function(d,i){
            //horizontal position of first circle label to the right of each circle
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .text(function(d){
            return d.city;
        });

    //create format generator
    //create a variable assigned to a comma for formatting numbers
    var format = d3.format(",");

    //Second line of circle labels
    var popLine = labels.append("tspan")
        .attr("class", "popLine")
        .attr("x", function(d,i){
            //horizontal position of second circle label to the right of each circle
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .attr("dy", "18") //vertical offset... data y axis offset of labels
        .text(function(d){
            return "Pop. " + format(d.population); //use format generator to format numbers
        });
    
    //new circles block
    var circles = container.selectAll(".circles") //always pass the block's name as a class selector to the .selectAll() method when creating an empty selection
        .data(cityPop)//feed in array
        .enter() //this joins the data to the selection. It takes no parameters.
        .append("circle") //add a circle for each datum
        .attr("class", "circles") //apply class name of "circles" to all circles
        .attr("id", function(d){ //circle radius
            //console.log("d:", d, "i:", i); //take a look at d (datum) and i (index)
            return d.city;
        })
        .attr("r", function(d){ //calculate the radius based on pop value as circle area
            var area = d.population * 0.01;
            return Math.sqrt(area/Math.PI);
        })
        .attr("cx", function(d, i){ //use the index to place each circle horizontally
            return 90 + (i * 180);
        })
        .attr("cy", function(d){
            //subtract value from 450 to 'grow' circles up from the bottom instead of down from the top of the svg
            return 450 - (d.population * 0.0005);
        })
        .attr("cx", function(d,i){
            return x(i);
        })
        .attr("cy", function(d){
            return y(d.population);
        })
        .style("fill", function(d){
            return color(d.population);
        })
        .style("stroke", "#000");
};



