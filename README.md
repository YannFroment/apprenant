# Apprenant

Application de support d'enseignement à destination d'adultes en situation d'illettrisme.

## Installer Make sur son OS préféré

```bash
# linux
sudo apt-get install build-essential

# mac
brew install make

```

## Installer les dépendances

### Frontend :

`docker-compose run --rm frontend npm install`

### Backend :

`docker-compose run --rm backend npm install`


## Lancer l'application en local

`make up`

## Lancer les tests

### Frontend :

`docker-compose run --rm frontend npm run test`

### Backend :

- `docker-compose run --rm backend npm run test` tests unitaires
- `docker-compose run --rm backend npm run test:e2e` tests end-to-end

## Base de données :

### Réinitialiser la base de données

Va supprimer toutes les tables, exécuter toutes les migrations et créer un jeu de données initial (seed de base de données)

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
