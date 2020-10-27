// Create function to data plotting and Use D3 fetch to read the JSON file

function getPlot(id) {
    d3.json("data/samples.json").then((data) => {
        console.log(data)

        var wfreq = data.metadata.map(d => d.wfreq)
        console.log (`Washing Frequency: ${wfreq}`)

        // Filter by id
        var samples = data.samples.filter(s =>s.id.toString() === id)[0];
        console.log(samples);

        // Get the top 10
        var samplevalues = samples.sample_values.slice(0,10).reverse();
        //   console.log(`Sample Values: ${samplevalues}`)

        // Get top 10 otu ids and reverse
        var OTU_top = (samples.otu_ids.slice(0,10)).reverse();
        //   console.log(`Id Values: ${OTU_top}`)

        // Get otu id's form for plot
        var OTU_id = OTU_top.map(d =>"OTU " + d);
        // console.log(`OTU IDS: ${OTU_id}`)

        // Get top 10 labels for plot
        var labels =samples.otu_labels.slice(0,10);
       

        // Create trace
        var trace = {
            x: samplevalues,
            y: OTU_id,
            text: labels,
            marker: {
                color: "red",
                type: "bar",
                orientation: "h"
            }
        };
        
        // Create data variable
        var data = [trace];

        // Create layout
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode: "linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

        // Create the bar plot
        Plotly.newPlot("bar",data,layout);

        // Create bubble chart
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
        };

        // set bubble plot layout
        var layout_bubble = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };

        // Create data variable
        var data_bubble = [trace1];
        
        // create the function to get the necessary data
        function getInfo(id) {
            // read the json file to get data
            d3.json("Data/samples.json").then((data)=> {
                // get the metadata info for the demographic panel
                var metadata = data.metadata;
                console.log(metadata)

                // filter meta data info by id
                var result = metadata.filter(meta => meta.id.toString() === id)[0];
                
                // select demographic panel to put data
                var demographicInfo = d3.select("#sample-metadata");
                
                // empty the demographic info panel each time before getting new id info
                demographicInfo.html("");
                
                // grab the necessary demographic data data for the id and append the info to the panel
                Object.entries(result).forEach((key) => {   
                    demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n"); 
                });
            });
            
    // create the function for the change event
    function optionChanged(id) {
        getPlot(id);
        getInfo(id);
    }
    
    // create the function for the initial data rendering
    function init() {
        // select dropdown menu 
        var dropdown = d3.select("#selDataset");
        
        // read the data 
        d3.json("Data/samples.json").then((data)=> {
            console.log(data)
            
            // get the id data to the dropdwown menu
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
            
            // call the functions to display the data and the plots to the page
            getPlot(data.names[0]);
            getInfo(data.names[0]);
        });
    }
        }

init();