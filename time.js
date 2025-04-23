setInterval(function(){
    const d = new Date;
    document.getElementById("timer").innerHTML = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;
}, 200);