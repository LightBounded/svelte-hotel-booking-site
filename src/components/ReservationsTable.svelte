<script lang="ts">
  import ReservationTableRow from './Reservation.svelte'
  import { reservations } from '../stores'
</script>

<div class="table-responsive">
  <table class="table table-dark">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Phone Number</th>
        <th scope="col">Email</th>
        <th scope="col">Address</th>
        <th scope="col">Room Number</th>
        <th scope="col">Number of Beds</th>
        <th scope="col">Room Photo</th>
        <th scope="col">Cost</th>
        <th scope="col">Booking Date</th>
        <th scope="col">Check-In Date</th>
        <th scope="col">Check-Out Date</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each $reservations as reservation}
        <ReservationTableRow {reservation} />
      {/each}
    </tbody>
  </table>
</div>
