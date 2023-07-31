# users-frontend

## Subir o frontend
```
docker compose up
```

## Rodar os testes E2E:

Importante: você precisa ter a imagem do backend localmente para que funcione, baixe o api-users e gera a imagem docker

```
docker compose -f cypress/docker-compose.yaml run cypress
```

Para rodar um arquivo específico, faça o seguinte:

```
docker compose -f cypress/docker-compose.yaml run cypress --spec /e2e/foobar.cy.ts
```