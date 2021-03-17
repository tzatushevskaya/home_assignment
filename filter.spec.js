describe ('Cypress Tests', () => {
let text;

it('Filter test', () => {
	cy.fixture('cypressTest').then(data => {
		cy.log('Go to page')
		cy.visit(data.main_url)
		cy.get('div[class="table"]')
			.find('div[class="table-data data-name"]').first().then(($cell) => { const txt = $cell.text()
			cy.get('#filter-input').type(txt)
			text = txt
			})
		
		cy.log('Validate results')
		cy.get('div[class="table"]')
		.find('div[class="table-data data-name"]')
		.then(cells => {
			cells.each((_, cell) => {
				expect(cell).to.have.text(text);
			});
		})

	})
})
});