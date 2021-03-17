describe ('Cypress Tests', () => {
let text;
const sortBy = ['low', 'medium', 'high']
let complexityContents = [];
it('Sorting by complexity test', () => {
	cy.fixture('cypressTest').then(data => {
		cy.log('Go to page')
		cy.visit(data.main_url)
		cy.get('#sort-select').select('Complexity');

	function getCellTextAsArray() {
		return new Cypress.Promise(resolve => {
			cy.get('div[class="table"]')
				.find('div[class="table-data data-complexity"]').each(($el) => {
							complexityContents.push($el.text());
				})
		.then(() => resolve(complexityContents));
	})
				
}	
		cy.log('Validate results')
		getCellTextAsArray().then(complexityContents => {
			let actual = complexityContents.slice();
			cy.log(JSON.stringify(complexityContents))
			cy.log(JSON.stringify(complexityContents.sort((a, b) => sortBy.indexOf(a.CODE) - sortBy.indexOf(b.CODE))))
			cy.wrap(actual).should("deep.eq", complexityContents.sort((a, b) => sortBy.indexOf(a.CODE) - sortBy.indexOf(b.CODE)));
		});
		
	})
})
});