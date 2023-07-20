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

## Base de données :

### Réinitialiser la base de données

Va supprimer toutes les tables, exécuter toutes les migrations et lancer le seeder

`docker-compose run --rm backend npm run purge:db`

### Générer une migration

`docker-compose run --rm backend npm run typeorm migration:generate ./src/persistence/migrations/<NomDeMigration>`

### Lancer les migrations

`docker-compose run --rm backend npm run migration:run`

## Compiler

### Frontend :

`docker-compose run --rm frontend npm run build`

### Backend :

`docker-compose run --rm backend npm run build`
