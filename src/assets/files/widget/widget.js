const animationDuration = 2000;
const frameDuration = 1000 / 60;
const totalFrames = Math.round( animationDuration / frameDuration );
const easeOutQuad = t => t * ( 2 - t );

const animateCountUp = el => {
	let frame = 0;
	const countTo = parseInt( el.innerHTML, 10 );
	const counter = setInterval( () => {
		frame++;
		const progress = easeOutQuad( frame / totalFrames );
		const currentCount = Math.round( countTo * progress );
		if ( parseInt( el.innerHTML, 10 ) !== currentCount ) {
			el.innerHTML = currentCount;
		}
		if ( frame === totalFrames ) {
			clearInterval( counter );
		}
	}, frameDuration ); 
};

const runAnimations = () => {
	const countupEls = document.querySelectorAll( '.gfp-widget.animated .countup' );
	countupEls.forEach( animateCountUp );
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function getCounters() {
	//let path = 'http://localhost:5666/api/';
	//let path = 'https://devapi.greenfutureproject.com:9443/api/';
	let path = 'https://api.greenfutureproject.com:8443/api/';
	
	// Public
    //let url = 'https://api.greenfutureproject.com:9443/api/public/counters';
	let authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55IjoiR2F0ZURldiIsInByb2plY3QiOiJHcmVlbiBGdXR1cmUgUHJvamVjdCIsInNpdGUiOiJwdWJsaWMiLCJpZCI6LTIyMDcsImlhdCI6MTUxNjIzOTAyMn0.Dm3v1gqv-PrClFKyW95_Ce0ODXlEuggRdWr9u24GFB8'
	
	// B2C
	//let url = 'https://api.greenfutureproject.com:8443/api/users/aa3090d158f44c329b53388b549019eb/counters'

	let id = '###ID###';
	
	let url = path + 'companies/' + id + '/counters';
	
	try {
        let res = await fetch(url, { 
			method: 'get', 
			headers: new Headers({
				'Authorization': authorization, 
			}), 
		});
		return await res.json();
    } catch (error) {
        console.log(error);
    }
	return;
}

async function renderCounters() {
	let response = await getCounters();
	var impacts = document.querySelectorAll('.impact');
	var loaders = document.querySelectorAll('.lds-ellipsis');
	for (var i=0;i<loaders.length;i++) {
	  var impact = impacts[i];
	  var loader = loaders[i];
	  loader.classList.add('hidden')
	  impact.classList.remove('hidden')
	}
	if (response.success) {
		// Public
		//document.querySelector('.gfp-widget .impact.trees .countup').innerText = response.data.trees;
		//document.querySelector('.gfp-widget .impact.acres .countup').innerText = response.data.acres;
		//document.querySelector('.gfp-widget .impact.co2 .countup').innerText = response.data.tons;
		
		// B2C & B2B
		document.querySelector('.gfp-widget .impact.trees .countup').innerText = response.data.restoration.unit;
		document.querySelector('.gfp-widget .impact.acres .countup').innerText = Math.round(response.data.preservation.unit * 10000 * 100) / 100;
		
		let co2 = 0;
		co2 += response.data.restoration.certified;
		co2 += response.data.restoration.notCertified;
		co2 += response.data.preservation.certified;
		co2 += response.data.preservation.notCertified;
		co2 += response.data.renewable_energy.certified;
		co2 += response.data.renewable_energy.notCertified;
		co2 += response.data.marine_restoration.certified;
		co2 += response.data.marine_restoration.notCertified;
		document.querySelector('.gfp-widget .impact.co2 .countup').innerText = Math.round((co2 / 1000) * 100) / 100;
		runAnimations();
	}
	return response;
}

var counters = renderCounters();