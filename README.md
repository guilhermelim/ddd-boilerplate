# DDD Boilerplate

DDD Boilerplate é um template inicial para o desenvolvimento de aplicações seguindo os princípios de Domain-Driven Design (DDD) e Clean Architecture. Este projeto fornece uma estrutura base para construir aplicações escaláveis e bem organizadas, utilizando as melhores práticas de DDD e Clean Architecture. O projeto apresenta um exemplo simples de um eCommerce, onde é possível cadastrar clientes (customers), produtos (products) e encomendas (orders). No entanto, não é uma aplicação completa, mas sim um template para servir de inspiração em seus projetos. O código é extremamente bem organizado e construído seguindo os princípios do SOLID, evitando acoplamentos fortes.

## Benefícios da Integração DDD e Clean Architecture

A integração de Domain-Driven Design (DDD) e Clean Architecture oferece uma abordagem robusta para a construção de sistemas complexos e escaláveis. No livro "Clean Architecture", Robert Martin define a camada de entidades como responsável por conter as regras de negócio da empresa (Enterprise Business Rules). No entanto, ele não detalha extensivamente como implementar essas regras de negócio. É aqui que o DDD, conforme descrito por Eric Evans, se torna essencial, fornecendo um design e uma arquitetura claros para a implementação dessas regras de negócio.

É importante notar que a camada de entidades do DDD não é a mesma que a camada de entidades da Clean Architecture. Ao combinar Clean Architecture com DDD, a camada de entidades da Clean Architecture corresponde aos módulos de domínio do DDD, que incluem agregados de entidades de domínio, objetos de valor, repositórios de domínio, serviços de domínio e fábricas. Essa integração resulta em uma estrutura modular e bem definida, que facilita a manutenção e a escalabilidade do sistema.

Dessa forma, os desenvolvedores podem aproveitar os princípios do SOLID para garantir um código limpo e desacoplado, enquanto a orientação a DDD oferece uma base sólida para modelar e gerenciar a complexidade do domínio do negócio. A separação de interesses e a modularidade promovidas por Clean Architecture, combinadas com a riqueza de comportamento e foco no domínio do DDD, criam uma sinergia poderosa que conduz a um desenvolvimento de software mais eficiente e sustentável.

## Aviso

Os recursos e tecnologias descritos neste repositório estão em constante desenvolvimento. No estágio atual, o código boilerplate com os recursos de Domain-Driven Design (DDD) já está disponível. No entanto, ainda estamos trabalhando na implementação completa das camadas de Clean Architecture no projeto. Por favor, acompanhe o progresso do projeto para futuras atualizações e melhorias contínuas.

## Recursos

- **Estrutura Modular:** Baseada em contextos delimitados (Bounded Contexts), permitindo uma separação clara entre diferentes áreas do domínio.
- **Integração de DDD e Clean Architecture:** Proporciona uma maior separação de interesses, facilitando a manutenção e a escalabilidade do sistema.
- **Entidades Ricas:** Entidades com comportamento complexo e focadas no domínio, seguindo os princípios do DDD.
- **Repositórios e Agregados:** Bem definidos para assegurar consistência e encapsulamento das regras de negócio.
- **Princípios SOLID:** Código estruturado seguindo os princípios SOLID, garantindo baixa acoplação e alta coesão.
- **Configuração Inicial:** Inclui dependências e ferramentas comuns, como TypeScript, Jest e Docker, para facilitar o desenvolvimento e o deploy.

## Tecnologias

- Node.js
- TypeScript
- Express.js
- TypeORM
- Jest (para testes unitários)
- Docker (para desenvolvimento e deploy)

## Estrutura do Projeto

- **domain**: Contém a lógica central do negócio e é dividida em diferentes contextos delimitados (Bounded Contexts).
  - **@shared**: Componentes compartilhados entre diferentes contextos.
    - **event**: Implementações relacionadas ao sistema de eventos do domínio.
      - `event-dispatcher.interface.ts`: Interface para o despachante de eventos.
      - `event-dispatcher.ts`: Implementação do despachante de eventos.
      - `event-handler.interface.ts`: Interface para manipuladores de eventos.
      - `event.interface.ts`: Interface base para eventos de domínio.
    - **repository**: Interfaces para repositórios genéricos.
      - `repository-interface.ts`: Interface para um repositório genérico.
  - **checkout**: Contexto relacionado a pedidos e processos de checkout.
    - **entity**: Entidades do domínio relacionadas a pedidos.
      - `order.ts`: Implementação da entidade Pedido.
      - `order_item.ts`: Implementação da entidade Item de Pedido.
    - **factory**: Fábricas para criar instâncias de entidades.
      - `order.factory.ts`: Implementação da fábrica de pedidos.
    - **repository**: Interfaces de repositórios específicas para pedidos.
      - `order-repository.interface.ts`: Interface do repositório de pedidos.
    - **service**: Serviços de domínio relacionados a pedidos.
      - `order.service.ts`: Implementação do serviço de pedidos.
  - **customer**: Contexto relacionado a clientes.
    - **entity**: Entidades do domínio relacionadas a clientes.
      - `customer.ts`: Implementação da entidade Cliente.
    - **factory**: Fábricas para criar instâncias de entidades.
      - `customer.factory.ts`: Implementação da fábrica de clientes.
    - **repository**: Interfaces de repositórios específicas para clientes.
      - `customer-repository.interface.ts`: Interface do repositório de clientes.
    - **value-object**: Objetos de valor relacionados a clientes.
      - `address.ts`: Implementação do objeto de valor Endereço.
  - **product**: Contexto relacionado a produtos.
    - **entity**: Entidades do domínio relacionadas a produtos.
      - `product-b.ts`: Implementação da entidade Produto B.
      - `product.interface.ts`: Interface para produtos.
      - `product.ts`: Implementação da entidade Produto.
    - **event**: Eventos e manipuladores de eventos relacionados a produtos.
      - **handler**: Manipuladores de eventos específicos para produtos.
        - `send-email-when-product-is-created.handler.ts`: Manipulador que envia um email quando um produto é criado.
      - `product-created.event.ts`: Evento disparado quando um produto é criado.
    - **factory**: Fábricas para criar instâncias de entidades.
      - `product.factory.ts`: Implementação da fábrica de produtos.
    - **repository**: Interfaces de repositórios específicas para produtos.
      - `product-repository-interface.ts`: Interface do repositório de produtos.
    - **service**: Serviços de domínio relacionados a produtos.
      - `product.service.ts`: Implementação do serviço de produtos.

- **infrastructure**: Implementações técnicas e configurações específicas do sistema.
  - **checkout**: Implementações de repositórios para o contexto de checkout.
    - **repository**: Implementações de repositórios usando Sequelize.
      - **sequelize**: Modelos e repositórios baseados no Sequelize.
        - `model/order-item.model.ts`, `model/order.model.ts`: Modelos do Sequelize para itens de pedidos e pedidos.
        - `order.repository.ts`: Implementação do repositório de pedidos.
  - **customer**: Implementações de repositórios para o contexto de clientes.
    - **repository**: Implementações de repositórios usando Sequelize.
      - **sequelize**: Modelos e repositórios baseados no Sequelize.
        - `customer.repository.ts`: Implementação do repositório de clientes.
        - `model/customer.model.ts`: Modelo do Sequelize para clientes.
  - **product**: Implementações de repositórios para o contexto de produtos.
    - **repository**: Implementações de repositórios usando Sequelize.
      - **sequelize**: Modelos e repositórios baseados no Sequelize.
        - `model/product.model.ts`: Modelo do Sequelize para produtos.
        - `product.repository.ts`: Implementação do repositório de produtos.

- **usecase**: Casos de uso da aplicação, organizados por contexto.
  - **customer**: Casos de uso relacionados a clientes.
    - **create**: Casos de uso para criação de clientes.
      - `create.customer.dto.ts`: Interface de DTO para criação de clientes.
      - `create.customer.usecase.ts`: Implementação do caso de uso de criação de clientes.
    - **find**: Casos de uso para busca de clientes.
      - `find.customer.dto.ts`: Interface de DTO para busca de clientes.
      - `find.customer.usecase.ts`: Implementação do caso de uso de busca de clientes.
    - **list**: Casos de uso para listagem de clientes.
      - `list.customer.dto.ts`: Interface de DTO para listagem de clientes.
      - `list.customer.usecase.ts`: Implementação do caso de uso de listagem de clientes.
    - **update**: Casos de uso para atualização de clientes.
      - `update.customer.dto.ts`: Interface de DTO para atualização de clientes.
      - `update.customer.usecase.ts`: Implementação do caso de uso de atualização de clientes.

## Como Começar

1. Clone o repositório:

    ```sh
    git clone https://github.com/seu-usuario/ddd-boilerplate.git
    ```

2. Instale as dependências:

    ```sh
    cd ddd-boilerplate
    npm install
    ```

3. Configure as variáveis de ambiente (exemplo em `.env.example`)

4. Inicie a aplicação:

    ```sh
    npm start
    ```

5. Execute os testes:

    ```sh
    npm test
    ```

## Contribuindo

Contribuições são bem-vindas! Por favor, siga as diretrizes de contribuição e abra uma pull request.

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
