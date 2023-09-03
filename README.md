# point-da-larica-node
Uma aplicação para gerenciar vendas
# Apresentação da Api

Hoje, gostaria de apresentar nosso aplicativo de registro de vendas presenciais, uma solução dedicada para gerenciar vendas em ambientes físicos, como mercados e lojas. Esta API foi desenvolvida para simplificar o processo de registro de vendas e garantir que as informações estejam acessíveis apenas para as pessoas autorizadas.

Há uma coisa que gostaria de pontuar, a aplicação foi criada para registrar vendas de produtos de modo presencial, então isso não é uma API para um E-commerce. A API não conta com um formato de pagamento, pois não achei nenhuma biblioteca que fosse compatível com a ideia da mesma. Ainda assim, o software faz o que se propõe que é: registrar vendas.

## Bibliotecas Usadas

- Multer
- Dotenv
- Typeorm
- Tsyringe
- Nodemailer
- Express
- Express-validator
- Jest
- Typescript
- Express-async-errors
- Cors
- Excel4node
- Uuid

## Controle de Acesso

Esta aplicação conta com um sistema de Controle de Acesso de Usuários, que desempenha um papel vital na segurança e na eficiência do sistema. Uma estratégia de Controle de Acesso é essencial para manter a integridade dos dados e garantir que apenas os usuários autorizados tenham acesso às informações pertinentes.

Com controle de acesso, aprendi conceitos importantes:

- Aprimoramento da Segurança: O RBAC oferece um nível avançado de segurança, permitindo que os administradores definam permissões específicas com base em papéis e responsabilidades. Isso reduz consideravelmente a superfície de ataque e previne acesso não autorizado a áreas críticas do sistema.

- Adaptação à Evolução: À medida que a aplicação evolui, o RBAC facilita a incorporação de novos papéis e ajustes nas permissões. Isso permite que a aplicação cresça de maneira organizada e segura.

- Redução de Erros: A atribuição clara de funções e permissões minimiza erros humanos. Isso é crucial em ambientes onde a precisão e a segurança são fundamentais.

- Flexibilidade Controlada: O sistema RBAC permite a personalização de papéis e permissões de acordo com as necessidades específicas da aplicação. Isso possibilita ajustes precisos e adaptações sem comprometer a estrutura geral do controle de acesso.

Em resumo, a implementação do RBAC oferece um alicerce sólido para o controle de acesso. Ele equilibra eficiência com segurança, permitindo que os usuários certos acessem as informações apropriadas no momento certo. Essa abordagem contribui para a confiança dos usuários e a integridade geral da aplicação.

## Alguns Pontos Interessantes a se Observar nessa Aplicação

### Cartão Cortesia

Na aplicação, temos o cartão cortesia que serve para caso o cliente tenha qualquer prejuízo em relação a uma compra. Criar um cartão destes fica a cargo do empregado que tiver a permissão "create_courtesy". O cartão é gerado com 4 caracteres, sendo eles, números e letras.

### Criação de Usuário

A criação do usuário só pode ser feita por quem tiver a permissão "create_user". Ao criar o usuário, a senha do mesmo será criada automaticamente pela aplicação. Com a conta do empregado criada, um e-mail será enviado para o mesmo com suas credenciais. Como a senha é gerada pelo sistema, fica a critério do empregado, mudá-la ou não pelo endpoint de "forget-password".

### Horário de Funcionamento

A aplicação conta com horário de funcionamento, que pode ser definido em um arquivo .env. Somente o empregado que tiver a role "admin" pode mexer no sistema fora do horário de trabalho.

### Geração de Relatório

O endpoint "generate_report" da rota "orders" permite a geração de uma planilha de Excel com um resumo das vendas da semana. Além disso, a planilha é enviada por e-mail aos destinatários relevantes.
