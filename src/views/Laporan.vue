<template>
  <div class="min-h-screen bg-gradient-to-br pt-20 from-pink-50 to-purple-50 p-8">
    <h1 class="text-3xl font-bold text-purple-800 mb-6">📊 Laporan Transaksi</h1>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
      <div class="bg-white rounded-xl shadow p-6 border-l-4 border-purple-500">
        <h2 class="text-lg font-semibold text-gray-700">Total Transaksi</h2>
        <p class="text-2xl font-bold text-purple-700">{{ totalTransaksi }}</p>
      </div>
      <div class="bg-white rounded-xl shadow p-6 border-l-4 border-green-500">
        <h2 class="text-lg font-semibold text-gray-700">Total Pendapatan</h2>
        <p class="text-2xl font-bold text-green-600">Rp {{ totalPendapatan.toLocaleString() }}</p>
      </div>
      <div class="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
        <h2 class="text-lg font-semibold text-gray-700">Layanan Terlaris</h2>
        <p class="text-md text-blue-700" v-if="layananTerlaris">{{ layananTerlaris.nama }} ({{ layananTerlaris.jumlah }}x)</p>
        <p class="text-md text-gray-400" v-else>Tidak ada data</p>
      </div>
    </div>

    <!-- Detail Table -->
    <div class="bg-white rounded-xl shadow overflow-x-auto border">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-purple-600 text-white">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-medium">ID</th>
            <th class="px-6 py-3 text-left text-sm font-medium">Pelanggan</th>
            <th class="px-6 py-3 text-left text-sm font-medium">Waktu</th>
            <th class="px-6 py-3 text-left text-sm font-medium">Total</th>
            <th class="px-6 py-3 text-left text-sm font-medium">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="trx in transaksiSelesai" :key="trx.id">
            <td class="px-6 py-4">{{ trx.id }}</td>
            <td class="px-6 py-4">{{ trx.pelanggan }}</td>
            <td class="px-6 py-4">{{ new Date(trx.waktu).toLocaleString() }}</td>
            <td class="px-6 py-4">Rp {{ trx.total.toLocaleString() }}</td>
            <td class="px-6 py-4">
              <span class="text-green-600 font-semibold">Selesai</span>
            </td>
          </tr>
        </tbody>
      </table>
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

const transaksiSelesai = computed(() => transaksiStore.transaksiSelesai)

const totalPendapatan = computed(() =>
  transaksiSelesai.value.reduce((sum, trx) => sum + trx.total, 0)
)

const totalTransaksi = computed(() => transaksiSelesai.value.length)

const layananTerlaris = computed(() => {
  const counter = {}
  transaksiSelesai.value.forEach(trx => {
    trx.items.forEach(item => {
      if (!counter[item.nama]) {
        counter[item.nama] = { nama: item.nama, jumlah: 0 }
      }
      counter[item.nama].jumlah += item.jumlah
    })
  })

  const sorted = Object.values(counter).sort((a, b) => b.jumlah - a.jumlah)
  return sorted[0] || null
})
</script>
