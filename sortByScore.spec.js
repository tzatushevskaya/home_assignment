describe ('Cypress Tests', () => {
let text;
let scoreContents = [];
it('Sorting by score test', () => {
	cy.fixture('cypressTest').then(data => {
		cy.log('Go to page')
		cy.visit(data.main_url)
		cy.get('#sort-select').select('Impact score');

	function getCellTextAsArray() {
		return new Cypress.Promise(resolve => {
			cy.get('div[class="table"]')
				.find('div[class="table-data data-averageImpact"]').each(($el) => {
							scoreContents.push(parseFloat($el.text()));
				})
		.then(() => resolve(scoreContents));
	})
				
}	
		cy.log('Validate results')
		getCellTextAsArray().then(scoreContents => {
			let actual = scoreContents.slice();
			cy.log(JSON.stringify(scoreContents))
			cy.log(JSON.stringify(scoreContents.sort(function(a,b) {return a>b})))
			cy.wrap(actual).should("deep.eq", scoreContents.sort(function(a,b) {return a>b}));
		});
		
	})
})
});