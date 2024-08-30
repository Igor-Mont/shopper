### Teste técnico SHOPPER

#### Princípios utilizados

- S.O.L.I.D
- DRY (Don't repeat yourself)

#### Design Patterns utilizados:

- Adapter
- Dependency Injection
- Factory

### libs e tools utilizadas

- Nodejs
- Typescript
- Docker
- Jest
- MongoDB
- Validator
- Express
- tsx
- tsup

### Observações

- É válido lembrar que para alguns requisitos pedidos no teste técnico foi preciso adaptar alguns recursos para suprir as interfaces de retorno.
- Como não foi relatado o tipo de imagem que iria receber no endpoint pedi para o GEMINI capturar o valor e depois tiro os 3 dígitos finais pois a depender do medidor ele usa medidas diferentes, geralmente ficam em vermelho as medições em L, em algumas pesquisas vi que uns usam 2 dígitos e outros 3 dígitos então resolvi optar por remover os 3 útlimos.

- Duas imagens para teste que utilizei foram:

<img width="220" src="./images/medidor1.png" />
<img width="220" src="./images/medidor2.png" />

### Arquitetura do controller de upload (MeasurementImageController)

<img width="220" src="./images/architecture_measurement_image.jpeg" />
