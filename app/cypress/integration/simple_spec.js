describe('Login Path Test', function() {
    it('Clicks on the login button', function() {
    //   expect(true).to.equal(true)
      cy.visit('/')
      cy.contains('Login').click()
    })
  })

  describe('URL Test', function() {
    it('should be a new url', function() {
    //   expect(true).to.equal(true)
    cy.url().should('include', '/login')
    })

  })

  describe('Username Test', function() {
      it('Should Login', function() {
        cy.get('input[placeholder=username]').type('j')
      })
  })
  describe('Password Test', function() {
      it('Should Login', function() {
        cy.get('input[placeholder=password]').type('j')
      })
  })

  describe('Test Login', function() {
      it('Should Login', function() {
          cy.get('button').contains('Login').click({force:true})
      })
  })

  describe('Profile is there', function() {
    it('Should be on Profile', function() {
      cy.url().should('include', '/profile')
    })
  })