# Valex
### Usage

$ git clone https://github.com/NicoleJCLemes/valex

$ cd valex

$ npm install

$ npm run dev

### API:
- POST /create-card
    - Rota para a empresa criar um novo cartão
    - headers['x-api-key']: {apiKey}
    - body: {
        "employeeId": "1",
        "type": 'groceries' | 'restaurants' | 'transport' | 'education' | 'health'
    }
    
- GET /balance/:id
    - Rota para visualizar as transações
    - body: {}
    - 
- PUT /status/:id
    - Rota para bloquear e desbloquear um cartão
    - body: {
    "password": "****"
    }
    
- PUT /card/enable/:id
    - Rota para ativar um cartão
    - body: {
    "securityCode": "123",
    "password": "****"
    }
    
- POST /recharge/:id
    - Rota para a empresa recarregar o cartão para o funcionário
    - headers['x-api-key']: {apiKey}
    - body: {
        "amount": "5000",
    }
    
- POST /shopping/:id
    - Rota para o funcionário comprar com o cartão
    - body: {
    "password": "****",
    "businessId": "1",
    "amount": 200
    }
