Cypress.Commands.add('createBlog', (blog) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: blog,
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('currentUserInfo')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('login', (user) => {
  cy
    .request({
      url: 'http://localhost:3003/api/login',
      method: 'POST',
      body: user,
    })
    .then(function(response) {
      localStorage.setItem('currentUserInfo', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
    })
})

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'stellar',
      username: 'stellarloony',
      password: 'p@$$w0rd'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Log In')
  })

  describe('Log In', function () {
    it('login success with correct credentials', function () {
      cy.contains('Log In').click()

      cy
        .get('form')
        .get('input:first').type('stellarloony')
        .get('input:last').type('p@$$w0rd')
        .get('button')
        .contains('Login')
        .click()
    })

    it('login fails with wrong credentials', function () {
      cy.contains('Log In').click()

      cy
        .get('form')
        .get('input:first').type('stellarloony')
        .get('input:last').type('p@$$w0')
        .get('button')
        .contains('Login')
        .click()

      cy
        .contains('invalid username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')

    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      const user = {
        username: 'stellarloony',
        password: 'p@$$w0rd'
      }
      cy.login(user)

      const newUser = {
        name: 'user2',
        username: 'user2',
        password: 'user2'
      }
      cy.request('POST', 'http://localhost:3003/api/users', newUser)
    })

    it('A blog can be created', function() {
      cy.contains('Create a blog').click()

      cy
        .get('#title').type('Cypress Title')
        .get('#author').type('Cypress Author')
        .get('#url').type('http://localhost/url.com')

      cy.get('form').submit()

      cy
        .get('.header')
        .contains('Cypress Title, by Cypress Author')

    })

    describe('and a blog exists', function() {
      beforeEach(function () {
        cy.createBlog({
          title: 'first title',
          author: 'first author',
          url: 'http://localhost/first-url.com'
        })

        cy.createBlog({
          title: 'second title',
          author: 'second author',
          url: 'http://localhost/second-url.com'
        })

        cy.createBlog({
          title: 'third title',
          author: 'third author',
          url: 'http://localhost/third-url.com'
        })
      })

      it('user can like a blog', function() {
        cy
          .contains('View')
          .click()

        cy
          .get('.likes')
          .eq(0)
          .contains('Likes: 0')

        cy
          .contains('Like')
          .click()

        cy
          .get('.likes')
          .eq(0)
          .contains('Likes: 1')

      })

      it('user who created the blog can delete it', function () {
        cy
          .get('.deleteBtn')
          .eq(1)
          .click()
      })

      it('user who did not create the blog can not delete it', function () {
        cy
          .contains('Logout')
          .click()

        cy.login({ username: 'user2', password: 'user2' })

        cy
          .get('.deleteBtn')
          .eq(1)
          .click()

        cy.contains('current user does not have permission to delete this blog')
      })

      it.only('blogs are ordered by number of likes, blog with the most likes being the first', function () {
        cy.get('.viewButton')
          .each((view) => {
            view[0].click()
            console.log('view', view)
          })
      })
    })
  })

})