<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pt-24 pb-12 px-4">
    <div class="max-w-5xl mx-auto space-y-6">
      <h1 class="text-2xl font-bold text-purple-800">📦 Riwayat Transaksi Selesai</h1>

      <div v-if="transaksiSelesai.length > 0" class="space-y-4">
        <div
          v-for="trx in transaksiSelesai"
          :key="trx.id"
          class="bg-white border border-purple-100 rounded-xl p-5 shadow"
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
        </div>
      </div>

      <div v-else class="text-center text-gray-500 py-10">
        Belum ada transaksi yang selesai.
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

const transaksiSelesai = computed(() => transaksiStore.transaksiSelesai.reverse())

const formatWaktu = (iso) => {
  return new Date(iso).toLocaleString('id-ID', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
