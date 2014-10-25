$(window).load(function() {

});

$("#draw").click(function() {
    var width = parseInt(document.getElementById("width").value);
    var iterations = parseInt(document.getElementById("iter").value);
    var startingCells = document.getElementsByName("cells");
    var rules = document.getElementsByName("rules");

    if (isNaN(width) || width > 10000)
    {
        width = 10000;
    }
    if (isNaN(iterations) || iterations > 10000)
    {
        iterations = 10000;
    }

    draw(width, iterations, startingCells, rules);

});

function draw(width, iter, startingCells, rawRules)
{
    var c=document.getElementById("canvas");
    var ctx=c.getContext("2d");
    var cells = makeArray(startingCells, width);
    var rules = makeArray(rawRules, rawRules.length); 
    var cellsize = setCellSize(width, iter);

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 800, 800);
    ctx.lineWidth="1";
    ctx.beginPath();

    for (var j = 0; j < iter; j++)
    {
        for (var i = 0; i < width; i ++)
        {
            ctx.fillStyle = 'black';
            if (cells[i])
            {
                ctx.fillRect(10+cellsize*i, 10+cellsize*j, cellsize, cellsize);

            } else {
                if (cellsize < 3)
                {
                    ctx.fillStyle = 'white';
                    ctx.fillRect(10+cellsize*i, 10+cellsize*j, cellsize, cellsize);
                } else {
                    ctx.rect(10+cellsize*i, 10+cellsize*j, cellsize, cellsize);
                }
            }
        }
        cells = nextIteration(cells, rules);
    }

    ctx.stroke();

}

function makeArray(rawData, size)
{
    var newArray = new Array(size);
    for (var i = 0; i < size; i++)
    {
        if (i < rawData.length && rawData[i].checked)
        {
            newArray[i] = 1;
        } else {
            newArray[i] = 0;
        }
    }
    return newArray;
}

function nextIteration(cells, rules)
{
    var newCells = new Array(cells.length);
    for (var i = 0; i < cells.length; i++)
    {
        var state = 0;
        for (var j = 2; j >= 0; j--)
        {
            var index = i-(j-1);
            if (index < 0 || index >= cells.length) //if at edge of graph
            {
                if (document.getElementById("wraparound").checked)
                {
                    if (index < 0) {
                        state += cells[cells.length-1]*4;
                    } else {
                        state += cells[0];
                    }
                }
                // if not wrapping around, do nothing

            } else {    // if not at edge
                state += cells[index]*Math.pow(2, j);
            }
        }
        newCells[i] = rules[state];
    }
    
    return newCells;
}

function setCellSize(width, height)
{
    if (width > 1000 || height > 1000)
    {
        return 2;
    }
    if (width > 300 || height > 300)
    {
        return 3;
    }
    if (width > 20 || height > 20)
    {
        return 5;
    }
    return 10;

}
