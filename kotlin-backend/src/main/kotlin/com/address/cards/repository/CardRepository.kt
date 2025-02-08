package com.address.cards.repository

import com.address.cards.model.Card
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface CardRepository : MongoRepository<Card, String> {
    fun findByCardId(cardId: String): Card?
    fun findByAddressRegex(address: String): List<Card>
}
