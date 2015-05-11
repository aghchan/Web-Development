<script>

var callbackFunction = function(data) {
    var cond = data.query.results.channel.item.condition;
    var temp = cond.temp;
    alert("Temperature:"+temp);
    var weather = temp.text;
    
    document.getElementById("temperature").innerHTML = temp;
    document.getElementById("weather").innerHTML = weather;
}

</script>
