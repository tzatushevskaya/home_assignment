describe ('Cypress Tests', () => {
let text;
let casesContents = [];
it('Sorting by cases test', () => {
	cy.fixture('cypressTest').then(data => {
		cy.log('Go to page')
		cy.visit(data.main_url)
		cy.get('#sort-select').select('Number of cases');

	function getVal (val) {
		let multiplier = val.substr(-1);
  		if (multiplier == "k")
    		return parseFloat(val) * 1000;
  		else if (multiplier == "M")
			return parseFloat(val) * 1000000;
		else if (multiplier == "B")
			return parseFloat(val) * 1000000000;
		else 
			return parseFloat(val);
}

	function getCellTextAsArray() {
		return new Cypress.Promise(resolve => {
			cy.get('div[class="table"]')
				.find('div[class="table-data data-cases"]').each(($el) => {
							casesContents.push(getVal($el.text()));
				})
		.then(() => resolve(casesContents));
	})
				
}	
		cy.log('Validate results')
		getCellTextAsArray().then(casesContents => {
			let actual = casesContents.slice();
			cy.log(JSON.stringify(casesContents))
			cy.log(JSON.stringify(casesContents.sort(function(a,b) {return a>b})))
			cy.wrap(actual).should("deep.eq", casesContents.sort(function(a,b) {return a>b}));
		});
		
	})
})
});