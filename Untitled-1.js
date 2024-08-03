const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

d3.json(url).then(data => {
    createChart(data);
});
