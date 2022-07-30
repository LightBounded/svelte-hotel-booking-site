import { writable, Writable } from 'svelte/store'
import type { Reservation } from './interfaces/Reservation'

export const getReservations = async () => {
  const res = await fetch('http://localhost:3000/reservations')
  const data = await res.json()
  reservations.set(data)
}
getReservations()

export const reservations: Writable<Reservation[]> = writable([])

export const modal = writable({
  toggle: (reservation: Reservation = null) => {
    modal.update($modal => ($modal = { ...$modal, isOpen: !$modal.isOpen }))
    if (reservation) modal.update($modal => ($modal = { ...$modal, reservation }))
  },
  isOpen: false,
  reservation: <Reservation>{},
})
