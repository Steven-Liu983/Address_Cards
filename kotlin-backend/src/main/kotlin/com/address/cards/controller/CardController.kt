package com.address.cards.controller

import com.address.cards.model.Card
import com.address.cards.repository.CardRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = ["http://localhost:4200"], maxAge = 3600)
class CardController(private val cardRepository: CardRepository) {

    @GetMapping("/cards")
    fun getAllCards(): List<Card> =
        cardRepository.findAll()

    @GetMapping("/cards/{address}")
    fun getByAddress(@PathVariable(value = "address") address: String): List<Card> =
        cardRepository.findByAddressRegex(address)

    @PostMapping("/cards")
    fun createNewCard(@RequestBody card: Card): Card =
        cardRepository.save(card)

    @PutMapping("/cards/{id}")
    fun updateCardById(@PathVariable(value = "id") cardId: String,
                       @RequestBody newCard: Card): ResponseEntity<Card> {
        val findCard = cardRepository.findByCardId(cardId)
        return cardRepository.findById(findCard!!.id).map { existingCard ->
            val updatedCard: Card = existingCard.copy(address = newCard.address)
            ResponseEntity.ok().body(cardRepository.save(updatedCard))
        }.orElse(ResponseEntity.notFound().build())
    }

    @DeleteMapping("/cards/{id}")
    fun deleteCardById(@PathVariable(value = "id") cardId: String): ResponseEntity<Void> {
        val findCard = cardRepository.findByCardId(cardId)
        return cardRepository.findById(findCard!!.id).map { card ->
            cardRepository.delete(card)
            ResponseEntity<Void>(HttpStatus.OK)
        }.orElse(ResponseEntity.notFound().build())
    }
}
