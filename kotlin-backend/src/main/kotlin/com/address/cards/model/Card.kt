package com.address.cards.model

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "cards")
data class Card(
    @Id
    val id: String = ObjectId.get().toString(),
    val address: ArrayList<String>,
    val cardId: String = System.currentTimeMillis().toString()
)
