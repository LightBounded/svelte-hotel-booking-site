<script lang="ts">
  import { onMount } from 'svelte'
  import Form from './components/Form.svelte'
  import ReservationsTable from './components/ReservationsTable.svelte'
  import Modal from './components/Modal.svelte'
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.1.3/lux/bootstrap.min.css"
    integrity="sha512-B5sIrmt97CGoPUHgazLWO0fKVVbtXgGIOayWsbp9Z5aq4DJVATpOftE/sTTL27cu+QOqpI/jpt6tldZ4SwFDZw=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
    crossorigin="anonymous"></script>
</svelte:head>

<main class="container py-4">
  <Form />
  <ReservationsTable />
</main>

<Modal />
