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
    
};


