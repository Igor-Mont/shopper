db = db.getSiblingDB('shopper-api');
db.createCollection('measurements');
db.createUser({
  user: 'user',
  pwd: 'passwd',
  roles: [{ role: 'readWrite', db: 'shopper-api' }],
});
