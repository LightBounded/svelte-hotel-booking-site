<script lang="ts">
  import { getReservations } from '../stores'
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

    const reservation = Object.fromEntries(new FormData(form))

    fetch('http://localhost:3000/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomPhoto: imageURL.split(',')[1], ...reservation }),
    }).finally(() => getReservations())
  }
</script>

<form class="row mb-5" novalidate on:submit|preventDefault={submitForm}>
  <div class="col-md-6 mb-3">
    <label for="firstName">First Name</label>
    <input class="form-control" type="text" name="firstName" id="firstName" required />
  </div>
  <div class="col-md-6 mb-3">
    <label for="lastName">Last Name</label>
    <input class="form-control" type="text" name="lastName" id="lastName" required />
  </div>
  <div class="col-md-9 mb-3">
    <label for="emailAddress">Email</label>
    <input
      class="form-control"
      type="text"
      name="emailAddress"
      id="emailAddress"
      required
    />
  </div>
  <div class="col-md-3 mb-3">
    <label for="phoneNumber">Phone Number</label>
    <input
      class="form-control"
      type="text"
      name="phoneNumber"
      id="phoneNumber"
      required
    />
  </div>
  <div class="col-md-12 mb-3">
    <label for="phoneNumber">Address</label>
    <input class="form-control" type="text" name="address" id="address" required />
  </div>
  <div class="col-md-4 mb-3">
    <label for="roomNumber">Room Number</label>
    <div class="input-group">
      <span class="input-group-text">R</span>
      <input
        class="form-control"
        type="text"
        name="roomNumber"
        id="roomNumber"
        required
      />
    </div>
  </div>
  <div class="col-md-4 mb-3">
    <label for="numberOfBeds">Number of Beds</label>
    <input
      class="form-control"
      type="number"
      name="numberOfBeds"
      id="numberOfBeds"
      required
    />
  </div>
  <div class="col-md-4 mb-3">
    <label for="cost">Cost</label>
    <input class="form-control" type="number" name="cost" id="cost" required />
  </div>
  <div class="col-md-4 mb-3">
    <label for="checkInDate">Booking Date</label>
    <input
      class="form-control"
      type="date"
      name="bookingDate"
      id="bookingDate"
      required
    />
  </div>
  <div class="col-md-4 mb-3">
    <label for="checkInDate">Check-In Date</label>
    <input
      class="form-control"
      type="date"
      name="checkInDate"
      id="checkInDate"
      required
    />
  </div>
  <div class="col-md-4 mb-3">
    <label for="checkOutDate">Check-Out Date</label>
    <input
      class="form-control"
      type="date"
      name="checkOutDate"
      id="checkOutDate"
      required
    />
  </div>
  <div class="col-md-12">
    <label for="roomPhoto">Room Photo</label>
    <div>
      <img
        class="mb-3"
        class:d-none={!imageURL}
        style="object-fit:cover;height:auto;max-width:50%;"
        id="roomPhoto"
        src={imageURL}
        alt="Room"
      />
    </div>
  </div>
  <div class="col-md-12 mb-3">
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
  <div>
    <button class="btn btn-primary">Submit</button>
  </div>
</form>
