<script lang="ts">
  import type { Reservation } from '../interfaces/Reservation'
  import { getReservations, modal } from '../stores'
  export let reservation: Reservation

  const deleteReservation = (id: number) => {
    fetch(`http://localhost:3000/reservations/${id}`, {
      method: 'DELETE',
    }).finally(() => getReservations())
  }
</script>

<tr class="align-middle">
  <td>{reservation.id}</td>
  <td>{reservation.firstName}</td>
  <td>{reservation.lastName}</td>
  <td>{reservation.phoneNumber}</td>
  <td>{reservation.emailAddress}</td>
  <td>{reservation.address}</td>
  <td>R-{reservation.roomNumber}</td>
  <td>{reservation.numberOfBeds}</td>
  <td class="p-0"
    ><img
      class="img-fluid"
      src="data:image;base64,{reservation.roomPhoto}"
      alt="Room"
    /></td
  >
  <td>${reservation.cost.toFixed(2)}</td>
  <td>{new Date(reservation.bookingDate).toLocaleDateString()}</td>
  <td>{new Date(reservation.checkInDate).toLocaleDateString()}</td>
  <td>{new Date(reservation.checkOutDate).toLocaleDateString()}</td>
  <td class="d-flex gap-2">
    <button class="btn btn-danger" on:click={() => deleteReservation(reservation.id)}
      >Delete</button
    >
    <button class="btn btn-warning" on:click={() => $modal.toggle(reservation)}>Edit</button>
  </td>
</tr>
