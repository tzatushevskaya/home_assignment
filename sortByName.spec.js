describe ('Cypress Tests', () => {
let text;
let nameContents = [];
it('Sorting by name test', () => {
	cy.fixture('cypressTest').then(data => {
		cy.log('Go to page')
		cy.visit(data.main_url)
		cy.get('#sort-select').select('Name');

	function getCellTextAsArray() {
		return new Cypress.Promise(resolve => {
			cy.get('div[class="table"]')
				.find('div[class="table-data data-name"]').each(($el) => {
							nameContents.push($el.text());
				})
		.then(() => resolve(nameContents));
	})				
}	
		cy.log('Validate results')
		getCellTextAsArray().then(nameContents => {
			let actual = nameContents.slice();
			cy.log(JSON.stringify(nameContents))
			cy.log(JSON.stringify(nameContents.sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}))))
			cy.wrap(actual).should("deep.eq", nameContents.sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'})));
		});		
	})
})
});