<script lang="ts">
  import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'sveltestrap'
  import { modal, getReservations } from '../stores'
  const toggle = () => $modal.toggle()
  $: reservation = $modal.reservation
  
  let imageURL: string = ''
  let fileInput: HTMLInputElement

  const fileReader = new FileReader()
  fileReader.onload = () => (imageURL = <string>fileReader.result)

  const displayChosenImage = () => {
    fileReader.readAsDataURL(fileInput.files[0])
  }

  const submitForm = async event => {
    const form: HTMLFormElement = event.target
    form.classList.add('was-validated')

    if (!form.checkValidity()) {
      return
    }

    form.classList.remove('was-validated')

    const formData = Object.fromEntries(new FormData(form))

    fetch(`http://localhost:3000/reservations/${reservation.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomPhoto: imageURL.split(',')[1], ...formData }),
    }).finally(() => {
      getReservations()
      $modal.toggle()
    })
  }
</script>

<Modal isOpen={$modal.isOpen} {toggle} size="xl">
  <ModalHeader {toggle}>Edit Reservation</ModalHeader>
  <ModalBody>
    <form
      id="reservation-form"
      class="row"
      novalidate
      on:submit|preventDefault={submitForm}
    >
      <div class="col-lg-6 mb-3">
        <label for="firstName">First Name</label>
        <input
          class="form-control"
          type="text"
          name="firstName"
          id="firstName"
          value={reservation.firstName}
          required
        />
      </div>
      <div class="col-lg-6 mb-3">
        <label for="lastName">Last Name</label>
        <input
          class="form-control"
          type="text"
          name="lastName"
          id="lastName"
          value={reservation.lastName}
          required
        />
      </div>
      <div class="col-lg-9 mb-3">
        <label for="emailAddress">Email</label>
        <input
          class="form-control"
          type="text"
          name="emailAddress"
          id="emailAddress"
          value={reservation.lastName}
          required
        />
      </div>
      <div class="col-lg-3 mb-3">
        <label for="phoneNumber">Phone Number</label>
        <input
          class="form-control"
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          value={reservation.phoneNumber}
          required
        />
      </div>
      <div class="col-lg-12 mb-3">
        <label for="phoneNumber">Address</label>
        <input
          class="form-control"
          type="text"
          name="address"
          id="address"
          value={reservation.address}
          required
        />
      </div>
      <div class="col-lg-4 mb-3">
        <label for="roomNumber">Room Number</label>
        <div class="input-group">
          <span class="input-group-text">R</span>
          <input
            class="form-control"
            type="text"
            name="roomNumber"
            id="roomNumber"
            value={reservation.roomNumber}
            required
          />
        </div>
      </div>
      <div class="col-lg-4 mb-3">
        <label for="numberOfBeds">Number of Beds</label>
        <input
          class="form-control"
          type="number"
          name="numberOfBeds"
          id="numberOfBeds"
          value={reservation.numberOfBeds}
          required
        />
      </div>
      <div class="col-lg-4 mb-3">
        <label for="cost">Cost</label>
        <input
          class="form-control"
          type="number"
          name="cost"
          id="cost"
          value={reservation.cost}
          required
        />
      </div>
      <div class="col-lg-4 mb-3">
        <label for="checkInDate">Booking Date</label>
        <input
          class="form-control"
          type="date"
          name="bookingDate"
          id="bookingDate"
          value={reservation.bookingDate.split('T')[0]}
          required
        />
      </div>
      <div class="col-lg-4 mb-3">
        <label for="checkInDate">Check-In Date</label>
        <input
          class="form-control"
          type="date"
          name="checkInDate"
          id="checkInDate"
          value={reservation.checkInDate.split('T')[0]}
          required
        />
      </div>
      <div class="col-lg-4 mb-3">
        <label for="checkOutDate">Check-Out Date</label>
        <input
          class="form-control"
          type="date"
          name="checkOutDate"
          id="checkOutDate"
          value={reservation.checkOutDate.split('T')[0]}
          required
        />
      </div>
      <div class="col-lg-12">
        <label for="roomPhoto">Room Photo</label>
        <div>
          <img
            class="mb-3"
            class:d-none={!imageURL && !reservation.roomPhoto}
            style="object-fit:cover;height:auto;max-width:50%;"
            id="roomPhoto"
            src={imageURL || `data:image;base64,${reservation.roomPhoto}`}
            alt="Room"
          />
        </div>
      </div>
      <div class="col-lg-12 mb-3">
        <input
          bind:this={fileInput}
          accept="image/*"
          type="file"
          class="form-control d-inline align-bottom"
          id="roomPhoto"
          on:change={displayChosenImage}
          required
        />
      </div>
    </form>
  </ModalBody>
  <ModalFooter>
    <Button type="submit" color="primary" form="reservation-form">Save Changes</Button>
    <Button color="secondary" on:click={toggle}>Cancel</Button>
  </ModalFooter>
</Modal>
