use('8bitstore_db');

db.createCollection("users", {
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["email", "password", "role"],
            "title": "users",
            "properties": {
                "_id": {
                    "bsonType": "string" // email
                },
                "password": {
                    "bsonType": "string"
                },
                "fullName": {
                    "bsonType": "string"
                },
                "address": {
                    "bsonType": "string"
                },
                "phoneNumber": {
                    "bsonType": "string"
                },
                "role": {
                    "bsonType": "string",
                    "enum": [
                        "admin",
                        "customer"
                    ]
                }
            },
            "additionalProperties": false,
        }
    },
    "validationLevel": "off",
});

db.createCollection("products", {
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "products",
            "properties": {
                "_id": {
                    "bsonType": "objectId" // 
                },
                "productName": {
                    "bsonType": "string"
                },
                "price": {
                    "bsonType": "number"
                },
                "stockNum": {
                    "bsonType": "number"
                },
                "manufacturer": {
                    "bsonType": "string"
                },
                "platform": {
                    "bsonType": "array",
                    "items": {
                        "bsonType": "string"
                    }
                },
                "description": {
                    "bsonType": "string"
                },
                "type": {
                    "bsonType": "string"
                },
                "genre": {
                    "bsonType": "array",
                    "additionalItems": true,
                    "items": {
                        "bsonType": "string"
                    }
                }
            },
            "additionalProperties": false,
        }
    },
    "validationLevel": "off",
});


db.createCollection("wishlists", {
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "wishlists",
            "properties": {
                "userId": {
                    "bsonType": "string" // user_id
                },
               "products": {
                    "bsonType": "array",
                    "additionalItems": true,
                    "items": {
                        "bsonType": "objectId"
                    }
                }
            },
            "additionalProperties": false,
        }
    },
    "validationLevel": "off",
});


db.createCollection("orders", {
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "orders",
            "properties": {
                "_id": {
                    "bsonType": "objectId"
                },
                "userId": {
                    "bsonType": "string"  
                },
                "product": {
                    "bsonType": "array",
                    "items": {
                        "bsonType": "object",
                        "properties": {
                            "productId": {
                                "bsonType": "objectId",
                                "bsonType": "number"
                            }
                        },
                        "additionalProperties": false
                    }
                },
                "orderDate": {
                    "bsonType": "date"
                },
                "deliveryDate": {
                    "bsonType": "date"
                },
                "status": {
                    "bsonType": "string"
                },
                "totalPrice": {
                    "bsonType": "number"
                }
            },
            "additionalProperties": false
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});

db.createCollection("carts", {
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "carts",
            "properties": {
                "userId": {
                    "bsonType": "string" //user_id
                },
                "products": {
                    "bsonType": "array",
                    "additionalItems": true,
                    "items": {
                        "bsonType": "object",
                        "properties": {
                            "amount": {
                                "bsonType": "number"
                            },
                            "productId": {                        //product_id
                                "bsonType": "objectId"
                            }
                        },
                        "additionalProperties": false
                    }
                }
            },
            "additionalProperties": false
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});

db.createCollection("reviews", {
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "reviews",
            "properties": {
                "_id": {                       
                    "bsonType": "objectId"
                },
                "userId": {
                    "bsonType": "string"
                },
                "productId": {
                    "bsonType": "objectId"
                },
                "comment": {
                    "bsonType": "string"
                },
                "reviewDate": {
                    "bsonType": "date"
                },
                "score": {
                    "bsonType": "number"
                }
                
            },
            "additionalProperties": false
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});

