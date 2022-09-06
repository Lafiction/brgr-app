describe('login works correctly', function () {
  it('should login', function () {
    cy.visit('http://localhost:3000/login');
    cy.get("input[type^='email']").type('test@mail.com');
    cy.get("input[type^='password']").type('123456');
    cy.get('button').contains('Войти').click();
    cy.intercept(
      'POST',
      'api/auth/user', 
      { fixture: 'user.json' }
    );
  });
});

describe('burger constructor page renders correctly', function () {
  it('should render burger constructor page', function () {
    cy.visit('http://localhost:3000');
    cy.contains('Соберите бургер');
    cy.contains('Булки');
    cy.contains('Соусы');
    cy.contains('Начинки');
    cy.get('button').contains('Оформить заказ').should('be.disabled');
  });
});

describe('routes works correctly', function () {
  it('should open feed page by clicking the feed link', function () {
    cy.get('a').contains('Лента заказов').click();
    cy.contains('Лента заказов');
  });
});

describe('ingredient details modal works correctly', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  it('should open ingredient details modal', function () {
    cy.get('*[class^="burger-ingredients_description"]').first().click();
    cy.contains('Детали ингредиента');
  });

  it('should close ingredient details modal', function () {
    cy.get('[class^="modal-overlay"]').first().click({force: true});
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('drag ang drop works correctly', function () {
  it('should drag and drop bun to constructor', function () {
    cy.get('[class^=burger-constructor_buns]').as('bunsContainer');
    cy.get('[class^=burger-ingredient]').contains('Краторная булка N-200i').as('bun');
    cy.get('@bun').trigger('dragstart');
    cy.get('@bunsContainer').trigger('drop');
  });

  it('should drag and drop sauces to constructor', function () {
    cy.get('[class^=burger-constructor_ingredient]').as('sauceContainer');
    cy.get('[class^=burger-ingredients]').contains('Соус фирменный Space Sauce').as('sauce');
    cy.get('@sauce').trigger('dragstart');
    cy.get('@sauceContainer').trigger('drop');
  });

  it('should drag and drop mains to constructor', function () {
    cy.get('[class^=burger-constructor_ingredient]').as('fillingContainer');
    cy.get('[class^=burger-ingredient]').contains('Мясо бессмертных моллюсков Protostomia').as('filling');
    cy.get('@filling').trigger('dragstart');
    cy.get('@fillingContainer').trigger('drop');
  });

  it('ingredients should be swapped', function () {
    cy.get('[class^=constructor-ingredient_elementContainer]').first().as('firstElem');
    cy.get('[class^=constructor-ingredient_elementContainer]').last().as('lastElem');
    cy.get('@lastElem').trigger('dragstart').trigger('dragleave');
    cy.get('@firstElem')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop')
      .trigger('dragend');
    cy.get('[class^=constructor-ingredient_elementContainer]').last().as('lastEl');
    cy.get('[class^=constructor-ingredient_elementContainer]').first().as('firstEl');
    cy.get('@lastEl').trigger('dragstart').trigger('dragleave');
    cy.get('@firstEl')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop')
      .trigger('dragend');
  });
});

describe('create order', function () { 
  it('should create post request with order', function () {
    cy.get('button').contains('Оформить заказ').click();
    cy.intercept(
      'POST',
       'api/orders', 
       { fixture: 'order.json' }
    );
  });
});
