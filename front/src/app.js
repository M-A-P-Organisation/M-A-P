const { ipcRenderer } = require('electron')
function home(){
	var house = document.getElementById('main_box');
	house.innerHTML = '<h1>autogrow</h1>';
	ipcRenderer.send('need-plant', 'name')
	ipcRenderer.on('plant-needed', (event, arg) => {
		console.log(arg)
		let text = document.createElement("h2")
		text.id = 'hh'
		text.textContent = "plante choisie:"
		text.textContent += arg
		try{
			var ye= document.getElementById('hh')
			house.replaceChild(text,ye);
		}
		catch(error){
			console.log(error);
			house.appendChild(text);
	}
	})
}
function humidity(){
	var house = document.getElementById('main_box');
	house.innerHTML = '<h3>humiditée:</h3>'
	house.innerHTML += '<canvas id="myChart"></canvas>'
	var ctx = document.getElementById('myChart');
	ipcRenderer.send('need-hum', 'now')
	ipcRenderer.on('humidity', (event, arg8) => {
		var vide =100-arg8
		var xValues = ["humiditée", ""];
		var yValues = [arg8, vide];
		var barColors = ["blue", "transparent"];
		new Chart(ctx, {
	  type: "doughnut",
	  data: {
	    labels: xValues,
	    datasets: [{
	      backgroundColor: barColors,
	      borderColor:'grey',
	      data: yValues
	    }]
	  },
	  options: {
	    title: {
	      display: false
	    },
	    rotation:215,
	  }
	});
	})
}
function temperature(){
	var house = document.getElementById('main_box');
	house.innerHTML = '<h3>temperature:</h3>'
	house.innerHTML += '<canvas id="myChart"></canvas>'
	var ctx = document.getElementById('myChart');
	ipcRenderer.send('temp_ultimate','tada')
	ipcRenderer.on('temp_ultimate_answerd', (event, arg5) =>{
		ipcRenderer.send('temp_one','balance la tempe now')
		ipcRenderer.on('temp_one_answerd', (event, arg) =>{ 
			ipcRenderer.send('temp_two','balance la tempe now')
			ipcRenderer.on('temp_two_answerd', (event, arg1) =>{ 
				ipcRenderer.send('temp_three','balance la tempe now')
				ipcRenderer.on('temp_three_answerd', (event, arg2) =>{ 
					ipcRenderer.send('temp_four','balance la tempe now')
					ipcRenderer.on('temp_four_answerd', (event, arg3) =>{ 
						var xValues = [0,10,20,30];
						new Chart("myChart", {
						  type: "line",
						  data: {
						    labels: xValues,
						    datasets: [{
						      data: [arg,arg1,arg2,arg3],
						      borderColor: "red",
						      fill: true
						    },{
						      data: [arg5,arg5,arg5,arg5],
						      borderColor: "black",
						      fill: false
						    }]
						  },
						  options: {
						    legend: {display: false}
						  }
						});
					})
				})
			})
		})
	})
}
home()