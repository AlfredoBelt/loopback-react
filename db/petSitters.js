use petsitters

db.createCollection("reviews")

db.reviews.insertOne({
    "petSitterId": 3,
    "ratting": 5,
    "comments": "es un gran cuidador de perros"})
    
db.reviews.find()

db.reviews.deleteMany({"ratting": 5})
db.review.drop()