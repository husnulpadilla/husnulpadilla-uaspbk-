<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pt-24 pb-12 px-4">
    <div class="max-w-5xl mx-auto space-y-6">
      <h1 class="text-2xl font-bold text-purple-800">📋 Layanan Sedang Dikerjakan</h1>

      <div v-if="belumSelesai.length > 0" class="space-y-4">
        <div
          v-for="trx in belumSelesai"
          :key="trx.id"
          class="bg-white border border-purple-100 rounded-xl p-5 shadow flex flex-col md:flex-row justify-between"
        >
          <div class="space-y-1">
            <h2 class="text-lg font-semibold text-purple-700">👤 {{ trx.pelanggan }}</h2>
            <p class="text-sm text-gray-500">Waktu: {{ formatWaktu(trx.waktu) }}</p>
            <ul class="text-sm text-gray-700 list-disc ml-5 max-h-24 overflow-y-auto pr-2">
              <li v-for="item in trx.items" :key="item.id">
                {{ item.nama }} (x{{ item.jumlah }}) - Rp {{ item.harga.toLocaleString() }}
              </li>
            </ul>
            <p class="text-purple-800 font-semibold">Total: Rp {{ trx.total.toLocaleString() }}</p>
          </div>
          <div class="flex items-center mt-4 md:mt-0 md:ml-4">
            <button
              @click="tandaiSelesai(trx.id)"
              class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
            >
              Tandai Selesai
            </button>
          </div>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 py-10">
        Tidak ada layanan yang sedang dikerjakan.
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useTransaksiStore } from '@/stores/transaksiStore'

const transaksiStore = useTransaksiStore()

onMounted(() => {
  transaksiStore.fetchTransaksi()
})

const belumSelesai = computed(() => transaksiStore.transaksiBelumSelesai)

const tandaiSelesai = (id) => {
  transaksiStore.tandaiSelesai(id)
}

const formatWaktu = (isoString) => {
  const options = { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' }
  return new Date(isoString).toLocaleString('id-ID', options)
}
</script>
