var svg = d3.select("svg");
var width = +svg.attr("width");
var height = +svg.attr("height");
var radius = Math.min(width, height) / 2;
g = svg.append("g")
	.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var pie = d3.pie()
	.sort(null)
	.value(d => {
		// return d.name + ":" + d.value;
		return d.value;
	});

var path = d3.arc()
	.outerRadius(radius - 10)
	// .cornerRadius(15)
	.innerRadius(0);

var label = d3.arc()
	.outerRadius(radius - 40)
	.innerRadius(radius - 40);

d3.csv("data", d => {
	// parse csv
	d.name = d.name;
	d.value = +d.value;
	return d;
	}, (err, data) => {
		// draw arcs
		if(err) throw err;
		var arc = g.selectAll(".arc")
			.data(pie(data))
			.enter().append("g")
			.attr("class", "arc");

		arc.append("path")
			.attr("d", path)
			.attr("fill", selectColor)

		arc.append("text")
			.attr("transform", d => {
				return "translate(" + label.centroid(d) + ")";
			})
			.attr("dy", ".35em")
			.text(d => {
				return d.data.name;
			})
	});


var currColor = 0;
function selectColor() {
	var result = color(currColor);
	currColor++;
	if(currColor > 6)
		currColor = 0;
	return result;
}