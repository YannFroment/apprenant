# Apprenant

Application de support d'enseignement à destination d'adultes en situation d'illettrisme.

## Installer les dépendances

### Frontend :

`docker-compose run --rm frontend npm install`

### Backend :

`docker-compose run --rm backend npm install`

## Lancer l'application en local

`docker-compose up`

## Lancer les tests

### Frontend :

`docker-compose run --rm frontend npm run test`

### Backend :

- `docker-compose run --rm backend npm run test` tests unitaires
- `docker-compose run --rm backend npm run test:e2e` tests end-to-end

## Compiler

### Frontend :

`docker-compose run --rm frontend npm run build`

### Backend :

`docker-compose run --rm backend npm run build`
